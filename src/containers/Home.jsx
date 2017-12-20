import React, { Component } from 'react';

//import Search from './Search.jsx';
import Category from '../components/Category.jsx';

import './Home.scss';

export default class Home extends Component {

  constructor() {
    super();
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    return fetch('/books')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          books: responseJson
        }, function() {
          console.log(this.state.books);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { categoryId } = this.props.match.params;
    const { books } = this.state;

    return (
      <div className="home">
        <article className="home-page">
          <main className="main home-page__main">
            <Category categoryId={ categoryId } books={ books } />
          </main>
        </article>
      </div>
      );
  }
}
