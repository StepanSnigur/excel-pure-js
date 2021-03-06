const createStore = (rootReducer, initialState = {}) => {
  let state = rootReducer({...initialState}, {type: '__INITIAL__'})
  let listeners = []

  return {
    subscribe(callback) {
      listeners.push(callback)

      return {
        unsubscribe() {
          listeners = listeners.filter(listener => listener !== callback)
        }
      }
    },
    dispatch(action) {
      state = rootReducer(state, action)
      listeners.forEach(listener => listener(state))
    },
    getState() {
      return JSON.parse(JSON.stringify(state))
    }
  }
}

export default createStore
