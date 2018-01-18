import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import moment from 'moment';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as bookActions from '../actions/BookActions';

import BlockHeader from '../components/BlockHeader.jsx';
import Book from '../components/Book.jsx';
import './Recent.scss';

class Recent extends Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  componentDidMount() {
    this.props.bookActions.handleGetRecentBooks();
  }

  render() {
    const {recBooks} = this.props.books;

    return (
      <main className="recent other-pages__block">
        <div className="main-header">
          <span className="main-header__text">Recently</span>
        </div>
        <article className="recent__content">
          <RecentBooks books={ recBooks } />
        </article>
      </main>
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
)(withCookies(Recent))

const RecentBooks = ({books}) => {
  if (books.length === 0) return null;

  let content = [];

  books.forEach((elem, i) => {
    content[i] = (
      <section key={ i } className="recent__category">
        <BlockHeader optionName={ moment(new Date(elem.viewDate)).format('DD.MM.YYYY') } isShowOption={ true } className="recent__category-date" />
        <div className="books recent__books">
          { elem.books.map((book, i) => {
              return (
                <Book {...book} key={ i } subClass="recent__book" />
                );
            }) }
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