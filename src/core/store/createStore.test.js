import createStore from './createStore'

describe('createStore', () => {
  const initialState = {
    count: 0
  }
  const mockReducer = (state = initialState, action) => {
    if (action.type === 'ADD') {
      return {
        ...state,
        count: state.count + 1
      }
    }
    return state
  }
  let store;
  let handler;

  beforeEach(() => {
    store = createStore(mockReducer, initialState)
    handler = jest.fn()
  })

  test('Should return store object', () => {
    expect(store).toBeDefined()
    expect(store.dispatch).toBeDefined()
    expect(store.subscribe).toBeDefined()
    expect(store.getState).toBeDefined()
  })
  test('Should return object as state', () => {
    expect(store.getState()).toBeInstanceOf(Object)
  })
  test('Should return defaultState', () => {
    expect(store.getState()).toEqual(initialState)
  })
  test('Should change state if action exists', () => {
    store.dispatch({ type: 'ADD' })
    expect(store.getState().count).toBe(1)
  })
  test('Should not change state if action dont exists', () => {
    store.dispatch({ type: 'NOT_EXIST' })
    expect(store.getState().count).toBe(0)
  })
  test('Should call subscriber function', () => {
    store.subscribe(handler)
    store.dispatch({ type: 'ADD' })

    expect(handler).toHaveBeenCalled()
    expect(handler).toHaveBeenCalledWith(store.getState())
  })
  test('Should not call subscriber function in unsubscribe', () => {
    const unsub = store.subscribe(handler)
    unsub.unsubscribe()
    store.dispatch({ type: 'ADD' })

    expect(handler).not.toHaveBeenCalled()
  })
})
