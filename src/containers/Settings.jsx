import React, {Component} from 'react';
import Option from '../components/Option.jsx';
import './Settings.scss';
import * as userActions from "../actions/UserActions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import sha512 from "js-sha512";
import {StrongPassGenerator} from './AuthForm';
import {PopUp} from '../components/PopUp';

class Settings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            emailTipsIsShow: false,
            pswdTipsIsShow: false,
            newEmail: '',
            pswdOnEmail: '',
            pswdOnPswd: '',
            newPswd: '',
            rePswd: '',
            errorValid: '',
            confirmMessage: '',
            changeIsSuccess: false
        }
    }

    handleChangeEmail(e) {
        this.setState({
            newEmail: e.target.value,
            emailTipsIsShow: false
        })
    }

    handleChangePswdOnEmail(e) {
        this.setState({
            pswdOnEmail: e.target.value,
            emailTipsIsShow: false
        })
    }

    handleChangePswdOnPswd(e) {
        this.setState({
            pswdOnPswd: e.target.value,
            pswdTipsIsShow: false
        })
    }

    handleChangeNewPswd(e) {
        this.setState({
            newPswd: e.target.value,
            pswdTipsIsShow: false
        })
    }

    handleChangeRePswd(e) {
        this.setState({
            rePswd: e.target.value,
            pswdTipsIsShow: false
        })
    }

    handleOnSuccessChanged() {
        this.setState({
            changeIsSuccess: true
        })
    }

    handleOnCancelEmail() {
        this.setState({
            newEmail: '',
            pswdOnEmail: ''
        })
    }

    handleOnCancelPswd() {
        this.setState({
            newPswd: '',
            pswdOnPswd: '',
            rePswd: ''
        })
    }

    handleRemoveOnFocus(e) {
        e.target.removeAttribute('readOnly');
    }

    handleOnEmailChange(e) {
        e.preventDefault();
        const {newEmail, pswdOnEmail} = this.state;
        const {id, salt} = this.props.user.username;
        const {handleUpdateUserData} = this.props.userActions;

        let pass = sha512(pswdOnEmail);
        pass = sha512(salt + pass);

        let userData = {
            id: id,
            type: 'username',
            newEmail: newEmail,
            password: pass
        };

        handleUpdateUserData(userData);
    }

    handleOnPasswordChange(e) {
        e.preventDefault();
        const {pswdOnPswd, newPswd, rePswd} = this.state;
        const {id, salt} = this.props.user.username;
        const {handleUpdateUserData} = this.props.userActions;

        if (newPswd !== rePswd) {
            this.setState({
                errorValid: 'Passwords does not match',
                isTipsShow: true
            });
            return;
        }

        let pass = sha512(pswdOnPswd);
        pass = sha512(salt + pass);

        let newPass = StrongPassGenerator(newPswd);

        let userData = {
            id: id,
            type: 'password',
            password: pass,
            newPassword: newPass
        };

        handleUpdateUserData(userData);
    }

    handleOnSubmitChanged() {
        this.setState({
            changeIsSuccess: false,
            emailTipsIsShow: false,
            pswdTipsIsShow: false
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        let err = nextProps.user.error;
        if(err.length !== 0) {
            this.setState({
                emailTipsIsShow: err.search('username') !==  -1,
                pswdTipsIsShow: err.search('password') !==  -1
            });
        } else if (nextProps.user.error.length === 0) {
            this.handleOnSuccessChanged();
            this.setState({confirmMessage: 'Changed Success'})
            this.handleOnCancelEmail();
            this.handleOnCancelPswd();
        }
    }

    render() {
        const {username} = this.props.user.username;
        const {error} = this.props.user;
        const {pswdOnEmail, newEmail, pswdOnPswd, newPswd, emailTipsIsShow, pswdTipsIsShow, rePswd, errorValid, confirmMessage, changeIsSuccess} = this.state;

        console.log(`${changeIsSuccess}`);
        return (
            <main className="settings other-pages__block">
                <div className="main-header">
                    <span className="main-header__text">Settings</span>
                </div>
                <div className="settings__header">
                    <span className="settings__info">Email address</span>
                    <div className="settings__email">
                        {username}
                    </div>
                </div>
                <article className="options settings__options">
                    <form action="" method="POST" onSubmit={(e) => this.handleOnEmailChange(e)}>
                        <Option optionName="Change email"
                                subClass="settings__form"
                                needButtons={true}
                                errorValid={errorValid}
                                error={error}
                                tipsIsShow={emailTipsIsShow}
                                onCancel={::this.handleOnCancelEmail}>
                            <input type="email"
                                   name="test-email"
                                   className="field option__field"
                                   placeholder="new email address"
                                   onChange={(e) => this.handleChangeEmail(e)}
                                   value={newEmail}
                                   readOnly
                                   onFocus={(e) => this.handleRemoveOnFocus(e)}
                                   required/>
                            <input type="password"
                                   className="field option__field"
                                   placeholder="current password"
                                   onChange={(e) => this.handleChangePswdOnEmail(e)}
                                   value={pswdOnEmail}
                                   required/>
                        </Option>
                    </form>
                    <form action="" method="POST" onSubmit={(e) => this.handleOnPasswordChange(e)}>
                        <Option optionName="Change password"
                                subClass="settings__form"
                                needButtons={true}
                                errorValid={errorValid}
                                error={error}
                                tipsIsShow={pswdTipsIsShow}
                                onCancel={::this.handleOnCancelPswd}>
                            <input type="password"
                                   className="field option__field"
                                   placeholder="current password"
                                   onChange={(e) => this.handleChangePswdOnPswd(e)}
                                   value={pswdOnPswd}
                                   required/>
                            <input type="password"
                                   className="field option__field"
                                   placeholder="new password"
                                   onChange={(e) => this.handleChangeNewPswd(e)}
                                   value={newPswd}
                                   required/>
                            <input type="password"
                                   className="field option__field"
                                   placeholder="confirm new password"
                                   onChange={(e) => this.handleChangeRePswd(e)}
                                   value={rePswd}
                                   required/>
                        </Option>
                    </form>
                </article>
                {changeIsSuccess
                    ? <PopUp message='Changed success' onSubmit={::this.handleOnSubmitChanged}/>
                    : ''}
            </main>
        );
    }
}

export default connect(
    state => ({
        user: state.user,
        load: state.load
    }),
    dispatch => ({
        userActions: bindActionCreators(userActions, dispatch)
    })
)(Settings)
