import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Footer.scss';

export default class Footer extends Component {

  render() {
    return (
      <footer className="footer">
        <div className="footer__rss rss">
          <ul className="footer__links"> We on social net
            <li>
              <a className="footer__link footer__link_tumblr" href="https://tumblr.com" rel="noopener noreferrer" target="_blank">
                tumblr
              </a>
            </li>
            <li>
              <a className="footer__link footer__link_vk" href="https://vk.com" rel="noopener noreferrer" target="_blank">
                vk
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__info">
          <span>All books on our website are provided by review and are protected by copyright</span>
          <span>© 2018. <Link to="/"> Online-library </Link></span>
        </div>
        <div className="footer__contacts">
          <ul> Contacts us
            <li>
              <Link to="/support">
                support
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    )
  }
}