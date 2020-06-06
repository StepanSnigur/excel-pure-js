import ExcelComponent from '@core/ExcelComponent'

class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input']
    })
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `
  }

  onInput(e) {
    console.log(e.target.textContent.trim())
  }
}

export default Formula
