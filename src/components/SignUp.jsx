import React from 'react';
import PropTypes from 'prop-types';

import './SignForm.scss';

const SignUp = ({handleOnSignUp, emailVar, handleChangeEmail, pswdVar, handleChangePswd, rePswdVar, handleChangeRePswd, handleChangeSignType}) => {

  SignUp.propTypes = {
    emailVar: PropTypes.string,
    pswdVar: PropTypes.string,
    rePswdVar: PropTypes.string
  };

  return (
    <form id="sign-up" className="sign-form">
      <input className="field sign-form__email"
        type="email"
        name="email"
        placeholder="email"
        value={ emailVar }
        onChange={ handleChangeEmail }
        required />
      <input className="field sign-form__password"
        type="password"
        name="password"
        placeholder="password"
        value={ pswdVar }
        onChange={ handleChangePswd }
        required />
      <input className="field sign-form__password"
        type="password"
        name="confirm-password"
        placeholder="confirm password"
        value={ rePswdVar }
        onChange={ handleChangeRePswd }
        required />
      <div className="sign-form__help" onClick={ handleChangeSignType }>
        Already have an account?
      </div>
      <button className="button btn-submit sign-form__button" type="submit">
        Sign Up
      </button>
    </form>
    );
};

export default SignUp;