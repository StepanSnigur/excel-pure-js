import ExcelComponent from '@core/ExcelComponent'
import { $ } from '@core/dom'

class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    })
  }

  init() {
    super.init();
    this.formula = this.$root.find('div[contentEditable]')

    this.$on('table:select', ($cell) => {
      this.formula.text($cell.text())
    })
    this.$on('table:input', ($input) => {
      this.formula.text($input.text())
    })
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `
  }

  onInput(e) {
    this.$emit('formula:input', $(e.target).text())
  }
  onKeydown(e) {
    const keys = ['Enter', 'Tab']

    if (keys.includes(e.key)) {
      e.preventDefault()
      this.$emit('formula:done')
    }
  }
}

export default Formula
