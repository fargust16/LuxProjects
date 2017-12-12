import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Header from './client/components/Header.jsx';

import Home from './client/components/Home.jsx';
import AddBook from './client/components/AddBook.jsx';
import Recent from './client/components/Recent.jsx';
import Settings from './client/components/Settings.jsx';
import Support from './client/components/Support.jsx';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<Router>
		<div>
			<Header />
			<Route exact path="/" component={Home}/>
    	<Route path="/add-book" component={AddBook}/>
    	<Route path="/recent" component={Recent}/>
    	<Route path="/settings" component={Settings}/>
    	<Route path="/support" component={Support}/>
    </div>
	</Router>, 
	document.getElementById('root')
);
registerServiceWorker();
