const CODES = {
  A: 65,
  Z: 90
}
const toCell = (content = '') => `
  <div class="cell" contenteditable>${content}</div>
`
const toColumn = (col = '') => `
  <div class="column">${col}</div>
`
const createRow = (rowContent, rowInfo = '') => {
  return `
    <div class="row">
        <div class="row-info">${rowInfo}</div>
        <div class="row-data">${rowContent}</div>
    </div>
  `
}
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
