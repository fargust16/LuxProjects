import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Menu from '../components/Menu';
import classNames from 'classnames';

import './Header.scss';

export default class Header extends Component {

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
          <Menu isShow={ isMenuVisible } handleDisplayMenu={ () => this.handleDisplayMenu() } />
        </header>
      </article>
      );
  }
}
