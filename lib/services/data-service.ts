import { openDB, type DBSchema, type IDBPDatabase } from 'idb'

export interface Product {
  id: number
  title: string
  body: string
  userId: number
  createdAt?: string
  updatedAt?: string
  synced: boolean
  action?: 'create' | 'update' | 'delete'
}

interface SatDB extends DBSchema {
  products: {
    key: number
    value: Product
    indexes: {
      synced: 'synced'
    }
  }
  pendingSync: {
    key: number
    value: {
      id: number
      product: Product
      action: 'create' | 'update' | 'delete'
      timestamp: number
    }
    indexes: {
      timestamp: 'timestamp'
    }
  }
}

class DataService {
  private db: IDBPDatabase<SatDB> | null = null

  async init() {
    if (this.db) return this.db

    this.db = await openDB<SatDB>('sat-db', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('products')) {
          const productStore = db.createObjectStore('products', {
            keyPath: 'id',
          })
          productStore.createIndex('synced', 'synced')
        }

        if (!db.objectStoreNames.contains('pendingSync')) {
          const syncStore = db.createObjectStore('pendingSync', {
            keyPath: 'id',
            autoIncrement: true,
          })
          syncStore.createIndex('timestamp', 'timestamp')
        }
      },
    })

    return this.db
  }

  async getProducts(): Promise<Product[]> {
    const db = await this.init()
    return db.getAll('products')
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const db = await this.init()
    return db.get('products', id)
  }

  async saveProduct(product: Product, isOnline = true): Promise<void> {
    const db = await this.init()


    const now = new Date().toISOString()
    const productToSave: Product = {
      ...product,
      updatedAt: now,
      synced: isOnline,
    }

    if (!product.id || product.id < 0) {
      productToSave.createdAt = now
      productToSave.id = Date.now()
    }

    await db.put('products', productToSave)

    if (!isOnline) {
      await this.addToPendingSync(
        productToSave,
        product.id ? 'update' : 'create'
      )
    }
  }

  async deleteProduct(id: number, isOnline = true): Promise<void> {
    const db = await this.init()

    if (isOnline) {
      await db.delete('products', id)
    } else {
      const product = await db.get('products', id)
      if (product) {
        await this.addToPendingSync(product, 'delete')
        await db.delete('products', id)
      }
    }
  }

  private async addToPendingSync(
    product: Product,
    action: 'create' | 'update' | 'delete'
  ): Promise<void> {
    const db = await this.init()
    await db.add('pendingSync', {
      id: 0,
      product,
      action,
      timestamp: Date.now(),
    })
  }

  async getPendingSync() {
    const db = await this.init()
    return db.getAll('pendingSync')
  }

  async clearSyncedChanges(ids: number[]): Promise<void> {
    const db = await this.init()
    const tx = db.transaction('pendingSync', 'readwrite')

    for (const id of ids) {
      await tx.store.delete(id)
    }

    await tx.done
  }

  async syncWithRemote(): Promise<void> {
    const pendingChanges = await this.getPendingSync()
    const syncedIds: number[] = []

    for (const change of pendingChanges) {
      try {
        switch (change.action) {
          case 'create':
            await this.createRemoteProduct(change.product)
            break
          case 'update':
            await this.updateRemoteProduct(change.product)
            break
          case 'delete':
            await this.deleteRemoteProduct(change.product.id)
            break
        }
        syncedIds.push(change.id)
      } catch (error) {
        console.error('Error sincronizando cambio:', error)
      }
    }

    if (syncedIds.length > 0) {
      await this.clearSyncedChanges(syncedIds)
    }
  }

  private async createRemoteProduct(product: Product): Promise<void> {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: product.title,
        body: product.body,
        userId: product.userId,
      }),
    })

    if (!response.ok) {
      throw new Error('Error creando producto remoto')
    }
  }

  private async updateRemoteProduct(product: Product): Promise<void> {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${product.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: product.id,
          title: product.title,
          body: product.body,
          userId: product.userId,
        }),
      }
    )

    if (!response.ok) {
      throw new Error('Error actualizando producto remoto')
    }
  }

  private async deleteRemoteProduct(id: number): Promise<void> {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: 'DELETE',
      }
    )

    if (!response.ok) {
      throw new Error('Error eliminando producto remoto')
    }
  }

  async getUnsyncedProducts(): Promise<Product[]> {
  const db = await this.init()
  const index = db.transaction('products').store.index('synced')
  return index.getAll(IDBKeyRange.only(false))
}
}

export const dataService = new DataService()
