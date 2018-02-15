import * as ActionTypes from '../constants/Comments';

export const showMoreComments = (maxComments) => (dispatch) => dispatch({
    type: ActionTypes.SHOW_MORE_COMMENTS,
    payload: maxComments
});

export const changeCommentText = (commentText) => (dispatch) => dispatch({
    type: ActionTypes.CHANGE_COMMENT_TEXT,
    payload: commentText
});

export const changeCommentsView = (commentsIsShow) => (dispatch) => dispatch({
    type: ActionTypes.SHOW_COMMENTS,
    payload: commentsIsShow
});

export const showCommentButtons = (buttonsIsShow) => (dispatch) => dispatch({
    type: ActionTypes.SHOW_COMMENT_BUTTONS,
    payload: buttonsIsShow
});

export const changeCommentsOffset = (commentsOffset) => (dispatch) => dispatch({
    type: ActionTypes.CHANGE_COMMENTS_OFFSET,
    payload: commentsOffset
});