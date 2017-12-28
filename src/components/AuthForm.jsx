import React, { Component } from 'react';
import md5 from 'js-md5';

import classNames from 'classnames';

import './AuthForm.scss';

class AuthForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      signIn: true,
      showTips: false,
      authIsCorrect: false,
      email: '',
      password: '',
      cPassword: ''
    }
  }

  handleChangeEmail(e) {
    this.setState({
      email: e.target.value,
      showTips: false
    })
  }

  handleChangePassword(e) {
    this.setState({
      password: e.target.value,
      showTips: false
    })
  }

  handleChangeConfirmPassword(e) {
    this.setState({
      cPassword: e.target.value
    })
  }

  handleChangeSignType(type) {
    this.setState({
      signIn: !type
    })
  }

  handleShowTips() {
    this.setState({
      showTips: true
    })
  }

  handleOnSubmit(e) {
    e.preventDefault();
    const {email, password} = this.state;

    let authParams = {
      email: email,
      password: md5(password)
    };

    this.props.onSubmit(authParams).then(user => {
      user ? 
      this.props.onClose()
      :
      this.handleShowTips();
    });
  }

  render() {
    const {signIn, email, password, cPassword, showTips} = this.state;
    const {onClose} = this.props;

    return (
      <article className="modal-block">
        <main className="modal-block__main">
          <i className="modal-block__cancel" onClick={ onClose }></i>
          <ul className="modal-block__menu">
            <li className={ classNames('modal-block__menu-option sign-in', {
                              'modal-block__active-option': signIn
                            }) } onClick={ (type) => this.handleChangeSignType(false) }>
              Sign In
            </li>
            <li className={ classNames('modal-block__menu-option sign-up', {
                              'modal-block__active-option': !signIn
                            }) } onClick={ (type) => this.handleChangeSignType(true) }>
              Sign Up
            </li>
          </ul>
          { signIn ?
            <form id="sign-in" className="modal-block__content" onSubmit={ (e) => this.handleOnSubmit(e) }>
              <input className="field modal-block__content-email"
                type="email"
                name="email"
                placeholder="email"
                value={ email }
                onChange={ (e) => this.handleChangeEmail(e) }
                required />
              <input className="field modal-block__content-password"
                type="password"
                name="password"
                placeholder="password"
                value={ password }
                onChange={ (e) => this.handleChangePassword(e) }
                required />
              <span className={ classNames('modal-block__tips', {
                                  'modal-block__tips_hide': !showTips
                                }) }>The password or email address did not match.</span>
              <div className="modal-block__content-help">
                Forgotten your password?
              </div>
              <button className="button btn-submit modal-block__content-btn" type="submit">
                Sign In
              </button>
            </form>
            :
            <div id="sign-up" className="modal-block__content">
              <input className="field modal-block__content-email"
                type="email"
                name="email"
                placeholder="email"
                value={ email }
                onChange={ (e) => this.handleChangeEmail(e) }
                required />
              <input className="field modal-block__content-password"
                type="password"
                name="password"
                placeholder="password"
                value={ password }
                onChange={ (e) => this.handleChangePassword(e) }
                required />
              <input className="field modal-block__content-password"
                type="password"
                name="confirm-password"
                placeholder="confirm password"
                value={ cPassword }
                onChange={ (e) => this.handleChangeConfirmPassword(e) }
                required />
              <div className="modal-block__content-help" onClick={ (type) => this.handleChangeSignType(false) }>
                Already have an account?
              </div>
              <button className="button btn-submit modal-block__content-btn" type="submit">
                Sign Up
              </button>
            </div> }
        </main>
      </article>
      );
  }
}

export default AuthForm;
