import { range } from '@core/utils'

export const isCell = e => {
  return e.target.dataset.type === 'cell'
}

export const matrix = ($current, $target) => {
  const target = $target.id(true)
  const current = $current.id(true)

  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)

  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
}

export const nextSelector = (key, { col, row }) => {
  const MIN_VALUE = 0

  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break;
    case 'Tab':
    case 'ArrowRight':
      col++
      break;
    case 'ArrowLeft':
      if (col > MIN_VALUE) col--
      break;
    case 'ArrowUp':
      if (row > MIN_VALUE) row--
      break;
  }

  return `[data-id="${row}:${col}"]`
}
