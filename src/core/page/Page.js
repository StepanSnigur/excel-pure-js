class Page {
  constructor(params) {
    this.params = params || Date.now()
  }

  getRoot() {
    throw new Error('getRoot should be implemented')
  }

  afterRender() {
  }

  destroy() {
  }
}

export default Page
