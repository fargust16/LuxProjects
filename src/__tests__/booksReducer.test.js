import books from "../reducers/books";
import * as ActionsType from '../constants/Book';

describe('A books reducer suite', () => {
  it('state should be defined on initial state', () => {
    let initialState = books(void 0, {});
    expect(initialState).toBeDefined();
    expect(initialState).not.toBeNull();
    expect(initialState.allBooks).toHaveLength(0);
    expect(initialState.bookById).toMatchObject({});
    expect(initialState.recBooks).toHaveLength(0);
    expect(initialState.error).toBe('');
  });

  it('should return {allBooks: []} on initial state', () => {
    let initialState = books(void 0, {});
    expect(initialState.allBooks).toHaveLength(0);
  });
  it('should return {bookById: {}} on initial state', () => {
    let initialState = books(void 0, {});
    expect(initialState.bookById).toMatchObject({});
  });
  it('should return {recBooks: []} on initial state', () => {
    let initialState = books(void 0, {});
    expect(initialState.recBooks).toHaveLength(0);
  });

  it('should return {error: ""} on initial state', () => {
    let initialState = books(void 0, {});
    expect(initialState.error).toBe('');
  });

  it('should return two books after GET_ALL_BOOKS_SUCCESS', () => {
    let allBooksTest = [{id: 1, title: 'Harry Potter'}, {id: 2, title: 'Alchemist'}];
    let state = books(
      {},
      {
        type: ActionsType.GET_ALL_BOOKS_SUCCESS,
        payload: allBooksTest
      }
    );
    expect(state.allBooks).toHaveLength(2);
  });

  it('should return two books after GET_RECENT_BOOKS_SUCCESS', () => {
    let recBooksTest = [{id: 1, title: 'Harry Potter'}, {id: 2, title: 'Alchemist'}];
    let state = books(
      {},
      {
        type: ActionsType.GET_RECENT_BOOKS_SUCCESS,
        payload: recBooksTest
      }
    );
    expect(state.recBooks).toHaveLength(2);
  });

  it('should return two books after GET_BOOK_BY_ID_SUCCESS', () => {
    let bookTest = {id: 1, title: 'Harry Potter'};
    let state = books(
      {},
      {
        type: ActionsType.GET_BOOK_BY_ID_SUCCESS,
        payload: bookTest
      }
    );
    expect(state.bookById).toMatchObject(bookTest);
  });

  it('should return error message after GET_RECENT_BOOKS_FAIL', () => {
    let errMsg = 'error message'
    let state = books(
      {
        fetching: true
      },
      {
        type: ActionsType.GET_RECENT_BOOKS_FAIL,
        payload: errMsg
      }
    );
    expect(state.error).toBe(errMsg);
  });
});
