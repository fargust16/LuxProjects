import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'js-md5';

import classNames from 'classnames';

import Loading from './Loading.jsx';

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
            <SignInForm handleOnSignIn={ (e) => this.handleOnSignIn(e) }
              emailVar={ email }
              handleChangeEmail={ (e) => this.handleChangeEmail(e) }
              pswdVar={ pswd }
              handleChangePswd={ (e) => this.handleChangePswd(e) }
              isTipsShow={ isTipsShow }
              error={ error }
              fetching={ fetching } />
            :
            <SignUpForm handleOnSignUp={ (e) => this.handleOnSignUp(e) }
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

const SignInForm = ({handleOnSignIn, emailVar, handleChangeEmail, pswdVar, handleChangePswd, isTipsShow, error, fetching}) => {

  SignInForm.propTypes = {
    emailVar: PropTypes.string,
    pswdVar: PropTypes.string,
    isTipsShow: PropTypes.bool,
    error: PropTypes.string
  };

  return (
    <form id="sign-in" className="auth-form__content" onSubmit={ handleOnSignIn }>
      <input className="field auth-form__content-email"
        type="email"
        name="email"
        placeholder="email"
        autoComplete="email"
        value={ emailVar }
        onChange={ handleChangeEmail }
        required />
      <input className="field auth-form__content-password"
        type="password"
        name="password"
        placeholder="password"
        autoComplete="password"
        value={ pswdVar }
        onChange={ handleChangePswd }
        required />
      <span className={ classNames('auth-form__tips', {
                          'auth-form__tips_show': error && isTipsShow && !fetching
                        }) }>{ error }. <br />Please, try again.</span>
      <div className="auth-form__content-help">
        Forgotten your password?
      </div>
      <button className="button btn-submit auth-form__content-btn" type="submit" disabled={ fetching ? true : false }>
        Sign In
      </button>
      { fetching ?
        <div className="auth-form__loading">
          <div className="auth-form__loading-content">
            <Loading />
          </div>
        </div>
        : '' }
    </form>
    );
};

const SignUpForm = ({handleOnSignUp, emailVar, handleChangeEmail, pswdVar, handleChangePswd, rePswdVar, handleChangeRePswd, handleChangeSignType}) => {

  SignUpForm.propTypes = {
    emailVar: PropTypes.string,
    pswdVar: PropTypes.string,
    rePswdVar: PropTypes.string
  };

  return (
    <form id="sign-up" className="auth-form__content">
      <input className="field auth-form__content-email"
        type="email"
        name="email"
        placeholder="email"
        value={ emailVar }
        onChange={ handleChangeEmail }
        required />
      <input className="field auth-form__content-password"
        type="password"
        name="password"
        placeholder="password"
        value={ pswdVar }
        onChange={ handleChangePswd }
        required />
      <input className="field auth-form__content-password"
        type="password"
        name="confirm-password"
        placeholder="confirm password"
        value={ rePswdVar }
        onChange={ handleChangeRePswd }
        required />
      <div className="auth-form__content-help" onClick={ handleChangeSignType }>
        Already have an account?
      </div>
      <button className="button btn-submit auth-form__content-btn" type="submit">
        Sign Up
      </button>
    </form>
    );
};