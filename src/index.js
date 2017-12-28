import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie'
import { Router } from 'react-router-dom';
import WebFont from 'webfontloader';

import './style.scss';

import App from './App';
import history from './history';

import registerServiceWorker from './registerServiceWorker';

WebFont.load({
  google: {
    families: ['Roboto:300,400,700', 'sans-serif']
  }
});

ReactDOM.render(
  <CookiesProvider>
    <Router history={history}>
      <App />
    </Router>
  </CookiesProvider>,
  document.getElementById('root')
);
registerServiceWorker();
