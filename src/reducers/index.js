import {combineReducers} from 'redux';
import user from './user';
import books from './books';
import load from './load';
import settings from './settings';
import readBook from './readBook';
import comments from './comments';
import header from './header';
import auth from './auth';
import addBook from './addBook';
import support from './support';
import search from './search';

export default combineReducers({
    user,
    books,
    load,
    settings,
    readBook,
    comments,
    header,
    auth,
    addBook,
    support,
    search
})