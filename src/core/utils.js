export const getMethodName = str => {
  if (typeof str !== 'string') return ''
  // 'click' -> 'onClick'
  return `on${str.charAt(0).toUpperCase()}${str.slice(1)}`
}

export const range = (start, end) => {
  if (start > end) [end, start] = [start, end]
  return new Array(end - start + 1)
      .fill('')
      .map((_, idx) => start + idx)
}
