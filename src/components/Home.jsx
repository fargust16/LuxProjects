import React, { Component } from 'react';

import Search from './Search.jsx';
import Category from './Category.jsx';

import './Home.scss';

class Home extends Component {

	constructor(props) {
		super(props);

		this.state = {

		}
	}


  render() {
  	const { categoryName } = this.props.match.params;

    return (
    	<div className="home">
    	<Search />
	      <article className="home-page">
				  <main className="main home-page__main">
				    <Category categoryView={categoryName} />
				  </main>
				</article>
			</div>
    );
  }
}

export default Home;
