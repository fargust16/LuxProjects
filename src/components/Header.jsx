import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Menu from './Menu';

import './Header.scss';
import './Menu.scss';

class Header extends Component {

  constructor(props){
    super(props);

    this.state = {
      isShowMenu: false
    }

    this.handleDisplayMenu = this.handleDisplayMenu.bind(this);
  }

  handleDisplayMenu(isShow) {
    this.setState({isShowMenu: isShow});
  }

  render() {
    const { isShowMenu } = this.state;
    const { handleDisplayMenu } = this;
    return (
      <article className={isShowMenu ? "header-wrap_active-menu header-wrap" : "header-wrap"}>
        <header className="header-nav home-page__header-nav">
          <Link to="/" className="header-nav__logo" onClick={(isShow) => handleDisplayMenu(false)}><h1>Online Library</h1></Link>
          {
            isShowMenu ? <i className="fa fa-times header-nav__close-btn" aria-hidden="true" onClick={(isShow) => handleDisplayMenu(false)}></i> : <i className="fa fa-bars header-nav__open-btn" aria-hidden="true" onClick={(isShow) => handleDisplayMenu(true)}></i>
          }
         

          <nav id="menu" className={isShowMenu ? "menu menu_open" : "menu menu_close"}>
            <div className="menu__profile"><a className="menu__profile-link" href="#Sign In">Sign In</a></div>
            <ul className="menu__options">
              <li className="menu__option" onClick={(isShow) => handleDisplayMenu(false)}><Link className="menu__option-link" to="/">Home</Link></li>
              <li className="menu__option" onClick={(isShow) => handleDisplayMenu(false)}><Link className="menu__option-link" to="/add-book">Add a new book</Link></li>
              <li className="menu__option" onClick={(isShow) => handleDisplayMenu(false)}><Link className="menu__option-link" to="/recent">Recent</Link></li>
              <li className="menu__option" onClick={(isShow) => handleDisplayMenu(false)}><Link className="menu__option-link" to="/settings">Settings</Link></li>
              <li className="menu__option" onClick={(isShow) => handleDisplayMenu(false)}><Link className="menu__option-link" to="/support">Support</Link></li>
            </ul>
          </nav>
        </header>
      </article>
    );
  }
}

export default Header;
