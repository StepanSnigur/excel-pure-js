import {
  CHANGE_TEXT,
  CHANGE_STYLES,
  TABLE_RESIZE,
  APPLY_STYLE,
  CHANGE_TABLE_TITLE
} from '@/redux/types'

export const tableResize = payload => ({
  type: TABLE_RESIZE,
  payload
})

export const changeText = payload => ({
  type: CHANGE_TEXT,
  payload
})

export const changeStyles = payload => ({
  type: CHANGE_STYLES,
  payload
})

export const applyStyle = payload => ({
  type: APPLY_STYLE,
  payload
})

export const changeTableTitle = payload => ({
  type: CHANGE_TABLE_TITLE,
  payload
})
