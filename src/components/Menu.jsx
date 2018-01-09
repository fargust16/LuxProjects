import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import AuthForm from './AuthForm.jsx';

import { login, logout, isLoggedIn } from '../services/AuthService';

import './Menu.scss';

export default class Menu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isAuth: false
    }
  }

  handleShowAuthForm(isShowForm) {
    this.setState({
      isAuth: isShowForm
    })
  }

  render() {

    const {isShow, handleDisplayMenu, menuLinks} = this.props;

    return (
      <nav className={ isShow ? "Menu Menu_open" : "Menu Menu_close" }>
        <div className="Menu__profile">
          { (isLoggedIn()) ?
            <div className="Menu__profile-link" onClick={ () => logout() }>
              Sign Out
            </div>
            :
            <div className="Menu__profile-link" onClick={ (isShowForm) => this.handleShowAuthForm(true) }>
              Sign In
            </div> }
        </div>
        <ul className="Menu__options">
          { menuLinks.map((link, i) => {
              let liClass = classNames('Menu__option', {
                'Menu__option_hide': link.isRequired && !isLoggedIn()
              });
            
              return (
                <li key={ i } className={ liClass } onClick={ (isShow) => handleDisplayMenu(false) }>
                  <Link className="Menu__option-link" to={ link.path }>
                    { link.name }
                  </Link>
                </li>
              )
            }) }
        </ul>
        { this.state.isAuth ? <AuthForm onSubmit={ login } onClose={ (isShowForm) => this.handleShowAuthForm(false) } /> : '' }
      </nav>
      );
  }
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