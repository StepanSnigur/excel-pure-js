const CODES = {
  A: 65,
  Z: 90
}

const toCell = (row, col) => `
  <div
    class="cell"
    data-col="${col}"
    data-id="${row}:${col}"
    data-type="cell"
    contenteditable
  ></div>
`
const toColumn = (col = '', colId) => `
  <div class="column" data-type="resizable" data-col="${colId}">
    ${col}
    <div class="col-resize" data-resize="col"></div>
  </div>
`
const createRow = (rowContent, rowInfo = '') => `
  <div class="row" data-type="resizable">
    <div class="row-info">
      ${rowInfo}
      ${rowInfo && '<div class="row-resize" data-resize="row"></div>'}
    </div>
    <div class="row-data">${rowContent}</div>
  </div>
`
const toChar = (_, idx) => String.fromCharCode(CODES.A + idx)

export const createTable = (rowsCount = 15) => {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')
  rows.push(createRow(cols))

  for (let row = 1; row <= rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill(row - 1)
        .map(toCell)
        .join('')
    rows.push(createRow(cells, row))
  }

  return rows.join('')
}
