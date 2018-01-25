import load from "../reducers/load";
import * as ActionsType from '../constants/Load';

describe('A reducers suite', () => {
  it('should return {fetching: false} on initial state', () => {
    let initialState = load(void 0, {});
    expect(initialState).toBeDefined();
    expect(initialState).not.toBeNull();
    expect(initialState.fetching).toBe(false);
  });

  it('should return {fetching: true} after load is start', () => {
    let state = load(
      {},
      {
        type: ActionsType.LOAD_START
      }
    );
    expect(state.fetching).toBe(true);
  });

  it('should return {fetching: false} after load is end', () => {
    let state = load(
      {
        fetching: true
      },
      {
        type: ActionsType.LOAD_END
      }
    );
    expect(state.fetching).toBe(false);
  });
});
