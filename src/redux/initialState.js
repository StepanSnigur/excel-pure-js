import { defaultStyles, defaultTitle } from '@/constants'

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  tableTitle: defaultTitle,
  currentStyles: defaultStyles,
  lastOpened: Date.now()
}
const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

export const normalizeInitialState = state => {
  return state ? normalize(state) : defaultState
}
