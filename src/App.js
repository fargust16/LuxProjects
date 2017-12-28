import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from './containers/Header.jsx';
import Search from './components/Search.jsx';
import Home from './containers/Home.jsx';

import OtherPages from './containers/OtherPages.jsx';
import AddBook from './containers/AddBook.jsx';
import Recent from './containers/Recent.jsx';
import Support from './containers/Support.jsx';
import Settings from './containers/Settings.jsx';

import BookDescription from './components/BookDescription.jsx';
import ReadBook from './components/ReadBook.jsx';

import { isLoggedIn } from './services/AuthService';

import './App.scss';

class FadeIn extends Component {

  componentDidMount() {
    window.setTimeout(() => {
      this._otherPage.className = "transition-item transition-item_show";
    }, 1000 / 60);
  }

  render() {
    return (
      <div ref={ (div) => {
             this._otherPage = div
           } } className="transition-item">
        { this.props.children }
      </div>
    )
  }
}

const MatchWithFade = ({component: Component, transition, ...rest}) => (
  <Route render={ (matchProps) => (
                  <FadeIn transition={ transition }>
                    <Component {...matchProps} />
                  </FadeIn>
                ) } {...rest} />
)

const PrivateMatchWithFade = ({component: Component, transition, ...rest}) => (
  <Route render={ matchProps => (
                isLoggedIn() ? (
                  <FadeIn transition={ transition }>
                    <Component {...matchProps} />
                  </FadeIn>
                  ) : (
                  <Redirect to={ { pathname: '/', state: { from: matchProps.location } } } />
                  )
                ) } {...rest} />
)

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <Search />
        <Switch>
          <MatchWithFade exact path="/" component={ Home } />
          <MatchWithFade path="/books/categories/:categoryId" component={ Home } />
          <OtherPages>
            <PrivateMatchWithFade path="/books/add-book" component={ AddBook } />
            <MatchWithFade path="/books/recent" component={ Recent } />
            <MatchWithFade path="/support" component={ Support } />
            <PrivateMatchWithFade path="/settings" component={ Settings } />
            <MatchWithFade path="/books/view/:bookId" component={ BookDescription } />
            <MatchWithFade path="/books/read/:bookId" component={ ReadBook } />
          </OtherPages>
        </Switch>
      </div>
      );
  }
}
