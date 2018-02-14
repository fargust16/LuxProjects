import { LOAD_START, LOAD_END } from '../constants/Load';

const initialState = {
  fetching: false
};

export default function load(state = initialState, action) {

  switch (action.type) {
    
    case LOAD_START:
      return { ...state, fetching: true };

    case LOAD_END:
      return { ...state, fetching: false };

    default:
      return state;
  }
}
