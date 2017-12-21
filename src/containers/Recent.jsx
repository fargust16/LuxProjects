import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import BlockHeader from '../components/BlockHeader.jsx';
import './Recent.scss';

export default class Recent extends Component {

  render() {
    return (
      <main className="recent other-pages__block">
        <div className="main-header">
          <span className="main-header__text">Recently</span>
        </div>
        <article className="recent__content">
          <section className="recent__category">
            <BlockHeader blockName="01.12.2017" closeVar={ true } className="recent__category-date" />
            <div className="books recent__books">
              <div className="recent__book book">
                <div className="recent__book-info book-info">
                  <Link to="/books/view/4" className="book__title recent__book-title">
                    The Alchemist
                  </Link>
                  <p className="recent__book-author">
                    Paulo Coelho
                  </p>
                  <p className="recent__book-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt bibendum purus sed tristique. Pellentesque a lacinia augue. Mauris gravida urna eu neque
                    interdum, et consectetur leo varius. Donec vitae posuere lorem, ac tincidunt ipsum. Maecenas auctor pretium ex, ac imperdiet dui pharetra in. Pellentesque
                    justo est, cursus id pellentesque in, imperdiet eu velit. Ut rhoncus condimentum velit id tempus. Interdum et malesuada fames ac ante ipsum primis
                    in faucibus. Aenean nisl turpis, dapibus aliquam tellus quis, blandit condimentum dolor. Maecenas dignissim euismod eros, et facilisis lorem pharetra
                    et. Ut libero felis, tincidunt malesuada luctus id, aliquam in urna.
                  </p>
                  <progress className="recent__book-progress" max="100" value="37"></progress>
                </div>
                <img src="/images/books-cover.png" className="recent__book-cover book-cover" alt="" />
              </div>
            </div>
          </section>
          <section className="recent__category">
            <BlockHeader blockName="12.11.2017" closeVar={ true } className="recent__category-date" />
            <div className="books recent__books">
              <div className="recent__book book">
                <div className="recent__book-info book-info">
                  <Link to="/books/view/1" className="book__title recent__book-title">
                    The Alchemist
                  </Link>
                  <p className="recent__book-author">
                    Paulo Coelho
                  </p>
                  <p className="recent__book-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt bibendum purus sed tristique. Pellentesque a lacinia augue. Mauris gravida urna eu neque
                    interdum, et consectetur leo varius. Donec vitae posuere lorem, ac tincidunt ipsum. Maecenas auctor pretium ex, ac imperdiet dui pharetra in. Pellentesque
                    justo est, cursus id pellentesque in, imperdiet eu velit. Ut rhoncus condimentum velit id tempus. Interdum et malesuada fames ac ante ipsum primis
                    in faucibus. Aenean nisl turpis, dapibus aliquam tellus quis, blandit condimentum dolor. Maecenas dignissim euismod eros, et facilisis lorem pharetra
                    et. Ut libero felis, tincidunt malesuada luctus id, aliquam in urna.
                  </p>
                  <progress className="recent__book-progress" max="100" value="37"></progress>
                </div>
                <img src="/images/books-cover.png" className="recent__book-cover book-cover" alt="" />
              </div>
              <div className="recent__book book">
                <div className="recent__book-info book-info">
                  <Link to="/books/view/2" className="book__title recent__book-title">
                    The Alchemist
                  </Link>
                  <p className="recent__book-author">
                    Paulo Coelho
                  </p>
                  <p className="recent__book-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt bibendum purus sed tristique. Pellentesque a lacinia augue. Mauris gravida urna eu neque
                    interdum, et consectetur leo varius. Donec vitae posuere lorem, ac tincidunt ipsum. Maecenas auctor pretium ex, ac imperdiet dui pharetra in. Pellentesque
                    justo est, cursus id pellentesque in, imperdiet eu velit. Ut rhoncus condimentum velit id tempus. Interdum et malesuada fames ac ante ipsum primis
                    in faucibus. Aenean nisl turpis, dapibus aliquam tellus quis, blandit condimentum dolor. Maecenas dignissim euismod eros, et facilisis lorem pharetra
                    et. Ut libero felis, tincidunt malesuada luctus id, aliquam in urna.
                  </p>
                  <progress className="recent__book-progress" max="100" value="37"></progress>
                </div>
                <img src="/images/books-cover.png" className="recent__book-cover book-cover" alt="" />
              </div>
              <div className="recent__book book">
                <div className="recent__book-info book-info">
                  <Link to="/books/view/3" className="book__title recent__book-title">
                    The Alchemist
                  </Link>
                  <p className="recent__book-author">
                    Paulo Coelho
                  </p>
                  <p className="recent__book-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt bibendum purus sed tristique. Pellentesque a lacinia augue. Mauris gravida urna eu neque
                    interdum, et consectetur leo varius. Donec vitae posuere lorem, ac tincidunt ipsum. Maecenas auctor pretium ex, ac imperdiet dui pharetra in. Pellentesque
                    justo est, cursus id pellentesque in, imperdiet eu velit. Ut rhoncus condimentum velit id tempus. Interdum et malesuada fames ac ante ipsum primis
                    in faucibus. Aenean nisl turpis, dapibus aliquam tellus quis, blandit condimentum dolor. Maecenas dignissim euismod eros, et facilisis lorem pharetra
                    et. Ut libero felis, tincidunt malesuada luctus id, aliquam in urna.
                  </p>
                  <progress className="recent__book-progress" max="100" value="37"></progress>
                </div>
                <img src="/images/books-cover.png" className="recent__book-cover book-cover" alt="" />
              </div>
            </div>
          </section>
        </article>
      </main>
      );
  }
}
