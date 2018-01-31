import React, {Component} from 'react';
import Option from '../components/Option.jsx';
import './Settings.scss';
import * as userActions from "../actions/UserActions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import sha512 from "js-sha512";

class Settings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isTipsShow: false,
            emailOnEmail: '',
            pswdOnEmail: '',
            emailOnPswd: '',
            pswdOnPswd: '',
            rePswd: '',
            errorValid: ''
        }
    }

    handleChangeEmailOnEmail(e) {
        this.setState({
            emailOnEmail: e.target.value,
            isTipsShow: false
        })
    }

    handleChangePswdOnEmail(e) {
        this.setState({
            pswdOnEmail: e.target.value,
            isTipsShow: false
        })
    }

    handleChangeEmailOnPswd(e) {
        this.setState({
            emailOnPswd: e.target.value,
            isTipsShow: false
        })
    }

    handleChangePswdOnPswd(e) {
        this.setState({
            pswdOnPswd: e.target.value,
            isTipsShow: false
        })
    }

    handleChangeRePswd(e) {
        this.setState({
            rePswd: e.target.value,
            isTipsShow: false
        })
    }

    handleRemoveOnFocus(e) {
        e.target.removeAttribute('readOnly');
    }

    handleOnEmailChange(e) {
        e.preventDefault();
        const {email, pswd} = this.state;
        const {onEmailChange} = this.props.userActions;

        let authParams = {
            email: email,
            password: sha512(pswd)
        };

        onEmailChange(authParams);
    }

    handleOnPasswordChange() {
    }

    render() {
        const {id, username} = this.props.user.username;
        const {emailOnEmail, pswdOnEmail, pswdOnPswd, emailOnPswd, isTipsShow, rePswd, errorValid} = this.state;
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
                                error={errorValid}
                                isTipsShow={isTipsShow}>
                            <input type="email"
                                   name="test-email"
                                   className="field option__field"
                                   placeholder="new email address"
                                   onChange={(e) => this.handleChangeEmailOnEmail(e)}
                                   value={emailOnEmail}
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
                                error={errorValid}
                                isTipsShow={isTipsShow}>
                            <input type="password"
                                   className="field option__field"
                                   placeholder="current password"
                                   onChange={(e) => this.handleChangeEmailOnPswd(e)}
                                   value={emailOnPswd}
                                   required/>
                            <input type="password"
                                   className="field option__field"
                                   placeholder="new password"
                                   onChange={(e) => this.handleChangePswdOnPswd(e)}
                                   value={pswdOnPswd}
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
