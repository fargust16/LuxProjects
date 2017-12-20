import React, { Component } from 'react';

import './Settings.scss';

export default class Settings extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showEmailOptions: window.innerWidth >= 768 ? true : false,
      showPasswordOptions: window.innerWidth >= 768 ? true : false
    }

    this.resizeWindow = this.resizeWindow.bind(this);
  }

  handleShowExternalOptions(elem) {
    const {showEmailOptions, showPasswordOptions} = this.state;

    if (elem === 'email-settings') {
      this.setState({
        showEmailOptions: !showEmailOptions
      });
    } else if (elem === 'password-settings') {
      this.setState({
        showPasswordOptions: !showPasswordOptions
      });
    }
  }

  resizeWindow() {
    const {showEmailOptions, showPasswordOptions} = this.state;

    this.setState({
      showPasswordOptions: window.innerWidth >= 768 ? showPasswordOptions : false,
      showEmailOptions: window.innerWidth >= 768 ? showEmailOptions : false
    });
  }

  componentWillMount() {
    window && window.addEventListener('resize', this.resizeWindow, false);
  }

  componentWillUnmount() {
    window && window.removeEventListener('resize', this.resizeWindow, false);
  }

  render() {
    const {showEmailOptions, showPasswordOptions} = this.state;

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
          <section className="option">
            <div onClick={ (elem) => this.handleShowExternalOptions('email-settings') } className={ showEmailOptions ? "header header_open" : "header header_close" }>
              <span className="header__text">Change email</span>
            </div>
            <form ref="email_settings"
              name="email-settings"
              action=""
              method="POST"
              className={ showEmailOptions ? "option__content settings__form" : "option__content settings__form_hide" }>
              <input type="email"
                name="email"
                className="field option__field"
                placeholder="new email address"
                required />
              <input type="password"
                name="password"
                className="field option__field"
                placeholder="current password" />
              <div className="option__buttons">
                <button className="button btn-clear" type="reset" onClick={ (elem) => this.handleShowExternalOptions('email-settings') }>
                  Cancel
                </button>
                <button className="button btn-submit" type="submit">
                  Save changes
                </button>
              </div>
            </form>
          </section>
          <section className="option">
            <div onClick={ (elem) => this.handleShowExternalOptions('password-settings') } className={ showPasswordOptions ? "header header_open" : "header header_close" }>
              <span className="header__text">Change password</span>
            </div>
            <form ref="password_settings"
              name="password-settings"
              action=""
              method="POST"
              className={ showPasswordOptions ? "option__content settings__form" : "option__content settings__form_hide" }>
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
              <div className="option__buttons">
                <button className="button btn-clear" type="reset" onClick={ (elem) => this.handleShowExternalOptions('password-settings') }>
                  Cancel
                </button>
                <button className="button btn-submit" type="submit">
                  Save changes
                </button>
              </div>
            </form>
          </section>
        </article>
      </main>
      );
  }
}
