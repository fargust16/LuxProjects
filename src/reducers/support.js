import * as ActionTypes from '../constants/Support';

const initialState = {
    subject: '',
    message: '',
    error: '',
    successMes: '',
    popUpShow: false
};

export default function support(state = initialState, action) {

    switch (action.type) {

        case ActionTypes.CHANGE_SUBJECT_TEXT:
            return {...state, subject: action.payload, error: ''};

        case ActionTypes.CHANGE_MESSAGE_TEXT:
            return {...state, message: action.payload, error: ''};

        case ActionTypes.MAIL_TO_SUPPORT_SUCCESS:
            return {
                ...state, successMes: action.payload.id && 'Your email was send to support center',
                error: '', subject: '', message: '', popUpShow: true
            };

        case ActionTypes.MAIL_TO_SUPPORT_FAIL:
            return {...state, error: action.payload};

        case ActionTypes.RESET_INPUT_DATA:
            return {...state, subject: '', message: '', successMes: '', error: '', popUpShow: false};

        default:
            return state;
    }
}