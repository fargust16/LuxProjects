import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Menu from './Menu';

import './Header.scss';

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
      <header className="header-nav home-page__header-nav">
		  <Link to="/" className="header-nav__logo" onClick={(isShow) => handleDisplayMenu(false)}><h1>Online Library</h1></Link>
		  <i className="fa fa-bars header-nav__menu-btn" aria-hidden="true" onClick={(isShow) => handleDisplayMenu(true)}></i>
		  <Menu isShow={isShowMenu} handleDisplayMenu={handleDisplayMenu}/>
      </header>
    );
  }
}

export default Header;
