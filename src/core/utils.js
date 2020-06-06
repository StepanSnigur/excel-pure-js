export const getMethodName = str => {
  if (typeof str !== 'string') return ''
  // 'click' -> 'onClick'
  return `on${str.charAt(0).toUpperCase()}${str.slice(1)}`
}
