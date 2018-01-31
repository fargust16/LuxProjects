import React, {Component} from 'react';
import PropTypes from 'prop-types';

import BlockHeader from './BlockHeader.jsx';
import BookSwitcher from './BookSwitcher.jsx';

import './Category.scss';

export default class Category extends Component {

    static propTypes = {
        categoryId: PropTypes.string,
        books: PropTypes.array
    };

    render() {
        const {categoryId, books} = this.props;
        return (
            <section className="category main__category">
                <BlockHeader optionName="recommended books" isShowOption={true} handleChangeView={()=>{}}/>
                <BookSwitcher categoryName="recommended books" books={books} categoryId={categoryId}/>
            </section>
        );
    }
}
