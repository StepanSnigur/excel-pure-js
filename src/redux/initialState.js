import { storage } from '@core/utils'
import { defaultStyles, defaultTitle } from '@/constants'

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  tableTitle: defaultTitle,
  currentStyles: defaultStyles
}

export const initialState = storage('excel-state') ?
  storage('excel-state') :
  defaultState
