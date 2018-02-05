import * as ActionTypes from '../constants/Comments';

export const showMoreComments = (maxComments) => (dispatch) => dispatch({
    type: ActionTypes.SHOW_MORE_COMMENTS,
    payload: maxComments
});