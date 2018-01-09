import React, { Component } from 'react';

import BlockHeader from './BlockHeader.jsx';
import BookSwitcher from './BookSwitcher.jsx';

import './Category.scss';

export default class Category extends Component {

  render() {
    const {categoryId, books} = this.props;
    return (
      <section className="Category main__category">
        <BlockHeader optionName="Recommended books" isShowOption={true} />
        <BookSwitcher categoryName="Recommended books" books={ books } categoryId={ categoryId } />
      </section>
      );
  }
}
