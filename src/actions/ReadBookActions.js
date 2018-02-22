import * as ActionTypes from '../constants/ReadBook';

export const nextBookPage = (nextPage) => (dispatch) => dispatch({
    type: ActionTypes.CHANGE_BOOK_PAGE,
    payload: nextPage
});
export const resizeBookPage = (newPageSize) => (dispatch) => dispatch({
    type: ActionTypes.CHANGE_BOOK_PAGE_SIZE,
    payload: newPageSize
});
export const changeEndOfSwitch = (endOfSwitch) => (dispatch) => dispatch({
    type: ActionTypes.CHANGE_END_OF_SWITCH,
    payload: endOfSwitch
});

export const changeReadOffset = (readOffset) => (dispatch) => dispatch({
    type: ActionTypes.CHANGE_READ_OFFSET,
    payload: readOffset
});

export const changeMaxReadOffset = (newMaxOffset) => (dispatch) => dispatch({
    type: ActionTypes.CHANGE_MAX_READ_OFFSET,
    payload: newMaxOffset
});
