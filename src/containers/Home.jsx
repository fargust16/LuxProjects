import React, { Component } from 'react';

//import Search from './Search.jsx';
import Category from '../components/Category.jsx';

import './Home.scss';

export default class Home extends Component {

  render() {
    const {categoryName} = this.props.match.params;

    return (
      <div className="home">
        <article className="home-page">
          <main className="main home-page__main">
            <Category categoryView={ categoryName } />
          </main>
        </article>
      </div>
      );
  }
}
