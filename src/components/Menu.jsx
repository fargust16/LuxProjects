import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

    const {isShow, handleDisplayMenu} = this.props;

    return (
      <nav id="menu" className={ isShow ? "menu menu_open" : "menu menu_close" }>
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
          <li className="menu__option" onClick={ (isShow) => handleDisplayMenu(false) }>
            <Link className="menu__option-link" to="/">
              Home
            </Link>
          </li>
          { (isLoggedIn()) ?
            <li className="menu__option" onClick={ (isShow) => handleDisplayMenu(false) }>
              <Link className="menu__option-link" to="/books/add-book">
                Add a new book
              </Link>
            </li>
            : '' }
          <li className="menu__option" onClick={ (isShow) => handleDisplayMenu(false) }>
            <Link className="menu__option-link" to="/books/recent">
              Recent
            </Link>
          </li>
          { (isLoggedIn()) ?
            <li className="menu__option" onClick={ (isShow) => handleDisplayMenu(false) }>
              <Link className="menu__option-link" to="/settings">
                Settings
              </Link>
            </li>
            : '' }
          <li className="menu__option" onClick={ (isShow) => handleDisplayMenu(false) }>
            <Link className="menu__option-link" to="/support">
              Support
            </Link>
          </li>
        </ul>
        { this.state.isAuth ? <AuthForm onSubmit={ login } onClose={ (isShowForm) => this.handleShowAuthForm(false) } /> : '' }
      </nav>
      );
  }
}