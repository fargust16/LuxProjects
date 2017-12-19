import React, { Component } from 'react';
import logo from './logo.svg';

import Header from './containers/Header.jsx';
import Search from './components/Search.jsx';

import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Search />
        {this.props.children}
      </div>
      );
  }
}
