class ActiveRoute {
  static get path() {
    const hash = window.location.hash
    return hash.indexOf('/') === -1 ?
        hash.slice(1) :
        hash.slice(1, hash.indexOf('/'))
  }
  static get param() {
    return window.location.hash.split('/')[1]
  }
  static navigate(url) {
    window.location.hash = url
  }
}

export default ActiveRoute
