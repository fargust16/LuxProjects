import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'js-md5';

import classNames from 'classnames';

import SignIn from '../components/SignIn.jsx';
import SignUp from '../components/SignUp.jsx';

import './AuthForm.scss';

class AuthForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showSignInForm: true,
      isTipsShow: false,
      isAuthCorrect: false,
      email: '',
      pswd: '',
      rePswd: ''
    }
  }

  handleChangeEmail(e) {
    this.setState({
      email: e.target.value,
      isTipsShow: false
    })
  }

  handleChangePswd(e) {
    this.setState({
      pswd: e.target.value,
      isTipsShow: false
    })
  }

  handleChangeRePswd(e) {
    this.setState({
      rePswd: e.target.value
    })
  }

  handleChangeSignType(type) {
    this.setState({
      showSignInForm: !type
    })
  }

  handleShowTips() {
    this.setState({
      isTipsShow: true
    })
  }

  handleOnSignIn(e) {
    e.preventDefault();
    const {email, pswd} = this.state;

    let authParams = {
      email: email,
      password: md5(pswd)
    };

    this.props.onSignIn(authParams);
  }

  handleOnSignUp(e) {
    console.log('SignUp inProgress');
    return;
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.fetching && !nextProps.error) {
      this.props.onClose()
    } else if (!nextProps.fetching && nextProps.error) {
      this.handleShowTips()
    }
  }

  render() {
    const {showSignInForm, email, pswd, rePswd, isTipsShow} = this.state;
    const {onClose, error, fetching} = this.props;

    return (
      <article className="auth-form">
        <main className="auth-form__main">
          <i className="auth-form__cancel" onClick={ onClose }></i>
          <ul className="auth-form__menu">
            <li className={ classNames('auth-form__menu-option sign-in', {
                              'auth-form__active-option': showSignInForm
                            }) } onClick={ (type) => this.handleChangeSignType(false) }>
              Sign In
            </li>
            <li className={ classNames('auth-form__menu-option sign-up', {
                              'auth-form__active-option': !showSignInForm
                            }) } onClick={ (type) => this.handleChangeSignType(true) }>
              Sign Up
            </li>
          </ul>
          { showSignInForm ?
            <SignIn handleOnSignIn={ ::this.handleOnSignIn}
              emailVar={ email }
              handleChangeEmail={ (e) => this.handleChangeEmail(e) }
              pswdVar={ pswd }
              handleChangePswd={ (e) => this.handleChangePswd(e) }
              isTipsShow={ isTipsShow }
              error={ error }
              fetching={ fetching } />
            :
            <SignUp handleOnSignUp={ (e) => this.handleOnSignUp(e) }
              emailVar={ email }
              handleChangeEmail={ (e) => this.handleChangeEmail(e) }
              pswdVar={ pswd }
              handleChangePswd={ (e) => this.handleChangePswd(e) }
              rePswdVar={ rePswd }
              handleChangeRePswd={ (e) => this.handleChangeRePswd(e) }
              handleChangeSignType={ (type) => this.handleChangeSignType(false) } /> }
        </main>
      </article>
      );
  }
}

export default AuthForm;