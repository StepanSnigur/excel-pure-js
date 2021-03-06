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

export const storage = (key, data) => {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  localStorage.setItem(key, JSON.stringify(data))
}

export const isEqual = (a, b) => {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }

  return a === b
}

export const toDashCase = str => {
  return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
}

export const toInlineStyles = (styles = {}) => {
  return Object.keys(styles)
      .map(key => `${toDashCase(key)}: ${styles[key]}`)
      .join(';')
}

export const debounce = (callback, delay) => {
  let timeout;

  return (...args) => {
    const later = () => {
      clearTimeout(timeout)
      callback(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, delay)
  }
}

export const preventDefault = e => e.preventDefault()
