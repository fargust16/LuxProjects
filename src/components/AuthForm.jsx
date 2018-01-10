import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'js-md5';

import classNames from 'classnames';

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

    this.props.onSubmit(authParams).then(user => {
      user ?
        this.props.onClose()
        :
        this.handleShowTips();
    });
  }

  handleOnSignUp(e) {
    console.log('SignUp inProgress');
    return;
  }

  render() {
    const {showSignInForm, email, pswd, rePswd, isTipsShow} = this.state;
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
            <SignInForm handleOnSignIn={ (e) => this.handleOnSignIn(e) }
              emailVar={ email }
              handleChangeEmail={ (e) => this.handleChangeEmail(e) }
              pswdVar={ pswd }
              handleChangePswd={ (e) => this.handleChangePswd(e) }
              isTipsShow={ isTipsShow } />
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

const SignInForm = ({handleOnSignIn, emailVar, handleChangeEmail, pswdVar, handleChangePswd, isTipsShow}) => {

  SignInForm.propTypes = {
    emailVar: PropTypes.string,
    pswdVar: PropTypes.string,
    isTipsShow: PropTypes.bool
  };

  return (
    <form id="sign-in" className="modal-block__content" onSubmit={ handleOnSignIn }>
      <input className="field modal-block__content-email"
        type="email"
        name="email"
        placeholder="email"
        value={ emailVar }
        onChange={ handleChangeEmail }
        required />
      <input className="field modal-block__content-password"
        type="password"
        name="password"
        placeholder="password"
        value={ pswdVar }
        onChange={ handleChangePswd }
        required />
      <span className={ classNames('modal-block__tips', {
                          'modal-block__tips_hide': !isTipsShow
                        }) }>The password or email address did not match.</span>
      <div className="modal-block__content-help">
        Forgotten your password?
      </div>
      <button className="button btn-submit modal-block__content-btn" type="submit">
        Sign In
      </button>
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
    <form id="sign-up" className="modal-block__content">
      <input className="field modal-block__content-email"
        type="email"
        name="email"
        placeholder="email"
        value={ emailVar }
        onChange={ handleChangeEmail }
        required />
      <input className="field modal-block__content-password"
        type="password"
        name="password"
        placeholder="password"
        value={ pswdVar }
        onChange={ handleChangePswd }
        required />
      <input className="field modal-block__content-password"
        type="password"
        name="confirm-password"
        placeholder="confirm password"
        value={ rePswdVar }
        onChange={ handleChangeRePswd }
        required />
      <div className="modal-block__content-help" onClick={ handleChangeSignType }>
        Already have an account?
      </div>
      <button className="button btn-submit modal-block__content-btn" type="submit">
        Sign Up
      </button>
    </form>
    );
};