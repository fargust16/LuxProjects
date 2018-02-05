import * as ActionTypes from '../constants/Comments';

const initialState = {
    showCom: false,
    showComments: false,
    commentsOffset: 0,
    comments: [],
    commentText: '',
    maxComments: 5,
    isAuth: false
};

export default function comments(state = initialState, action) {

    switch (action.type) {

        case ActionTypes.SHOW_MORE_COMMENTS:
            return {...state, maxComments: action.payload};

        default:
            return state;
    }
}
