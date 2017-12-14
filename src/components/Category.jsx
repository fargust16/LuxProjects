import React, { Component } from 'react';

import BlockHeader from './BlockHeader.jsx';
import BookSwitcher from './BookSwitcher.jsx';

import './Category.scss';

class Category extends Component {

  render() {
    const { categoryView } = this.props;
    return (
      <section className="category main__category">
        <BlockHeader blockName="Recommended books" />
        <BookSwitcher categoryName="Recommended books" categoryView={categoryView} />
      </section>
    );
  }
}

export default Category;
