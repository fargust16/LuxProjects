import React, { Component } from 'react';
import md5 from 'js-md5';

import classNames from 'classnames';

import './AuthForm.scss';

class AuthForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showSignInForm : true,
      showTips: false,
      authIsCorrect: false,
      email: '',
      pswd: '',
      rePswd: ''
    }
  }

  handleChangeEmail(e) {
    this.setState({
      email: e.target.value,
      showTips: false
    })
  }

  handleChangePswd(e) {
    this.setState({
      pswd: e.target.value,
      showTips: false
    })
  }

  handleChangeRePswd(e) {
    this.setState({
      rePswd: e.target.value
    })
  }

  handleChangeSignType(type) {
    this.setState({
      showSignInForm : !type
    })
  }

  handleShowTips() {
    this.setState({
      showTips: true
    })
  }

  handleOnSubmit(e) {
    e.preventDefault();
    const {email, pswd} = this.state;

    let authParams = {
      email: email,
      password: md5(pswd)
    };

    this.props.onSubmit(authParams).then(user => {
      user ? 
      this.props.onClose()
      :
      this.handleShowTips();
    });
  }

  render() {
    const {showSignInForm , email, pswd, rePswd, showTips} = this.state;
    const {onClose} = this.props;

    return (
      <article className="modal-block">
        <main className="modal-block__main">
          <i className="modal-block__cancel" onClick={ onClose }></i>
          <ul className="modal-block__menu">
            <li className={ classNames('modal-block__menu-option sign-in', {
                              'modal-block__active-option': showSignInForm 
                            }) } onClick={ (type) => this.handleChangeSignType(false) }>
              Sign In
            </li>
            <li className={ classNames('modal-block__menu-option sign-up', {
                              'modal-block__active-option': !showSignInForm 
                            }) } onClick={ (type) => this.handleChangeSignType(true) }>
              Sign Up
            </li>
          </ul>
          { showSignInForm ?
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
                value={ pswd }
                onChange={ (e) => this.handleChangePswd(e) }
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
                value={ pswd }
                onChange={ (e) => this.handleChangePswd(e) }
                required />
              <input className="field modal-block__content-password"
                type="password"
                name="confirm-password"
                placeholder="confirm password"
                value={ rePswd }
                onChange={ (e) => this.handleChangeRePswd(e) }
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
