import { combineReducers } from 'redux';
import page from './page';
import user from './user';
import books from './books';
import load from './load';

import { routerReducer } from 'react-router-redux';

export default combineReducers({
	page,
	user,
	books,
	load,
	routing: routerReducer
})