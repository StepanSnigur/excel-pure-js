const createHeader = title => `
  <input type="text" class="input" value="${title || 'Новая таблица'}">
  <div>
    <div class="button" data-role="delete">
      <i class="material-icons" data-role="delete">delete</i>
    </div>
    <div class="button" data-role="exit">
      <i class="material-icons" data-role="exit">exit_to_app</i>
    </div>
  </div>
`

export default createHeader
