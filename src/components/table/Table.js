import ExcelComponent from '@core/ExcelComponent'
import { createTable } from '@/components/table/table.template'

class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    })
    this.startCoord = 0
    this.resizeValue = 0
    this.resizableEl = null
    this.initialSize = null
    this.isResizing = false
    this.resizeCursor = null
    this.addResizeHandler = this.onMousemove.bind(this)
    this.removeResizeHandler = this.onMouseup.bind(this)
  }

  toHTML() {
    return createTable()
  }

  onMousedown(e) {
    const elToResize = e.target.getAttribute('data-resize')
    if (elToResize) {
      this.resizeCursor = e.target
      this.startCoord = elToResize === 'col' ? e.pageX : e.pageY
      this.resizableEl = e.target.closest('[data-type="resizable"]')
      this.initialSize = elToResize === 'col' ?
        this.resizableEl.offsetWidth :
        this.resizableEl.offsetHeight
      this.isResizing = elToResize

      const currentColumnId = this.resizableEl.getAttribute('data-id')
      this.cells = this.$root.findAll(`[data-id="${currentColumnId}"]`)

      document.addEventListener('mousemove', this.addResizeHandler)
      document.addEventListener('mouseup', this.removeResizeHandler)
    }
  }
  onMousemove(e) {
    if (this.isResizing === 'col') {
      this.resizeValue = e.pageX - this.startCoord
      this.resizeCursor.style.opacity = 1
      this.resizeCursor.style.right = `${-this.resizeValue}px`
    } else {
      this.resizeValue = e.pageY - this.startCoord
      this.resizeCursor.style.bottom =`${-this.resizeValue}px`
    }
  }
  onMouseup() {
    this.resizeCursor.style.opacity = 0

    if (this.isResizing === 'col') {
      this.cells.forEach(el => {
        el.style.width = `${this.initialSize + this.resizeValue}px`
      })
      this.resizeCursor.style.right = 0
    } else {
      this.resizableEl.style.height = `${this.initialSize + this.resizeValue}px`
      this.resizeCursor.style.bottom = 0
    }
    this.isResizing = false

    document.removeEventListener('mousemove', this.addResizeHandler)
    document.removeEventListener('mouseup', this.removeResizeHandler)
  }
}

export default Table
