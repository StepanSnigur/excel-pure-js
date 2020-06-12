import { $ } from '../dom'
import ActiveRoute from '../routes/ActiveRoute'

class Router {
  constructor(selector, routes) {
    if (!selector) throw new Error('Selector is not provided in Router')

    this.$placeholder = $(selector)
    this.routes = routes
    this.changePageHandler = this.changePageHandler.bind(this)

    this.page = null

    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }
  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }

  changePageHandler() {
    if (this.page) this.page.destroy()
    const activePath = ActiveRoute.path

    const Page = this.routes[activePath || 'dashboard']
    this.page = new Page(ActiveRoute.param)
    this.$placeholder.clear()
    this.$placeholder.append(this.page.getRoot())

    this.page.afterRender()
  }
}

export default Router
