import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Loading from './Loading.jsx';

import './SignForm.scss';

const SignIn = ({handleOnSignIn, emailVar, handleChangeEmail, pswdVar, handleChangePswd, isTipsShow, error, fetching}) => {

    SignIn.propTypes = {
        emailVar: PropTypes.string,
        pswdVar: PropTypes.string,
        isTipsShow: PropTypes.bool,
        error: PropTypes.string
    };

    return (
        <form id="sign-in" className="sign-form" onSubmit={handleOnSignIn}>
            <input className="field sign-form__email"
                   type="email"
                   name="email"
                   placeholder="email"
                   autoComplete="email"
                   value={emailVar}
                   onChange={handleChangeEmail}
                   required/>
            <input className="field sign-form__password"
                   type="password"
                   name="password"
                   placeholder="password"
                   autoComplete="password"
                   value={pswdVar}
                   onChange={handleChangePswd}
                   required/>
            <span className={classNames('sign-form__tips', {
                'sign-form__tips_show': error && isTipsShow && !fetching
            })}>{error}. <br/>Please, try again.</span>
            <div className="sign-form__help">
                Forgotten your password?
            </div>
            <button className="button btn-submit sign-form__button" type="submit" disabled={!!fetching}>
                Sign In
            </button>
            {fetching ?
                <div className="sign-form__loading">
                    <div className="sign-form__loading-content">
                        <Loading/>
                    </div>
                </div>
                : ''}
        </form>
    );
};

export default SignIn;