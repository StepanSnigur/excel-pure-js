import { getMethodName } from '@core/utils'


class DomListener {
  constructor($root, listeners = []) {
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)

      const componentName = this.name || 'component'
      if (!this[method]) {
        throw new Error(`Method ${method} is not declared in ${componentName}`)
      }

      this[method] = this[method].bind(this)
      this.$root.on(listener, this[method])
    })
  }
  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      this.$root.off(listener, this[method])
    })
  }
}

export default DomListener
