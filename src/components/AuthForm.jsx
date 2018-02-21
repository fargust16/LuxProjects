import React, {Component} from 'react';
import sha512 from 'js-sha512';
import classNames from 'classnames';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import './AuthForm.scss';

class AuthForm extends Component {

    static defaultProps = {
        changeSignInFormView: function() {},
        changeSignUpFormView: function () {}
    };

    handleOnSignIn(e) {
        e.preventDefault();
        const {email, password} = this.props;
        const {onSignIn} = this.props;

        let authParams = {
            email: email,
            password: sha512(password)
        };

        onSignIn(authParams);
    }

    handleOnSignUp(e) {
        e.preventDefault();
        const {email, password, rePassword} = this.props;
        const {onSignUp} = this.props;
        const {validPasswordsFail} = this.props.authFormActions;

        if (password !== rePassword) {
            validPasswordsFail();
            return;
        }

        let passData = StrongPassGenerator(password);

        let authParams = {
            email: email,
            password: passData.password,
            salt: passData.salt
        };

        onSignUp(authParams);
    }

    render() {
        const {
            signInIsShow, signUpIsShow, email, password, rePassword, errorValid, isTipsShow, onClose,
            error, fetching, changeSignInFormView, changeSignUpFormView, changeEmail,
            changePassword, changeRePassword
        } = this.props;

        return (
            <article className="auth-form">
                <main className="auth-form__main">
                    <i className="auth-form__cancel" onClick={onClose}/>
                    <ul className="auth-form__menu">
                        <li className={classNames('auth-form__menu-option sign-in', {
                            'auth-form__active-option': signInIsShow
                        })} onClick={() => {
                            !signInIsShow && changeSignInFormView(true)
                        }}>
                            Sign In
                        </li>
                        <li className={classNames('auth-form__menu-option sign-up', {
                            'auth-form__active-option': signUpIsShow
                        })} onClick={() => {
                            !signUpIsShow && changeSignUpFormView(true)
                        }}>
                            Sign Up
                        </li>
                    </ul>
                    {signInIsShow &&
                    <SignIn handleOnSignIn={::this.handleOnSignIn}
                            emailVar={email}
                            handleChangeEmail={(e) => changeEmail(e.target.value)}
                            pswdVar={password}
                            handleChangePswd={(e) => changePassword(e.target.value)}
                            isTipsShow={isTipsShow}
                            error={error}
                            fetching={fetching}/>}
                    {signUpIsShow &&
                    <SignUp handleOnSignUp={(e) => this.handleOnSignUp(e)}
                            emailVar={email}
                            handleChangeEmail={(e) => changeEmail(e.target.value)}
                            pswdVar={password}
                            handleChangePswd={(e) => changePassword(e.target.value)}
                            rePswdVar={rePassword}
                            handleChangeRePswd={(e) => changeRePassword(e.target.value)}
                            handleChangeSignType={() => changeSignInFormView(true)}
                            errorValid={errorValid}
                            isTipsShow={isTipsShow}
                            error={error}
                            fetching={fetching}/>}
                </main>
            </article>
        );
    }
}

export const StrongPassGenerator = (password) => {
    let pass, salt, passSalt;

    pass = sha512(password);
    salt = RandomStringGenerate(5);
    passSalt = sha512(salt + pass);

    return {
        'password': passSalt,
        'salt': salt
    };
};

const RandomStringGenerate = (n) => {
    let salt = '';
    while (salt.length < n)
        salt += String.fromCharCode(Math.random() * 127).replace(/\W|\d|_/g, '');
    return salt;
};

export default AuthForm;