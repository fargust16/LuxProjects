import React, { Component } from 'react';
import { getBookText } from '../services/api';

import './ReadBook.scss';

export default class ReadBook extends Component {

  constructor(props) {
    super(props);

    this.state = {
      book: {}
    }
  }

  componentDidMount() {
    const {bookId} = this.props.match.params
    getBookText(parseInt(bookId, 10)).then(
      book => {
        this.setState({
          book
        })
      }
    );
  }

  render() {
    const {book} = this.state;

    return (
      <main className="read-book other-pages__block">
        <section className="main-header">
          <span className="main-header__text book__title">{ book.Title }</span>
          <br />
          <span className="main-header__text book__author">{ book.Author }</span>
        </section>
        <section className="read-book__content">
          <p>
            { book.Text }
          </p>
        </section>
      </main>
      );
  }
}
