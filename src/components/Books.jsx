import React, { Component } from 'react';

//import Book from './Book.jsx';
import BookSwitcher from './BookSwitcher.jsx';

import './Books.scss';

class Books extends Component {

  render() {
    return (
    	<div className="books home-page__books">
	      <BookSwitcher categoryId={this.props.categoryId || 0} categoryView={this.props.categoryView} />
	    </div>
    );
  }
}

export default Books;
