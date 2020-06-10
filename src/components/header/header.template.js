const createHeader = title => `
  <input type="text" class="input" value="${title || 'Новая таблица'}">
  <div>
    <div class="button">
      <i class="material-icons">delete</i>
    </div>
    <div class="button">
      <i class="material-icons">exit_to_app</i>
    </div>
  </div>
`

export default createHeader
