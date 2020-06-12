const getPageUrl = url => url.replace(':', '/')
const getHumanDate = milliseconds => {
  const date = new Date(milliseconds)
  return `${date.toLocaleDateString()} | ${date.toLocaleTimeString()}`
}

const toHTML = ({ key, data, lastOpened }) => `
  <li class="db__record">
    <a href="#${getPageUrl(key)}">${data.tableTitle}</a>
    <strong>${getHumanDate(lastOpened)}</strong>
  </li>
`
const getAllKeys = () => {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key.includes('excel')) keys.push(key)
  }
  return keys
}
const getDataFromKey = key => {
  const data = JSON.parse(localStorage.getItem(key))
  return {
    lastOpened: data.lastOpened,
    data,
    key
  }
}

export const createRecordsTable = () => {
  const keys = getAllKeys()
  if (!keys.length) return `<p>Вы пока не создали ни одной таблицы</p>`

  return `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>
    <ul class="db__list">
      ${keys.map(getDataFromKey).map(toHTML).join('')}
    </ul>
  `
}
