import React, { Component } from 'react';
import './Menu.css';

class Menu extends Component {

  render() {
    return (
      <nav id="menu" className={this.props.isShow ? "menu menu_open" : "menu menu_close"}>
	    <i className="fa fa-times menu__close-btn" aria-hidden="true" onClick={this.props.handleDisplayMenu.bind(this.props.handleDisplayMenu, false)}></i>
	    <div className="menu__profile"><a className="menu__profile-link" href="#Sign In">Sign In</a></div>
	    <ul className="menu__options">
	      <li className="menu__option"><a className="menu__option-link" href="./index.html">Home</a></li>
	      <li className="menu__option"><a className="menu__option-link" href="./add-book.html">Add a new book</a></li>
	      <li className="menu__option"><a className="menu__option-link" href="./recent.html">Recent</a></li>
	      <li className="menu__option"><a className="menu__option-link" href="./settings.html">Settings</a></li>
	      <li className="menu__option"><a className="menu__option-link" href="./support.html">Support</a></li>
	    </ul>
	  </nav>
    );
  }
}

export default Menu;
