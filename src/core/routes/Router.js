import { $ } from '../dom'
import ActiveRoute from '../routes/ActiveRoute'
import Loader from '../../components/Loader'

class Router {
  constructor(selector, routes) {
    if (!selector) throw new Error('Selector is not provided in Router')

    this.$placeholder = $(selector)
    this.routes = routes
    this.changePageHandler = this.changePageHandler.bind(this)

    this.loader = new Loader()
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

  async changePageHandler() {
    if (this.page) this.page.destroy()
    const activePath = ActiveRoute.path

    this.$placeholder.clear().append(this.loader)

    const Page = this.routes[activePath || 'dashboard']
    this.page = new Page(ActiveRoute.param)
    const root = await this.page.getRoot()

    this.$placeholder.clear().append(root)
    this.page.afterRender()
  }
}

export default Router
