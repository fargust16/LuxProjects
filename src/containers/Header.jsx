import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Menu from '../components/Menu';
import classNames from 'classnames';

import './Header.scss';

export default class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isShowMenu: false
    }
  }

  handleDisplayMenu(isShow) {
    this.setState({
      isShowMenu: isShow
    });
  }

  render() {
    const {isShowMenu} = this.state;

    console.log(isShowMenu)

    return (
      <article className={ isShowMenu ? "header-wrap_active-menu header-wrap" : "header-wrap" }>
        <header className="header-nav home-page__header-nav">
          <Link to="/" className="header-nav__logo" onClick={ (isShow) => this.handleDisplayMenu(false) }>
            <h1>Online Library</h1>
          </Link>
          <i className={ classNames({
                           'header-nav__close-btn': isShowMenu,
                           'header-nav__open-btn': !isShowMenu
                         }) } onClick={ (isShow) => this.handleDisplayMenu(!isShowMenu) }></i>
          <Menu isShow={ isShowMenu } handleDisplayMenu={ () => this.handleDisplayMenu() } />
        </header>
      </article>
      );
  }
}
