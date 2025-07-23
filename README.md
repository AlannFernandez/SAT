# SAT PWA Clone - Gestión Moderna de Productos

Una aplicación web progresiva (PWA) moderna construida con Next.js 14 que replica la funcionalidad de SAT con un diseño minimalista y soporte completo offline-first.

## 🚀 Características Principales

### ✨ Funcionalidad Core
- **CRUD Completo**: Crear, leer, actualizar y eliminar productos
- **Offline-First**: Funciona completamente sin conexión a internet
- **Sincronización Automática**: Background sync cuando se recupera la conexión
- **Cache Inteligente**: Estrategia stale-while-revalidate con TTL de 3 días
- **Estados Visuales**: Indicadores de sincronización y conexión en tiempo real

### 📱 PWA Features
- **Instalable**: Se puede instalar como app nativa en móvil y desktop
- **Service Worker**: Cache avanzado y soporte offline
- **Manifest**: Configuración completa para instalación
- **Responsive**: Diseño adaptativo para todos los dispositivos

### 🎨 Diseño Moderno
- **UI Minimalista**: Colores suaves, tipografía legible, espaciado generoso
- **Tailwind CSS**: Sistema de diseño consistente
- **Animaciones Suaves**: Transiciones y estados visuales elegantes
- **Accesibilidad**: Cumple con estándares WCAG

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Base de Datos Local**: IndexedDB (via idb)
- **Cache**: Cache Storage API
- **Sincronización**: Background Sync API
- **UI Components**: Radix UI + shadcn/ui
- **API Externa**: JSONPlaceholder

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
\`\`\`bash
git clone <repository-url>
cd sat-pwa-clone
\`\`\`

2. **Instalar dependencias**
\`\`\`bash
npm install
# o
yarn install
\`\`\`

3. **Ejecutar en desarrollo**
\`\`\`bash
npm run dev
# o
yarn dev
\`\`\`

4. **Abrir en el navegador**
Navega a [http://localhost:3000](http://localhost:3000)

## 🧪 Pruebas Offline

### Desde Chrome DevTools

1. **Abrir DevTools** (F12)
2. **Ir a la pestaña Network**
3. **Seleccionar "Offline" en el dropdown de throttling**
4. **Recargar la página**
5. **Probar funcionalidades**:
   - Crear productos
   - Editar productos existentes
   - Eliminar productos
   - Navegar por la aplicación

### Verificar Service Worker

1. **DevTools → Application → Service Workers**
2. **Verificar que el SW esté activo**
3. **Application → Storage**: Ver IndexedDB y Cache Storage

### Probar Sincronización

1. **Crear/editar productos offline**
2. **Verificar badge "Pendiente" en las tarjetas**
3. **Volver online**
4. **Observar sincronización automática**

## 🔧 Configuración Avanzada

### Cambiar API Externa

Edita el archivo \`lib/services/data-service.ts\`:

\`\`\`typescript
// Cambiar la URL base de la API
const API_BASE_URL = 'https://tu-api.com/api'

// Actualizar endpoints en los métodos:
private async createRemoteProduct(product: Product): Promise<void> {
  const response = await fetch(\`\${API_BASE_URL}/products\`, {
    // ... resto de la configuración
  })
}
\`\`\`

### Ajustar Expiración de Cache

En \`public/sw.js\`:

\`\`\`javascript
// Cambiar TTL (en millisegundos)
const CACHE_TTL = 259200000; // 3 días
// Para 1 día: 86400000
// Para 1 semana: 604800000
\`\`\`

### Personalizar Manifest

Edita \`app/manifest.json\`:

\`\`\`json
{
  "name": "Tu App Name",
  "short_name": "TuApp",
  "theme_color": "#tu-color",
  // ... otras configuraciones
}
\`\`\`

## 🚀 Despliegue en Vercel

### Método 1: Vercel CLI

1. **Instalar Vercel CLI**
\`\`\`bash
npm i -g vercel
\`\`\`

2. **Hacer login**
\`\`\`bash
vercel login
\`\`\`

3. **Desplegar**
\`\`\`bash
vercel --prod
\`\`\`

### Método 2: GitHub Integration

1. **Subir código a GitHub**
2. **Conectar repositorio en [vercel.com](https://vercel.com)**
3. **Configurar variables de entorno** (si las hay)
4. **Deploy automático**

### Método 3: Drag & Drop

1. **Construir el proyecto**
\`\`\`bash
npm run build
\`\`\`

2. **Arrastrar carpeta \`.next\` a Vercel**

## 📁 Estructura del Proyecto

\`\`\`
sat-pwa-clone/
├── app/                          # App Router de Next.js
│   ├── globals.css              # Estilos globales
│   ├── layout.tsx               # Layout principal
│   ├── manifest.json            # PWA Manifest
│   ├── page.tsx                 # Página principal
│   └── offline/                 # Página offline
│       └── page.tsx
├── components/                   # Componentes React
│   ├── providers/               # Context providers
│   │   └── pwa-provider.tsx
│   ├── ui/                      # Componentes UI base
│   ├── product-card.tsx         # Tarjeta de producto
│   └── product-dialog.tsx       # Modal crear/editar
├── hooks/                       # Custom hooks
│   ├── use-products.ts          # Hook para gestión de productos
│   └── use-toast.ts             # Hook para notificaciones
├── lib/                         # Utilidades y servicios
│   └── services/
│       └── data-service.ts      # Servicio de datos con IndexedDB
├── public/                      # Archivos estáticos
│   ├── sw.js                    # Service Worker
│   ├── icon-192x192.png         # Iconos PWA
│   └── icon-512x512.png
├── next.config.mjs              # Configuración Next.js
├── tailwind.config.js           # Configuración Tailwind
└── package.json                 # Dependencias
\`\`\`

## 🔍 Funcionalidades Detalladas

### Gestión de Productos
- **Listado**: Grid responsivo con paginación virtual
- **Búsqueda**: Filtrado en tiempo real por título y descripción
- **Creación**: Modal con validación de formularios
- **Edición**: Edición inline con preview
- **Eliminación**: Confirmación con AlertDialog

### Sincronización
- **Detección de Conexión**: Navigator.onLine API
- **Queue de Sincronización**: IndexedDB para cambios pendientes
- **Background Sync**: Service Worker para sync automático
- **Estados Visuales**: Badges y notificaciones de estado

### Cache Strategy
- **Stale While Revalidate**: Para datos de API
- **Cache First**: Para recursos estáticos
- **Network First**: Para páginas HTML
- **TTL Management**: Expiración automática de cache

## 🐛 Troubleshooting

### Service Worker no se registra
- Verificar que estés en HTTPS o localhost
- Limpiar cache del navegador
- Verificar consola por errores

### IndexedDB no funciona
- Verificar soporte del navegador
- Comprobar modo incógnito (puede estar deshabilitado)
- Limpiar storage del navegador

### Sincronización no funciona
- Verificar Background Sync API support
- Comprobar Service Worker activo
- Revisar Network tab en DevTools

### App no es instalable
- Verificar manifest.json válido
- Comprobar Service Worker registrado
- Verificar criterios PWA en Lighthouse

## 📊 Performance

### Métricas Objetivo
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Optimizaciones Implementadas
- **Code Splitting**: Automático con Next.js
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: \`npm run analyze\`
- **Tree Shaking**: Eliminación de código no usado

## 🔒 Seguridad

### Headers de Seguridad
- **X-Content-Type-Options**: nosniff
- **X-Frame-Options**: DENY
- **Referrer-Policy**: strict-origin-when-cross-origin

### Validación
- **Input Sanitization**: Validación client y server-side
- **XSS Protection**: Escape automático de React
- **CSRF Protection**: SameSite cookies

## 🤝 Contribución

1. **Fork del repositorio**
2. **Crear rama feature** (\`git checkout -b feature/nueva-funcionalidad\`)
3. **Commit cambios** (\`git commit -am 'Agregar nueva funcionalidad'\`)
4. **Push a la rama** (\`git push origin feature/nueva-funcionalidad\`)
5. **Crear Pull Request**

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo \`LICENSE\` para más detalles.

## 🙏 Agradecimientos

- **Next.js Team** por el excelente framework
- **Vercel** por la plataforma de deployment
- **Tailwind CSS** por el sistema de diseño
- **Radix UI** por los componentes accesibles
- **JSONPlaceholder** por la API de pruebas

---

**Desarrollado con ❤️ usando Next.js 14 y tecnologías web modernas**
