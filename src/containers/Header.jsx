import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import Menu from '../components/Menu';
import AuthForm from '../components/AuthForm.jsx';

import * as userActions from '../actions/UserActions';
import { isLoggedIn } from '../services/AuthService';

import './Header.scss';

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isMenuVisible: false,
      isAuth: false
    }
  }

  handleShowAuthForm(isShowForm) {
    //console.log(isShowForm);
    this.setState({
      isAuth: isShowForm
    })
  }

  handleDisplayMenu(isShow) {
    this.setState({
      isMenuVisible: isShow
    });
  }

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps.user);
    //nextProps.user.username ? this.handleShowAuthForm(false) : this.handleShowAuthForm(false);
  }

  render() {
    const {isMenuVisible, isAuth} = this.state;
    const {handleLogIn, handleLogOut} = this.props.userActions;
    const {username, error, fetching} = this.props.user;

    return (
      <article className={ isMenuVisible ? "header-wrap_active-menu header-wrap" : "header-wrap" }>
        <header className="header home-page__header">
          <Link to="/" className="header__logo" onClick={ (isShow) => this.handleDisplayMenu(false) }>
            <h1>Online Library</h1>
          </Link>
          <i className={ classNames({
                           'header__close-btn': isMenuVisible,
                           'header__open-btn': !isMenuVisible
                         }) } onClick={ (isShow) => this.handleDisplayMenu(!isMenuVisible) }></i>
          <Menu isShow={ isMenuVisible }
            handleLogOut={ handleLogOut }
            username={ isLoggedIn() }
            handleShowAuthForm={ ::this.handleShowAuthForm }
            handleDisplayMenu={ () => this.handleDisplayMenu() } />
          { isAuth ? <AuthForm onSignIn={ handleLogIn } error={ error } fetching={fetching} onClose={ (isShowForm) => this.handleShowAuthForm(false) } /> : '' }
        </header>
      </article>
      );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)