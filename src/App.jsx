import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from './containers/Header.jsx';
import Search from './components/Search.jsx';
import Home from './containers/Home.jsx';
import Footer from './components/Footer.jsx';

import InnerContainer from './containers/InnerContainer.jsx';
import AddBook from './containers/AddBook.jsx';
import Recent from './containers/Recent.jsx';
import Support from './containers/Support.jsx';
import Settings from './containers/Settings.jsx';

import BookDescription from './containers/BookDescription.jsx';
import ReadBook from './containers/ReadBook.jsx';

import FadeIn from './components/FadeIn.jsx';

import { isLoggedIn } from './services/AuthService';

import './App.scss';


const MatchWithFade = ({component: Component, transition, ...rest}) => (
  <Route render={ (matchProps) => (
                  <FadeIn transition={ transition }>
                    <Component {...matchProps} />
                  </FadeIn>
                ) } {...rest} />
);

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
);

const App = () => (
  <div className="app">
    <Header />
    <Search />
    <Switch>
      <MatchWithFade exact path="/" component={ Home } />
      <MatchWithFade path="/books/categories/:categoryId" component={ Home } />
      <InnerContainer>
        <PrivateMatchWithFade path="/books/add-book" component={ AddBook } />
        <PrivateMatchWithFade path="/books/recent" component={ Recent } />
        <MatchWithFade path="/support" component={ Support } />
        <PrivateMatchWithFade path="/settings" component={ Settings } />
        <MatchWithFade path="/books/view/:bookId" component={ BookDescription } />
        <MatchWithFade path="/books/read/:bookId" component={ ReadBook } />
      </InnerContainer>
    </Switch>
    <Footer />
  </div>
);

export default App