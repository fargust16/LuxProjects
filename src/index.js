import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import WebFont from 'webfontloader';
//import { Provider } from 'react-redux';
//import { configureStore } from './store/configureStore';

import './style.scss';
import history from './history';
import CustomProvider from './CustomProvider.jsx';

import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';

WebFont.load({
  google: {
    families: ['Roboto:300,400,700', 'sans-serif']
  }
});

ReactDOM.render(
    <CookiesProvider>
      <CustomProvider>
        <Router history={ history }>
          <App />
        </Router>
      </CustomProvider>
    </CookiesProvider>,
  document.getElementById('root')
);
registerServiceWorker();
