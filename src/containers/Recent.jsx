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

    books.forEach((elem, i) => {
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


/*  formatRecent(books) {
    if (books.length === 0) return books;

    let distinctCallback = (acc, cur) => acc.includes(cur) ? acc : [...acc, cur];

    let booksId = books.map(el => el.viewDate).reduce(distinctCallback, []).map(viewDateT => {
      let id = books.filter(el => el.viewDate === viewDateT).map(el => el.bookId).reduce(distinctCallback, []);
      return {
        viewDate: viewDateT,
        booksId: id
      }
    });

    return booksId;
  }

  componentWillMount() {
    const {cookies} = this.props;

    let booksView = cookies.get('recentBooks') || []

    this.setState({
      booksView: this.formatRecent(booksView)
    })
  }*/