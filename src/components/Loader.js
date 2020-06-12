import { $ } from '../core/dom'

function Loader() {
  return $.create('div', 'loader').html(`
    <div class="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  `)
}

export default Loader
