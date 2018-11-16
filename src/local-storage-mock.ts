function storageMock(): Storage {
  let storage: { [_: string]: string | null } = {}

  return {
    get length(): number {
      return Object.keys(storage).length
    },

    clear(): void {
      storage = {}
    },

    setItem(key: string, value: string): void {
      storage[key] = value || ''
    },

    getItem(key: string): string | null {
      return key in storage ? storage[key] : null
    },

    removeItem(key: string): void {
      delete storage[key]
    },

    key(i: number): string | null {
      const keys = Object.keys(storage)
      return keys[i] || null
    },
  }
}

export function mockLocalStorage(): void {
  Object.defineProperty(window, 'localStorage', {
    value: storageMock(),
  })

  Object.defineProperty(window, 'sessionStorage', {
    value: storageMock(),
  })
}
