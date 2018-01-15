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

  testUserFunction(e) {
    this.props.getPassword(e.target.innerText);
  }

  handleShowAuthForm(isShowForm) {
    this.setState({
      isAuth: isShowForm
    })
  }

  render() {
    const {isShow, handleDisplayMenu, menuLinks, username, password, fetching} = this.props;

    return (
      <nav className={ isShow ? "menu menu_open" : "menu menu_close" }>
        <div className="menu__profile">
          { (isLoggedIn()) ?
            <div className="menu__profile-link" onClick={ () => logout() }>
              Sign Out
            </div>
            :
            <div className="menu__profile-link" onClick={ (isShowForm) => this.handleShowAuthForm(true) }>
              Sign In
            </div> }
        </div>
        <ul className="menu__options">
          { menuLinks.map((link, i) => {
              let liClass = classNames('menu__option', {
                'menu__option_hide': link.isRequired && !isLoggedIn()
              });
            
              return (
                <li key={ i } className={ liClass } onClick={ (isShow) => handleDisplayMenu(false) }>
                  <Link className="menu__option-link" to={ link.path }>
                    { link.name }
                  </Link>
                </li>
              )
            }) }
          <li className="menu__option" onClick={ ::this.testUserFunction }>
            <span className="menu__option-link">{ username }</span>
          </li>
          <li className="menu__option">
            { fetching ?
              <span className="menu__option-link">Loading...</span>
              :
              <span className="menu__option-link">Your password is { password }</span> }
          </li>
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