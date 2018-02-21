import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';

import Menu from '../components/Menu';
import AuthForm from '../components/AuthForm';

import * as userActions from '../actions/UserActions';
import * as headerActions from '../actions/HeaderActions';
import * as authFormActions from '../actions/AuthFormActions';

import {isLoggedIn} from '../services/AuthService';

import CustomLink from '../components/CustomLink';

import './Header.scss';

class Header extends Component {

    render() {
        const {handleLogIn, handleSignUp, handleLogOut} = this.props.userActions;
        const {changeDisplayMenu, changeDisplayAuth} = this.props.headerActions;

        const {menuIsOpen, authIsOpen} = this.props.header;
        const {error} = this.props.user;
        const {fetching} = this.props.load;

        return <article className={menuIsOpen ? 'header-wrap_active-menu header-wrap' : 'header-wrap'}>
            <header className="header home-page__header">
                <CustomLink pathTo="/" className="header__logo" beforeClick={() => changeDisplayMenu(false)}
                            text="Online Library"/>
                <i className={classNames('header__menu-btn', {
                    'header__menu-btn_close': menuIsOpen,
                    'header__menu-btn_open': !menuIsOpen
                })} onClick={() => changeDisplayMenu(!menuIsOpen)}/>
                <Menu menuIsOpen={menuIsOpen}
                      handleLogOut={handleLogOut}
                      username={isLoggedIn()}
                      handleShowAuthForm={changeDisplayAuth}
                      handleDisplayMenu={changeDisplayMenu}/>
                {authIsOpen &&
                <AuthForm onSignIn={handleLogIn} onSignUp={handleSignUp} error={error} fetching={fetching}
                          onClose={() => changeDisplayAuth(false)}
                          {...this.props.authFormActions}
                          {...this.props.auth}/>}
            </header>
        </article>;
    }
}

export default connect(
    state => ({
        user: state.user,
        load: state.load,
        header: state.header,
        auth: state.auth
    }),
    dispatch => ({
        userActions: bindActionCreators(userActions, dispatch),
        headerActions: bindActionCreators(headerActions, dispatch),
        authFormActions: bindActionCreators(authFormActions, dispatch)
    })
)(Header)