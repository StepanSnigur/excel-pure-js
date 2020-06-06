const CODES = {
  A: 65,
  Z: 90
}

const toCell = (_, idx) => `
  <div class="cell" data-index="index" data-id="${idx}" contenteditable></div>
`
const toColumn = (col = '', idx) => `
  <div class="column" data-type="resizable" data-id="${idx}">
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

  for (let i = 1; i <= rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('')
    rows.push(createRow(cells, i))
  }

  return rows.join('')
}
