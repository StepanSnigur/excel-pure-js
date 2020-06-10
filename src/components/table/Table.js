import ExcelComponent from '@core/ExcelComponent'
import { $ } from '@core/dom'
import { createTable } from '@/components/table/table.template'
import TableSelection from '@/components/table/TableSelection'
import {
  isCell,
  matrix,
  nextSelector
} from '@/components/table/table.functions'
import {
  applyStyle,
  changeStyles,
  changeText,
  tableResize
} from '@/redux/actions'
import { defaultStyles } from '@/constants'
import parse from '@core/parse'

class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
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
    return createTable(20, this.store.getState())
  }

  prepare() {
    this.selection = new TableSelection(this.emitter)
  }
  init() {
    super.init();

    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)

    this.$on('formula:input', text => {
      this.selection.current.attr('data-value', text)
      this.selection.insertValue(parse(text))
      this.updateTextInStore(text)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
    this.$on('toolbar:applyStyle', style => {
      this.selection.applyStyle(style)
      this.$dispatch(applyStyle({
        ids: this.selection.selectedIds,
        data: style
      }))
    })
  }

  selectCell($cell) {
    this.selection.select($cell)

    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(changeStyles(styles))
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

      const currentColumnId = this.resizableEl.getAttribute('data-col')
      this.cells = this.$root.findAll(`[data-col="${currentColumnId}"]`)

      document.addEventListener('mousemove', this.addResizeHandler)
      document.addEventListener('mouseup', this.removeResizeHandler)
    } else if (isCell(e)) {
      const $target = $(e.target)

      if (e.shiftKey && e.ctrlKey) {
        const $cells = matrix(this.selection.current, $target)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else if (e.shiftKey) {
        this.selection.selectAnother($target)
      } else {
        this.selectCell($target)
      }
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
      const newCellSize = this.initialSize + this.resizeValue
      this.cells.forEach(el => {
        el.style.width = `${newCellSize}px`
      })

      this.$dispatch(tableResize({
        id: this.resizableEl.dataset.col,
        size: newCellSize,
        type: 'col'
      }))

      this.resizeCursor.style.right = 0
    } else {
      const newCellSize = this.initialSize + this.resizeValue
      this.resizableEl.style.height = `${newCellSize}px`
      this.$dispatch(tableResize({
        id: this.resizableEl.dataset.row,
        size: newCellSize,
        type: 'row'
      }))
      this.resizeCursor.style.bottom = 0
    }
    this.isResizing = false

    document.removeEventListener('mousemove', this.addResizeHandler)
    document.removeEventListener('mouseup', this.removeResizeHandler)
  }
  onKeydown(e) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp'
    ]
    const { key } = e

    if (keys.includes(key) && !e.shiftKey) {
      e.preventDefault()
      const id= this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }

  updateTextInStore(value) {
    this.$dispatch(changeText({
      id: this.selection.current.id(),
      value
    }))
  }
  onInput(e) {
    this.updateTextInStore($(e.target).text())
  }
}

export default Table
