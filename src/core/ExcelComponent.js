import DomListener from '@core/DomListener'

class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name
    this.emitter = options.emitter
    this.unsubscribers = []

    this.prepare()
  }

  // настройка компонента до рендера
  prepare() {}

  // Возвращает шаьлон компонента
  toHTML() {
    return ''
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }
  $on(event, callback) {
    const unsub = this.emitter.subscribe(event, callback)
    this.unsubscribers.push(unsub)
  }

  init() {
    this.initDOMListeners()
  }
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}

export default ExcelComponent
