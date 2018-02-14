import * as ActionTypes from '../constants/Comments';
import {ADD_COMMENT_SUCCESS} from '../constants/Book';

const initialState = {
    commentsIsShow: true,
    buttonsIsShow: false,
    commentsOffset: 0,
    newCommentText: '',
    maxComments: 5
};

export default function comments(state = initialState, action) {

    switch (action.type) {

        case ActionTypes.SHOW_MORE_COMMENTS:
            return {...state, maxComments: action.payload};

        case ActionTypes.CHANGE_COMMENT_TEXT:
            return {...state, newCommentText: action.payload};

        case ActionTypes.SHOW_COMMENTS:
            return {...state, commentsIsShow: action.payload};

        case ActionTypes.SHOW_COMMENT_BUTTONS:
            return {...state, buttonsIsShow: action.payload};

        case ActionTypes.CHANGE_COMMENTS_OFFSET:
            return {...state, commentsOffset: action.payload};

        case ADD_COMMENT_SUCCESS:
            return {...state, newCommentText: '', buttonsIsShow: false};

        default:
            return state;
    }
}
