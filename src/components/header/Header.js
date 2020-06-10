import ExcelComponent from '@core/ExcelComponent'
import createHeader from '@/components/header/header.template'
import { $ } from '@core/dom'
import { changeTableTitle } from '@/redux/actions'

class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    })
  }

  toHTML() {
    return createHeader(this.store.getState().tableTitle)
  }

  onInput(e) {
    const newTitle = $(e.target).text()
    this.$dispatch(changeTableTitle(newTitle))
  }
}

export default Header
