import {combineReducers} from 'redux';
import page from './page';
import user from './user';
import books from './books';
import load from './load';
import settings from './settings';
import readBook from './readBook';
import comments from './comments';
import header from './header';
import auth from './auth';
import addBook from './addBook';

export default combineReducers({
    page,
    user,
    books,
    load,
    settings,
    readBook,
    comments,
    header,
    auth,
    addBook
})