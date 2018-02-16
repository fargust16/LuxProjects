import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as bookActions from '../actions/BookActions';

import Category from '../components/Category.jsx';

import './Home.scss';

class Home extends Component {

    componentDidMount() {
        this.props.bookActions.handleGetAllBooks();
    }

    render() {
        const {categoryId} = this.props.match.params;
        const {allBooks} = this.props.books;

        let booksOnPage = categoryId
            ? allBooks && allBooks.filter(category => category.genre_id === parseInt(categoryId, 10))
            : allBooks && allBooks;

        return (
            <article className="home">
                <section className="home-page">
                    <main className="main home-page__main">
                        {booksOnPage.map(category => <Category key={category.genre_id} categoryName={category.genre}
                                                               genreId={category.genre_id} books={category.books}
                                                               openCategoryId={categoryId}/>)}
                    </main>
                </section>
            </article>
        );
    }
}

export default connect(
    state => ({
        books: state.books
    }),
    dispatch => ({
        bookActions: bindActionCreators(bookActions, dispatch)
    })
)(Home)