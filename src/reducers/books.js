import * as ActionTypes from '../constants/Book';


const initialState = {
    allBooks: [],
    bookById: {},
    recBooks: [],
    userBooks: [],
    error: ''
};

export default function books(state = initialState, action) {

    switch (action.type) {

        case ActionTypes.GET_ALL_BOOKS_SUCCESS:
            return {
                ...state,
                allBooks: action.payload,
                bookById: {},
                error: '',
            };

        case ActionTypes.GET_ALL_BOOKS_FAIL:
            return {
                ...state,
                error: action.payload
            };

        case ActionTypes.GET_BOOK_BY_ID_SUCCESS:
            return {
                ...state,
                bookById: action.payload,
                error: '',
            };

        case ActionTypes.GET_BOOK_BY_ID_FAIL:
            return {
                ...state,
                error: action.payload
            };

        case ActionTypes.GET_RECENT_BOOKS_SUCCESS:
            return { ...state, recBooks: action.payload, error: '' };

        case ActionTypes.GET_RECENT_BOOKS_FAIL:
            return { ...state, error: action.payload };

        case ActionTypes.ADD_COMMENT_SUCCESS:
            let newComments = state.bookById.comments ? state.bookById.comments.concat(action.comment) : [action.comment];
            newComments[newComments.length - 1].id = action.payload.id || 0;

            return {
                ...state,
                bookById: {...state.bookById, comments: newComments},
                error: '',
            };

        case ActionTypes.ADD_COMMENT_FAIL:
            return {
                ...state,
                error: action.payload
            };

        case ActionTypes.ADD_REVIEW_SUCCESS:
            let newReview = state.bookById.reviews ? state.bookById.reviews.concat(action.review) : [action.review];
            newReview[newReview.length - 1].id = action.payload.id || 0;

            return {
                ...state,
                bookById: {...state.bookById, reviews: newReview},
                error: '',
            };

        case ActionTypes.ADD_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            };

        case ActionTypes.ADD_RECENT_BOOK_SUCCESS:
            return state;

        case ActionTypes.ADD_RECENT_BOOK_FAIL:
            return {...state, error: action.payload};

        default:
            return state;
    }
}
