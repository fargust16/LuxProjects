import React, { Component } from 'react';

import Menu from './Menu';

import './Header.css';

class Header extends Component {

	constructor(props){
		super(props);

		this.state = {
			isShowMenu: false
	  }

    this.handleDisplayMenu = this.handleDisplayMenu.bind(this);
	}

	handleDisplayMenu = (isShow) => {
		this.setState({isShowMenu: isShow});
	}

  render() {
    return (
      <header className="header-nav home-page__header-nav">
		  <a href="index.html" className="header-nav__logo"><h1>Online Library</h1></a>
		  <i className="fa fa-bars header-nav__menu-btn" aria-hidden="true" onClick={this.handleDisplayMenu.bind(this.handleDisplayMenu, true)}></i>
		  <Menu isShow={this.state.isShowMenu} handleDisplayMenu={this.handleDisplayMenu}/>
      </header>
    );
  }
}

export default Header;
