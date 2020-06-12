import Page from '@core/Page'
import { debounce, storage } from '@core/utils'
import createStore from '@core/store/createStore'
import rootReducer from '@/redux/rootReducer'
import Excel from '@/components/excel/Excel'
import Header from '@/components/header/Header'
import Toolbar from '@/components/toolbar/Toolbar'
import Formula from '@/components/formula/Formula'
import Table from '@/components/table/Table'
import { normalizeInitialState } from '@/redux/initialState'

const storageName = param => `excel:${param}`

class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now()

    const state = storage(storageName(params))
    const store = createStore(rootReducer, normalizeInitialState(state))
    const stateListener = debounce(state => {
      storage(storageName(params), state)
    }, 300)
    store.subscribe(stateListener)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }
  destroy() {
    this.excel.destroy()
  }
}

export default ExcelPage
