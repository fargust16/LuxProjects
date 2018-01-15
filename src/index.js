import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie'
import WebFont from 'webfontloader';

import './style.scss';

import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';
import { configureStore } from './store/configureStore';

WebFont.load({
  google: {
    families: ['Roboto:300,400,700', 'sans-serif']
  }
});

const store = configureStore();

ReactDOM.render(
  <Provider store={ store }>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
