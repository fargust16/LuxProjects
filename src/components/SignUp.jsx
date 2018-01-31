import React from 'react';
import PropTypes from 'prop-types';

import './SignForm.scss';
import classNames from "classnames";

const SignUp = ({handleOnSignUp, emailVar, handleChangeEmail, pswdVar, handleChangePswd, rePswdVar, handleChangeRePswd, errorValid, isTipsShow, error, fetching, handleChangeSignType}) => {

    SignUp.propTypes = {
        emailVar: PropTypes.string,
        pswdVar: PropTypes.string,
        rePswdVar: PropTypes.string,
        errorValid: PropTypes.string
    };

    console.log(`pswdVar: ${pswdVar}\nrePswdVar: ${rePswdVar}\nerrorValid: ${errorValid}`);
    console.log(`fetching: ${fetching}\nisTipsShow: ${isTipsShow}\nerror: ${error}`);

    return (
        <form id="sign-up" className="sign-form" onSubmit={handleOnSignUp}>
            <input className="field sign-form__email"
                   type="email"
                   name="email"
                   placeholder="email"
                   value={emailVar}
                   onChange={handleChangeEmail}
                   required/>
            <input className="field sign-form__password"
                   type="password"
                   name="password"
                   placeholder="password"
                   value={pswdVar}
                   onChange={handleChangePswd}
                   required/>
            <input className="field sign-form__password"
                   type="password"
                   name="confirm-password"
                   placeholder="confirm password"
                   value={rePswdVar}
                   onChange={handleChangeRePswd}
                   required/>
            <span className={classNames('sign-form__tips', {
                'sign-form__tips_show': (error || errorValid) && isTipsShow && !fetching
            })}>{error || errorValid}. <br/>Please, try again.</span>
            <div className="sign-form__help" onClick={handleChangeSignType}>
                Already have an account?
            </div>
            <button className="button btn-submit sign-form__button" type="submit">
                Sign Up
            </button>
        </form>
    );
};

export default SignUp;