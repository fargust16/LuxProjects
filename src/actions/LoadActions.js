import { LOAD_START, LOAD_END } from '../constants/Load';

export const loadStart = (dispatch) => dispatch({
  type: LOAD_START
})

export const loadEnd = (dispatch) => dispatch({
  type: LOAD_END
})