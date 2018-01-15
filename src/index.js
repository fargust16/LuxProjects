import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie'
import WebFont from 'webfontloader';

import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';
import { configureStore } from './store/configureStore';

import './style.scss';

WebFont.load({
  google: {
    families: ['Roboto:300,400,700', 'sans-serif']
  }
});

const store = configureStore();

ReactDOM.render(
  <CookiesProvider>
    <Provider store={ store }>
      <App />
    </Provider>
  </CookiesProvider>,
  document.getElementById('root')
);
registerServiceWorker();
