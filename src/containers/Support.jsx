import React, { Component } from 'react';

import './Support.scss';

export default class Support extends Component {

  render() {
    return (
      <main className="Support other-pages__block">
        <div className="main-header">
          <span className="main-header__text">Support</span>
        </div>
        <form action="" method="POST" className="Support__form">
          <section className="Support__form-content">
            <h2 className="Support__form-info">Please try to include as much detail as possible about the situation you encountered and the platform you use.</h2>
            <input type="text"
              name="email"
              className="field Support__form-subject"
              placeholder="subject"
              required />
            <textarea className="field Support__form-message"
              placeholder="your message"
              rows="5"
              required></textarea>
            <div className="Support__buttons">
              <button className="button btn-clear" type="reset">
                Cancel
              </button>
              <button className="button btn-submit" type="submit">
                Send email
              </button>
            </div>
          </section>
        </form>
      </main>
      );
  }
}
