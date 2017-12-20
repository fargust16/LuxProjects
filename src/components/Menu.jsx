import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Menu.scss';

export default class Menu extends Component {

  render() {

    const {isShow, handleDisplayMenu} = this.props;

    return (
      <nav id="menu" className={ isShow ? "menu menu_open" : "menu menu_close" }>
        <div className="menu__profile">
          <a className="menu__profile-link" href="#Sign In">Sign In</a>
        </div>
        <ul className="menu__options">
          <li className="menu__option" onClick={ (isShow) => handleDisplayMenu(false) }>
            <Link className="menu__option-link" to="/">
              Home
            </Link>
          </li>
          <li className="menu__option" onClick={ (isShow) => handleDisplayMenu(false) }>
            <Link className="menu__option-link" to="/books/add-book">
              Add a new book
            </Link>
          </li>
          <li className="menu__option" onClick={ (isShow) => handleDisplayMenu(false) }>
            <Link className="menu__option-link" to="/books/recent">
              Recent
            </Link>
          </li>
          <li className="menu__option" onClick={ (isShow) => handleDisplayMenu(false) }>
            <Link className="menu__option-link" to="/settings">
              Settings
            </Link>
          </li>
          <li className="menu__option" onClick={ (isShow) => handleDisplayMenu(false) }>
            <Link className="menu__option-link" to="/support">
              Support
            </Link>
          </li>
        </ul>
      </nav>
      );
  }
}