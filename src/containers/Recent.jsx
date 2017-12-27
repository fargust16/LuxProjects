import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { getRecentBooks } from '../services/getBook.jsx';

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
      <main className="recent other-pages__block">
        <div className="main-header">
          <span className="main-header__text">Recently</span>
        </div>
        <article className="recent__content">
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
      <section key={i} className="recent__category">
        <BlockHeader blockName={ moment(new Date(elem.viewDate)).format('DD.MM.YYYY') } closeVar={ true } className="recent__category-date" />
        <div className="books recent__books">
          { elem.books.map(book => {
              return (
                <div key={ book.Id } className="recent__book book">
                  <div className="recent__book-info book-info">
                    <Link to={"/books/view/" + book.Id} className="book__title recent__book-title">
                      { book.Title }
                    </Link>
                    <p className="recent__book-author">
                      { book.Author }
                    </p>
                    <p className="recent__book-description">
                      { book.Text }
                    </p>
                    <progress className="recent__book-progress" max="100" value="37"></progress>
                  </div>
                  <img src="/images/books-cover.png" className="recent__book-cover book-cover" alt="" />
                </div>
                );
            }) }
        </div>
      </section>
    );
  });

  return content;
}


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