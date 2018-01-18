import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
    
    return (
      <article className="home">
        <section className="home-page">
          <main className="main home-page__main">
            <Category categoryId={ categoryId } books={ allBooks } />
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