import React from 'react';
import classNames from 'classnames';

import CustomLink from './CustomLink.jsx';

import './Menu.scss';

const Menu = ({menuIsOpen, handleDisplayMenu, handleShowAuthForm, menuLinks, username, handleLogOut}) => {

    return (
        <nav className={classNames('menu', {
            'menu_open': menuIsOpen,
            'menu_close': !menuIsOpen
        })}>
            <div className="menu__profile">
                {username ?
                    <div className="menu__profile-link" onClick={() => handleLogOut()}>
                        Sign Out
                    </div>
                    :
                    <div className="menu__profile-link" onClick={() => handleShowAuthForm(true)}>
                        Sign In
                    </div>}
            </div>
            <ul className="menu__options">
                {menuLinks.map((link, i) => {
                    let liClass = classNames('menu__option', {
                        'menu__option_hide': link.isRequired && !username
                    });

                    return (
                        <li key={i} className={liClass} onClick={() => handleDisplayMenu(false)}>
                            <CustomLink className="menu__option-link" pathTo={link.path} text={link.name}/>
                        </li>
                    )
                })}
            </ul>
        </nav>
    );
};

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
};

export default Menu;