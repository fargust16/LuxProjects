import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';

import Menu from '../components/Menu';
import AuthForm from './AuthForm';

import * as userActions from '../actions/UserActions';
import {isLoggedIn} from '../services/AuthService';

import CustomLink from '../components/CustomLink';

import './Header.scss';

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            menuIsOpen: false,
            isAuth: false
        }
    }

    handleShowAuthForm(isShowForm) {
        this.setState({
            isAuth: isShowForm
        })
    }

    handleDisplayMenu(isShow) {
        this.setState({
            menuIsOpen: isShow
        });
    }

    render() {
        const {menuIsOpen, isAuth} = this.state;
        const {handleLogIn, handleSignUp, handleLogOut} = this.props.userActions;
        const {error} = this.props.user;
        const {fetching} = this.props.load;

        return <article className={menuIsOpen ? 'header-wrap_active-menu header-wrap' : 'header-wrap'}>
            <header className="header home-page__header">
                <CustomLink pathTo="/" className="header__logo" onClick={() => this.handleDisplayMenu(false)}
                            text="Online Library"/>
                <i className={classNames('header__menu-btn', {
                    'header__menu-btn_close': menuIsOpen,
                    'header__menu-btn_open': !menuIsOpen
                })} onClick={() => this.handleDisplayMenu(!menuIsOpen)}/>
                <Menu menuIsOpen={menuIsOpen}
                      handleLogOut={handleLogOut}
                      username={isLoggedIn()}
                      handleShowAuthForm={::this.handleShowAuthForm}
                      handleDisplayMenu={() => this.handleDisplayMenu()}/>
                {!isAuth ? '' : <AuthForm onSignIn={handleLogIn} onSignUp={handleSignUp} error={error} fetching={fetching}
                                          onClose={() => this.handleShowAuthForm(false)}/>}
            </header>
        </article>;
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
)(Header)