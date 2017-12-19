import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Menu from '../components/Menu';

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
    
    return (
      <article className={ isShowMenu ? "header-wrap_active-menu header-wrap" : "header-wrap" }>
        <header className="header-nav home-page__header-nav">
          <Link to="/" className="header-nav__logo" onClick={ (isShow) => this.handleDisplayMenu(false) }>
            <h1>Online Library</h1>
          </Link>
          { isShowMenu
            ?
            <i className="fa fa-times header-nav__close-btn" aria-hidden="true" onClick={ (isShow) => this.handleDisplayMenu(false) }></i>
            :
            <i className="fa fa-bars header-nav__open-btn" aria-hidden="true" onClick={ (isShow) => this.handleDisplayMenu(true) }></i> }
          <Menu isShow={ isShowMenu } handleDisplayMenu={ () => this.handleDisplayMenu() } />
        </header>
      </article>
      );
  }
}
