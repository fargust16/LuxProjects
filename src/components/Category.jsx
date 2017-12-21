import React, { Component } from 'react';

import BlockHeader from './BlockHeader.jsx';
import BookSwitcher from './BookSwitcher.jsx';

import './Category.scss';

export default class Category extends Component {

  render() {
    const {categoryId, books} = this.props;
    return (
      <section className="category main__category">
        <BlockHeader blockName="Recommended books" closeVar={true} />
        <BookSwitcher categoryName="Recommended books" books={ books } categoryId={ categoryId } />
      </section>
      );
  }
}
