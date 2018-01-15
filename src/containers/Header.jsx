import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Menu from '../components/Menu';
import * as userActions from '../actions/UserActions';
import classNames from 'classnames';

import './Header.scss';

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isMenuVisible: false
    }
  }

  handleDisplayMenu(isShow) {
    this.setState({
      isMenuVisible: isShow
    });
  }

  render() {
    const {isMenuVisible} = this.state;
    const {getUserData} = this.props.userActions;
    const {username, password, fetching} = this.props.user;

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
            getPassword={ getUserData }
            username={username}
            password={password}
            fetching={fetching}
            handleDisplayMenu={ () => this.handleDisplayMenu() } />
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