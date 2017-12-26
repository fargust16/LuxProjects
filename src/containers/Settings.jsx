import React, { Component } from 'react';

import Option from '../components/Option.jsx';
import './Settings.scss';

export default class Settings extends Component {
  render() {
    return (
      <main className="settings other-pages__block">
        <div className="main-header">
          <span className="main-header__text">Settings</span>
        </div>
        <div className="settings__header">
          <span className="settings__info">Email address</span>
          <div className="settings__email">
            user@gmail.com
          </div>
        </div>
        <article className="options settings__options">
          <Option optionType={'email'}>
            <input type="email"
              name="email"
              className="field option__field"
              placeholder="new email address"
              required />
            <input type="password"
              name="password"
              className="field option__field"
              placeholder="current password" />
          </Option>
          <Option optionType={'password'}>
            <input type="password"
              name="old-pass"
              className="field option__field"
              placeholder="current password"
              required />
            <input type="password"
              name="new-pass"
              className="field option__field"
              placeholder="new password" />
            <input type="password"
              name="confirm-pass"
              className="field option__field"
              placeholder="confirm new password" />
          </Option>
        </article>
      </main>
      );
  }
}
