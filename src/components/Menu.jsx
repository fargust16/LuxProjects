import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './Menu.scss';

const Menu = ({isShow, handleDisplayMenu, handleShowAuthForm, menuLinks, username, handleLogOut}) => {

  return (
    <nav className={ isShow ? "menu menu_open" : "menu menu_close" }>
      <div className="menu__profile">
        { username ?
          <div className="menu__profile-link" onClick={ () => handleLogOut() }>
            Sign Out
          </div>
          :
          <div className="menu__profile-link" onClick={ (isShowForm) => handleShowAuthForm(true) }>
            Sign In
          </div> }
      </div>
      <ul className="menu__options">
        { menuLinks.map((link, i) => {
            let liClass = classNames('menu__option', {
              'menu__option_hide': link.isRequired && !username
            });
          
            return (
              <li key={ i } className={ liClass } onClick={ (isShow) => handleDisplayMenu(false) }>
                <Link className="menu__option-link" to={ link.path }>
                  { link.name }
                </Link>
              </li>
            )
          }) }
      </ul>
    </nav>
    );
}

Menu.defaultProps = {
  menuLinks: [
    {
      name: 'Home',
      path: '/',
      isRequired: false
    },
    {
      name: 'Add a new book',
      path: '/books/add-book',
      isRequired: true
    },
    {
      name: 'Recent',
      path: '/books/recent',
      isRequired: false
    },
    {
      name: 'Settings',
      path: '/settings',
      isRequired: true
    },
    {
      name: 'Support',
      path: '/support',
      isRequired: false
    },
  ]
}

export default Menu;