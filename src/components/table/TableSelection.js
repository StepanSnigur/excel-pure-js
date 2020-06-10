class TableSelection {
  static className = 'selected'

  constructor(emitter) {
    this.group = []
    this.current = null
    this.emitter = emitter
  }

  select($el) {
    this.clearGroup()
    this.group.push($el)
    this.changeCurrentCell($el)
    $el.focus().addClass(TableSelection.className)
  }

  get selectedIds() {
    return this.group.map($el => $el.id())
  }
  selectGroup($group) {
    this.clearGroup()
    this.group = $group
    $group.forEach($cell => $cell.addClass(TableSelection.className))
  }
  selectAnother($el) {
    this.changeCurrentCell($el)
    this.group.push($el)
    this.group.forEach($el => $el.addClass(TableSelection.className))
  }

  clearGroup() {
    this.group.forEach($el => $el.removeClass(TableSelection.className))
    this.group = []
  }
  changeCurrentCell($cell) {
    this.current = $cell
    this.emitter.emit('table:select', $cell)
  }
  insertValue(val) {
    this.current.text(val)
  }
  applyStyle(style) {
    this.group.forEach($cell => {
      $cell.css(style)
    })
  }
}

export default TableSelection
