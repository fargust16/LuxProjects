import React, {Component} from 'react';
import Option from '../components/Option.jsx';
import './Settings.scss';
import * as userActions from "../actions/UserActions";
import * as settingActions from "../actions/SettingActions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import sha512 from "js-sha512";
import {StrongPassGenerator} from '../components/AuthForm';
import {PopUp} from '../components/PopUp';

class Settings extends Component {

    handleOnEmailChange(e) {
        e.preventDefault();
        const {newEmail, pswdOnEmail} = this.props.settings;
        const {id, salt} = this.props.user.username;
        const {handleEmailChange} = this.props.userActions;

        let pass = sha512(pswdOnEmail);
        pass = sha512(salt + pass);

        let userData = {
            id: id,
            type: 'username',
            newEmail: newEmail,
            password: pass
        };

        handleEmailChange(userData);
    }

    handleOnPasswordChange(e) {
        e.preventDefault();
        const {pswdOnPswd, newPswd, rePswd} = this.props.settings;
        const {id, salt} = this.props.user.username;
        const {handlePasswordChange} = this.props.userActions;
        const {validPasswordsFail} = this.props.settingActions;

        if (newPswd !== rePswd) {
            validPasswordsFail();
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

        handlePasswordChange(userData);
    }

    render() {
        const {username} = this.props.user.username;
        const {error} = this.props.user;
        const {fetching} = this.props.load;

        const {newEmail, pswdOnEmail, pswdOnPswd, newPswd, emailTipsIsShow, pswdTipsIsShow, rePswd, errorValid,
            confirmMessage, changeIsSuccess} = this.props.settings;

        const {changeNewEmail, changeEmailPassword, changePswdPassword, changeNewPassword, changeReNewPassword,
            cancelChangeEmail, cancelChangePassword, submitChanges} = this.props.settingActions;

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
                                onCancel={() => cancelChangeEmail()}>
                            <input type="email"
                                   name="test-email"
                                   className="field option__field"
                                   placeholder="new email address"
                                   onChange={(e) => changeNewEmail(e.target.value)}
                                   value={newEmail}
                                   required/>
                            <input type="password"
                                   className="field option__field"
                                   placeholder="current password"
                                   onChange={(e) => changeEmailPassword(e.target.value)}
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
                                onCancel={() => cancelChangePassword()}>
                            <input type="password"
                                   className="field option__field"
                                   placeholder="current password"
                                   onChange={(e) => changePswdPassword(e.target.value)}
                                   value={pswdOnPswd}
                                   required/>
                            <input type="password"
                                   className="field option__field"
                                   placeholder="new password"
                                   onChange={(e) => changeNewPassword(e.target.value)}
                                   value={newPswd}
                                   required/>
                            <input type="password"
                                   className="field option__field"
                                   placeholder="confirm new password"
                                   onChange={(e) => changeReNewPassword(e.target.value)}
                                   value={rePswd}
                                   required/>
                        </Option>
                    </form>
                </article>
                {changeIsSuccess && !fetching && <PopUp message={confirmMessage} onSubmit={() => submitChanges()}/>}
            </main>
        );
    }
}

export default connect(
    state => ({
        user: state.user,
        load: state.load,
        settings: state.settings
    }),
    dispatch => ({
        userActions: bindActionCreators(userActions, dispatch),
        settingActions: bindActionCreators(settingActions, dispatch),

    })
)(Settings)
