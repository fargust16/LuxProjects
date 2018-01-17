import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie'
import WebFont from 'webfontloader';

import './style.scss';

import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';

WebFont.load({
  google: {
    families: ['Roboto:300,400,700', 'sans-serif']
  }
});

ReactDOM.render(
    <CookiesProvider>
      <App />
    </CookiesProvider>,
  document.getElementById('root')
);
registerServiceWorker();
