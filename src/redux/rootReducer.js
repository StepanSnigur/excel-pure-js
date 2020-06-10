import {
  CHANGE_TEXT,
  CHANGE_STYLES,
  TABLE_RESIZE,
  APPLY_STYLE, CHANGE_TABLE_TITLE
} from '@/redux/types'

const rootReducer = (state, action) => {
  let field;
  let newState;
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.payload.type === 'col' ? 'colState' : 'rowState'
      return {
        ...state,
        [field]: {
          ...state[field],
          [action.payload.id]: action.payload.size
        }
      }
    case CHANGE_TEXT:
      newState = {...state.dataState} || {}
      newState[action.payload.id] = action.payload.value
      return {
        ...state,
        currentText: action.payload.value,
        dataState: newState
      }
    case CHANGE_STYLES:
      return {
        ...state,
        currentStyles: action.payload
      }
    case APPLY_STYLE:
      newState = {...state.stylesState} || {}
      action.payload.ids.forEach(id => {
        newState[id] = {
          ...newState[id],
          ...action.payload.data
        }
      })
      return {
        ...state,
        stylesState: newState,
        currentStyles: {
          ...state.currentStyles,
          ...action.payload.data
        }
      }
    case CHANGE_TABLE_TITLE:
      return {
        ...state,
        tableTitle: action.payload
      }
    default:
      return state
  }
}

export default rootReducer
