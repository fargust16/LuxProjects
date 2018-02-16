import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Slider from './Slider.jsx';
import Book from './Book.jsx';

import CustomLink from './CustomLink.jsx';

import './BookSwitcher.scss';

export default class BookSwitcher extends Component {

    static defaultProps = {
        books: []
    };

    static propTypes = {
        books: PropTypes.array
    };

    render() {
        return <Results {...this.props} />
    }
}

const ViewBooksInCategory = ({books}) => {

    ViewBooksInCategory.propTypes = {
        books: PropTypes.array
    };

    return (
        <div className="books category__books">
            {books}
        </div>
    );
};

const ViewBooksInHome = ({books, genreId}) => {

    ViewBooksInHome.propTypes = {
        books: PropTypes.array,
        genreId: PropTypes.number
    };

    let blocks = books.length ? [...books] : books;

    return (
        <div className="books home-page__books">
            {!blocks.length ? blocks : <Slider blocks={blocks}/>}

            {books.length > 3 && <CustomLink pathTo={`/books/categories/${genreId}`} className="switcher__see-more" text="more"/>}

        </div>
    );
};

const Results = ({books, openCategoryId, genreId, categoryName}) => {

    Results.propTypes = {
        books: PropTypes.array,
        openCategoryId: PropTypes.string,
        genreId: PropTypes.number,
        categoryName: PropTypes.string
    };

    let content,
        booksCont;

    booksCont = books && books.map((book, i) => {
        return (
            <Book {...book} key={i} subClass={openCategoryId ? 'category__book' : 'switcher__book'}/>
        );
    });

    content = openCategoryId
        ?
        <ViewBooksInCategory books={booksCont}/>
        :
        <ViewBooksInHome books={booksCont} genreId={genreId} categoryName={categoryName}/>;

    return (
        <div className="category__results-books">
            {content}
        </div>
    );
};