import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie'
import WebFont from 'webfontloader';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';

import './style.scss';
import history from './history';

import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';

WebFont.load({
  google: {
    families: ['Roboto:300,400,700', 'sans-serif']
  }
});


const store = configureStore();

ReactDOM.render(
  <Provider store={ store }>
    <CookiesProvider>
      <Router history={ history }>
        <App />
      </Router>
    </CookiesProvider>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
