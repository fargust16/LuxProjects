import React from 'react';
import ReactDOM from 'react-dom';

import Header from './client/components/Header.jsx';
import Search from './client/components/Search.jsx';

import Home from './client/components/Home.jsx';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<div>
		<Header />
		<Search />
		<Home />
	</div>, 
	document.getElementById('root')
);
registerServiceWorker();
