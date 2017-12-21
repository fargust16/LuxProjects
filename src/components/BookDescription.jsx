import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Rating from './Rating.jsx';
import Comments from './Comments.jsx';

import './BookDescription.scss';

export default class BookDescription extends Component {

  render() {
    let id = 0;
    
    return (
      <article>
        <main className="book-description other-pages__block">
          <section className="book-description__info">
            <img className="book-description__book-cover" src="/images/books-cover.png" alt="book`s name" />
            <div className="book-description__main-info">
              <div className="book-description__title">
                The alchemist
              </div>
              <div className="book-description__author">
                Paulo Coelho
              </div>
              <section className="book-description__control-info">
                <div className="book-description__ISBN">
                  <span>ISBN:</span><span>978-5-65273-876-8</span>
                </div>
                <div className="book-description__pablish-date">
                  <span>Pablishing date:</span><span>05.03.2001</span>
                </div>
              </section>
              <div className="book-description__text" id="fill_text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt bibendum purus sed tristique. Pellentesque a lacinia augue. Mauris gravida urna eu neque
                interdum, et consectetur leo varius. Donec vitae posuere lorem, ac tincidunt ipsum. Maecenas auctor pretium ex, ac imperdiet dui pharetra in. Pellentesque
                justo est, cursus id pellentesque in, imperdiet eu velit. Ut rhoncus condimentum velit id tempus. Interdum et malesuada fames ac ante ipsum primis in faucibus.
                Aenean nisl turpis, dapibus aliquam tellus quis, blandit condimentum dolor. Maecenas dignissim euismod eros, et facilisis lorem pharetra et. Ut libero
                felis, tincidunt malesuada luctus id, aliquam in urna. Nunc nibh purus, tristique vitae nibh in, bibendum pharetra quam. Nam bibendum orci sed facilisis
                vestibulum. Integer ac facilisis quam. Aliquam et volutpat enim. Suspendisse turpis nisi, posuere ut auctor vel, aliquet ut erat. Sed convallis elementum
                faucibus. Nunc vel euismod sem. Maecenas egestas semper sapien, eu bibendum metus pharetra eget. In quis nisi orci. Vivamus non luctus nunc. Sed enim turpis,
                varius vel mattis quis, venenatis quis odio. Vivamus luctus a neque nec lacinia. Duis tempus sem tortor, vel rutrum augue tristique eget. Nulla eget enim
                ornare, ultricies risus vel, molestie turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt bibendum purus sed tristique. Pellentesque
                a lacinia augue. Mauris gravida urna eu neque interdum, et consectetur leo varius. Donec vitae posuere lorem, ac tincidunt ipsum. Maecenas auctor pretium
                ex, ac imperdiet dui pharetra in. Pellentesque justo est, cursus id pellentesque in, imperdiet eu velit. Ut rhoncus condimentum velit id tempus. Interdum
                et malesuada fames ac ante ipsum primis in faucibus. Aenean nisl turpis, dapibus aliquam tellus quis, blandit condimentum dolor. Maecenas dignissim euismod
                eros, et facilisis lorem pharetra et. Ut libero felis, tincidunt malesuada luctus id, aliquam in urna. Nunc nibh purus, tristique vitae nibh in, bibendum
                pharetra quam. Nam bibendum orci sed facilisis vestibulum. Integer ac facilisis quam. Aliquam et volutpat enim. Suspendisse turpis nisi, posuere ut auctor
                vel, aliquet ut erat. Sed convallis elementum faucibus. Nunc vel euismod sem. Maecenas egestas semper sapien, eu bibendum metus pharetra eget. In quis
                nisi orci. Vivamus non luctus nunc. Sed enim turpis, varius vel mattis quis, venenatis quis odio. Vivamus luctus a neque nec lacinia. Duis tempus sem tortor,
                vel rutrum augue tristique eget. Nulla eget enim ornare, ultricies risus vel, molestie turpis.
              </div>
              <span className="book-description__text-more">see more</span>
            </div>
          </section>
          <div className="book-description__reviews">
            <Rating />
            <span className="reviews book-description__reviews-count">125 reviews</span>
          </div>
          <div className="book-description__buttons">
            <Link to={ { pathname: '/books/read/' + id } } className="book-description__button button btn-read">
              start reading now
            </Link>
            <Link to="#download" className="book-description__button button btn-download">
              download
            </Link>
          </div>
        </main>
        <Comments />
      </article>
      );
  }
}