import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { getRecentBooks } from '../services/api';

import BlockHeader from '../components/BlockHeader.jsx';
import './Recent.scss';

class Recent extends Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      books: []
    }
  }

  componentDidMount() {
    getRecentBooks().then(
      books => {
        this.setState({
          books: books
        });
      }
    );
  }

  render() {
    const {books} = this.state;

    return (
      <main className="Recent other-pages__block">
        <div className="main-header">
          <span className="main-header__text">Recently</span>
        </div>
        <article className="Recent__content">
          <RecentBooks books={ books } />
        </article>
      </main>
      );
  }
}

export default withCookies(Recent);

const RecentBooks = ({books}) => {
  if (books.length === 0) return null;

  let content = [];

  books.forEach((elem, i) => {
    content[i] = (
      <section key={i} className="Recent__category">
        <BlockHeader optionName={ moment(new Date(elem.viewDate)).format('DD.MM.YYYY') } isShowOption={ true } className="Recent__category-date" />
        <div className="books Recent__books">
          { elem.books.map(book => {
              return (
                <div key={ book.Id } className="Recent__book book">
                  <div className="Recent__book-info book-info">
                    <Link to={`/books/view/${book.Id}`} className="Book__title Recent__book-title">
                      { book.Title }
                    </Link>
                    <p className="Recent__book-author">
                      { book.Author }
                    </p>
                    <p className="Recent__book-description">
                      { book.Text }
                    </p>
                    <progress className="Recent__book-progress" max="100" value="37"></progress>
                  </div>
                  <img src="/images/books-cover.png" className="Recent__book-cover book-cover" alt="" />
                </div>
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