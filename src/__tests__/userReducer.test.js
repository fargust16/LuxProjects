import user from "../reducers/user";
import * as ActionsType from '../constants/User';

describe('A user reducer suite', () => {
  it('should return {username: {}, error: ""} on initial state', () => {
    let initialState = user(void 0, {});
    expect(initialState).toBeDefined();
    expect(initialState).not.toBeNull();
    expect(initialState.username).toMatchObject({});
    expect(initialState.error).toBe('');
  });

  it('should return object after LOGIN_SUCCESS', () => {
    let userTest = {id: 1, username: 'John', password: 'abrakadabra123'};
    let state = user(
      {},
      {
        type: ActionsType.LOGIN_SUCCESS,
        payload: userTest
      }
    );
    expect(state.username).toMatchObject(userTest);
  });

  it('should return error message after LOGIN_FAIL', () => {
    let errMsg = 'something wrong';
    let state = user(
      {},
      {
        type: ActionsType.LOGIN_FAIL,
        payload: errMsg
      }
    );
    expect(state.error).toBe(errMsg);
  });

  it('should return { username: {} } after LOGOUT_SUCCESS', () => {
    let state = user(
      {},
      {
        type: ActionsType.LOGOUT_SUCCESS
      }
    );
    expect(state.username).toMatchObject({});
  });

  it('should return error message after LOGOUT_FAIL', () => {
    let errMsg = 'something wrong';
    let state = user(
      {},
      {
        type: ActionsType.LOGOUT_FAIL,
        payload: errMsg
      }
    );
    expect(state.error).toBe(errMsg);
  });
});
