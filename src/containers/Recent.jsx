import React, {Component} from 'react';
import moment from 'moment';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as bookActions from '../actions/BookActions';

import BlockHeader from '../components/BlockHeader.jsx';
import Book from '../components/Book.jsx';
import './Recent.scss';

class Recent extends Component {

    componentDidMount() {
        const {id} = this.props.user.username;
        this.props.bookActions.handleGetRecentBooks(id);
    }

    render() {
        const {recBooks} = this.props.books;

        return (
            <main className="recent other-pages__block">
                <div className="main-header">
                    <span className="main-header__text">Recently</span>
                </div>
                <article className="recent__content">
                    <RecentBooks books={recBooks}/>
                </article>
            </main>
        );
    }
}

export default connect(
    state => ({
        books: state.books,
        user: state.user
    }),
    dispatch => ({
        bookActions: bindActionCreators(bookActions, dispatch)
    })
)(Recent)

const RecentBooks = ({books}) => {
    if (books.length === 0) return null;

    let content = [];

    let booksSort = books.sort((a, b) => {
        return new Date(b.view_date) - new Date(a.view_date)
    });

    booksSort.forEach((elem, i) => {
        const {books, view_date} = elem;
        let blockName = view_date;
        content[i] = (
            <section key={i} className="recent__category">
                <BlockHeader optionName={moment(new Date(blockName)).format('DD.MM.YYYY')} isShowOption={true}
                             className="recent__category-date" handleChangeView={()=>{}}/>
                <div className="books recent__books">
                    {books.map((book, i) => {
                        return (
                            <Book {...book} key={i} subClass="recent__book" />
                        );
                    })}
                </div>
            </section>
        );
    });

    return content;
};