import Router from './Router'
import Page from '../page/Page'

class MockDashboardPage extends Page {
  getRoot() {
    const root = document.createElement('div')
    root.innerHTML = 'dashboard'
    return root
  }
}
class MockExcelPage extends Page {}

describe('Router', () => {
  let router
  let $root

  beforeEach(() => {
    $root = document.createElement('div')
    router = new Router($root, {
      dashboard: MockDashboardPage,
      excel: MockExcelPage
    })
  })

  test('Should be defined', () => {
    expect(router).toBeDefined()
  })
  test('Should render dashboard page', async () => {
    await router.changePageHandler()
    expect($root.innerHTML).toBe('<div>dashboard</div>')
  })
})
