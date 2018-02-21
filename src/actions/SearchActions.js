import * as ActionTypes from '../constants/Search';
import {loadStart, loadEnd} from './LoadActions';

import * as api from '../services/api';

export const changeSearchInput = (searchText) => dispatch => dispatch({
    type: ActionTypes.CHANGE_SEARCH_INPUT_TEXT,
    payload: searchText
});

export const changeSearchType = (searchType) => dispatch => dispatch({
    type: ActionTypes.CHANGE_SEARCH_TYPE,
    payload: searchType
});

export const handleStartSearch = (searchParams) => dispatch => {

    loadStart(dispatch);

    api.getSearchResults(searchParams)
        .then(data => {
            dispatch({
                type: ActionTypes.GET_SEARCH_RESULT_SUCCESS,
                payload: data
            });
            loadEnd(dispatch);
        })
        .catch(err => {
            dispatch({
                type: ActionTypes.GET_SEARCH_RESULT_FAIL,
                payload: err
            });
            loadEnd(dispatch);
        });
};