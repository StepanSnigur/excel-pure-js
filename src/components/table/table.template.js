import { defaultStyles } from '@/constants'
import { toInlineStyles } from '@core/utils'
import parse from '@core/parse'

const CODES = {
  A: 65,
  Z: 90
}
const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

const getWidth = (state, idx) => state[idx] || DEFAULT_WIDTH
const getHeight = (state, idx) => state[idx] || DEFAULT_HEIGHT
const withWidthFrom = state => {
  return (col, colId) => ({
    col,
    colId,
    width: getWidth(state, colId)
  })
}
const getValue = (dataState, row, col) => {
  const cellId = `${row}:${col}`
  return dataState[cellId] || ''
}

const toCell = ({ colState, dataState, stylesState }) => (row, col) => {
  const id = `${row}:${col}`
  const styles = toInlineStyles({
    ...defaultStyles,
    ...stylesState[id]
  })
  const data = getValue(dataState, row, col)
  return `
    <div
      class="cell"
      data-col="${col}"
      data-id="${id}"
      data-type="cell"
      style="${styles}; width: ${getWidth(colState, col)}px"
      data-value="${data || ''}"
      contenteditable
    >${parse(data)}</div>
  `
}
const toColumn = ({ col = '', colId, width }) => `
  <div
    class="column"
    data-type="resizable"
    data-col="${colId}"
    style="width: ${width}px"
  >
    ${col}
    <div class="col-resize" data-resize="col"></div>
  </div>
`
const createRow = (rowContent, rowInfo = '', rowState = {}) => `
  <div
    class="row"
    data-type="resizable"
    data-row="${rowInfo}"
    style="height: ${getHeight(rowState, rowInfo)}px"
  >
    <div class="row-info">
      ${rowInfo}
      ${rowInfo && '<div class="row-resize" data-resize="row"></div>'}
    </div>
    <div class="row-data">${rowContent}</div>
  </div>
`
const toChar = (_, idx) => String.fromCharCode(CODES.A + idx)

export const createTable = (rowsCount = 15, state) => {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state.colState))
      .map(toColumn)
      .join('')
  rows.push(createRow(cols))

  for (let row = 1; row <= rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill(row - 1)
        .map(toCell(state))
        .join('')
    rows.push(createRow(cells, row, state.rowState))
  }

  return rows.join('')
}
