import { storage } from '@core/utils'

const storageName = param => `excel:${param}`

class LocalStorageClient {
  constructor(name) {
    this.name = storageName(name)
  }

  save(state) {
    storage(this.name, state)
    return Promise.resolve()
  }
  get() {
    return Promise.resolve(storage(this.name))
  }
}

export default LocalStorageClient
