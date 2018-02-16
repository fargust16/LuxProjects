import React, {Component} from 'react';
import PropTypes from 'prop-types';

import BlockHeader from './BlockHeader.jsx';
import BookSwitcher from './BookSwitcher.jsx';

import './Category.scss';

export default class Category extends Component {

    static propTypes = {
        categoryId: PropTypes.number,
        categoryName: PropTypes.string,
        books: PropTypes.array
    };

    render() {
        const {categoryName} = this.props;
        return (
            <section className="category main__category">
                <BlockHeader optionName={categoryName} isShowOption={true} handleChangeView={()=>{}}/>
                <BookSwitcher {...this.props}/>
            </section>
        );
    }
}
