import ExcelComponent from '@core/ExcelComponent'
import createHeader from '@/components/header/header.template'
import { $ } from '@core/dom'
import { changeTableTitle } from '@/redux/actions'
import ActiveRoute from '@core/routes/ActiveRoute'

class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
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
  onClick(e) {
    const $target = $(e.target)
    if ($target.data.role === 'delete') {
      const decision = confirm('Вы действительно хотите удалить эту таблицу')
      if (decision) {
        localStorage.removeItem(`excel:${ActiveRoute.param}`)
        ActiveRoute.navigate('')
      }
    } else if ($target.data.role === 'exit') {
      ActiveRoute.navigate('')
    }
  }
}

export default Header
