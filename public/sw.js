// Service Worker para SAT PWA
// Implementa cache strategies, offline support y background sync

const CACHE_NAME = "sat-v1"
const API_CACHE_NAME = "sat-api-v1"
const STATIC_CACHE_NAME = "sat-static-v1"
const CACHE_TTL = 259200000 // 3 días en millisegundos

// Archivos estáticos para cachear
const STATIC_ASSETS = ["/", "/offline", "/manifest.json", "/icon-192x192.png", "/icon-512x512.png"]

// Instalación del SW - cachea recursos estáticos
self.addEventListener("install", (event) => {
  console.log("SW: Instalando...")
  event.waitUntil(
    caches
      .open(STATIC_CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting()),
  )
})

// Activación del SW - limpia caches antiguos
self.addEventListener("activate", (event) => {
  console.log("SW: Activando...")
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== API_CACHE_NAME && cacheName !== STATIC_CACHE_NAME) {
              console.log("SW: Eliminando cache antiguo:", cacheName)
              return caches.delete(cacheName)
            }
          }),
        )
      })
      .then(() => self.clients.claim()),
  )
})

// Intercepta requests - implementa stale-while-revalidate
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Solo intercepta GET requests
  if (request.method !== "GET") return

  // Manejo de API requests con stale-while-revalidate
  if (url.pathname.includes("/api/") || url.hostname === "jsonplaceholder.typicode.com") {
    event.respondWith(staleWhileRevalidate(request))
    return
  }

  // Manejo de recursos estáticos
  if (STATIC_ASSETS.some((asset) => url.pathname === asset)) {
    event.respondWith(cacheFirst(request))
    return
  }

  // Fallback para páginas HTML
  if (request.headers.get("accept")?.includes("text/html")) {
    event.respondWith(networkFirstWithOfflineFallback(request))
    return
  }
})

// Estrategia Cache First para recursos estáticos
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request)
  if (cachedResponse) {
    return cachedResponse
  }

  try {
    const networkResponse = await fetch(request)
    const cache = await caches.open(STATIC_CACHE_NAME)
    cache.put(request, networkResponse.clone())
    return networkResponse
  } catch (error) {
    console.log("SW: Error en cache first:", error)
    throw error
  }
}

// Estrategia Stale While Revalidate para API
async function staleWhileRevalidate(request) {
  const cache = await caches.open(API_CACHE_NAME)
  const cachedResponse = await cache.match(request)

  // Verifica si el cache está expirado
  const isExpired = cachedResponse ? await isCacheExpired(cachedResponse) : true

  // Fetch en background para revalidar
  const fetchPromise = fetch(request)
    .then(async (response) => {
      if (response.ok) {
        const responseToCache = response.clone()
        // Agrega timestamp para TTL
        const headers = new Headers(responseToCache.headers)
        headers.set("sw-cached-at", Date.now().toString())

        const modifiedResponse = new Response(responseToCache.body, {
          status: responseToCache.status,
          statusText: responseToCache.statusText,
          headers: headers,
        })

        cache.put(request, modifiedResponse)
      }
      return response
    })
    .catch((error) => {
      console.log("SW: Error en fetch:", error)
      throw error
    })

  // Si hay cache válido, lo devuelve inmediatamente
  if (cachedResponse && !isExpired) {
    fetchPromise.catch(() => {}) // Ignora errores del background fetch
    return cachedResponse
  }

  // Si no hay cache o está expirado, espera el fetch
  try {
    return await fetchPromise
  } catch (error) {
    // Si falla el fetch y hay cache (aunque expirado), lo devuelve
    if (cachedResponse) {
      return cachedResponse
    }
    throw error
  }
}

// Network First con fallback offline
async function networkFirstWithOfflineFallback(request) {
  try {
    const networkResponse = await fetch(request)
    const cache = await caches.open(CACHE_NAME)
    cache.put(request, networkResponse.clone())
    return networkResponse
  } catch (error) {
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    // Fallback a página offline
    if (request.headers.get("accept")?.includes("text/html")) {
      return caches.match("/offline")
    }

    throw error
  }
}

// Verifica si el cache está expirado
async function isCacheExpired(response) {
  const cachedAt = response.headers.get("sw-cached-at")
  if (!cachedAt) return true

  const cacheAge = Date.now() - Number.parseInt(cachedAt)
  return cacheAge > CACHE_TTL
}

// Background Sync para sincronizar datos offline
self.addEventListener("sync", (event) => {
  console.log("SW: Background sync triggered:", event.tag)

  if (event.tag === "sync-offline-data") {
    event.waitUntil(syncOfflineData())
  }
})

// Sincroniza datos guardados offline
async function syncOfflineData() {
  try {
    // Notifica a los clientes que inicie la sincronización
    const clients = await self.clients.matchAll()
    clients.forEach((client) => {
      client.postMessage({
        type: "SYNC_START",
      })
    })

    // Aquí iría la lógica de sincronización
    // Por ahora solo simula el proceso
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Notifica que la sincronización terminó
    clients.forEach((client) => {
      client.postMessage({
        type: "SYNC_COMPLETE",
      })
    })

    console.log("SW: Sincronización completada")
  } catch (error) {
    console.error("SW: Error en sincronización:", error)

    const clients = await self.clients.matchAll()
    clients.forEach((client) => {
      client.postMessage({
        type: "SYNC_ERROR",
        error: error.message,
      })
    })
  }
}

// Manejo de mensajes desde la aplicación
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }
})
