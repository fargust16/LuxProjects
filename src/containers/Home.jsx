import React, { Component } from 'react';

import { getAllBooks } from '../services/getBook.jsx';
import Category from '../components/Category.jsx';

import './Home.scss';

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      
    }
  }

  componentDidMount() {
    getAllBooks().then(
      books => this.setState({
        books: books
      })
    );
  }

  render() {
    const {categoryId} = this.props.match.params;
    const {books} = this.state;

    return (
      <article ref={(div) => {this._homeBlock = div}} className="home">
        <section className="home-page">
          <main className="main home-page__main">
            <Category categoryId={ categoryId } books={ books } />
          </main>
        </section>
      </article>
      );
  }
}