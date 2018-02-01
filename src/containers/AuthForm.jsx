import React, {Component} from 'react';
import sha512 from 'js-sha512';
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
            rePswd: '',
            errorValid: ''
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
            rePswd: e.target.value,
            isTipsShow: false
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
        const {onSignIn} = this.props;

        let authParams = {
            email: email,
            password: sha512(pswd)
        };

        onSignIn(authParams);
    }

    handleOnSignUp(e) {
        e.preventDefault();
        const {email, pswd, rePswd} = this.state;
        const {onSignUp} = this.props;

        if (pswd !== rePswd) {
            this.setState({
                errorValid: 'Passwords does not match!',
                isTipsShow: true
            });
            return;
        }

        let passData = StrongPassGenerator(pswd);

        let authParams = {
            email: email,
            password: passData.password,
            salt: passData.salt
        };

        onSignUp(authParams);
    }

    componentWillReceiveProps(nextProps) {
        const {onClose} = this.props;
        if (!nextProps.fetching && !nextProps.error) {
            onClose();
        } else if (!nextProps.fetching && nextProps.error) {
            this.handleShowTips()
        }
    }

    render() {
        const {showSignInForm, email, pswd, rePswd, errorValid, isTipsShow} = this.state;
        const {onClose, error, fetching} = this.props;

        return (
            <article className="auth-form">
                <main className="auth-form__main">
                    <i className="auth-form__cancel" onClick={onClose}/>
                    <ul className="auth-form__menu">
                        <li className={classNames('auth-form__menu-option sign-in', {
                            'auth-form__active-option': showSignInForm
                        })} onClick={() => this.handleChangeSignType(false)}>
                            Sign In
                        </li>
                        <li className={classNames('auth-form__menu-option sign-up', {
                            'auth-form__active-option': !showSignInForm
                        })} onClick={() => this.handleChangeSignType(true)}>
                            Sign Up
                        </li>
                    </ul>
                    {showSignInForm ?
                        <SignIn handleOnSignIn={::this.handleOnSignIn}
                                emailVar={email}
                                handleChangeEmail={(e) => this.handleChangeEmail(e)}
                                pswdVar={pswd}
                                handleChangePswd={(e) => this.handleChangePswd(e)}
                                isTipsShow={isTipsShow}
                                error={error}
                                fetching={fetching}/>
                        :
                        <SignUp handleOnSignUp={(e) => this.handleOnSignUp(e)}
                                emailVar={email}
                                handleChangeEmail={(e) => this.handleChangeEmail(e)}
                                pswdVar={pswd}
                                handleChangePswd={(e) => this.handleChangePswd(e)}
                                rePswdVar={rePswd}
                                handleChangeRePswd={(e) => this.handleChangeRePswd(e)}
                                handleChangeSignType={() => this.handleChangeSignType(false)}
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