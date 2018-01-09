import React, { Component } from 'react';

import Option from '../components/Option.jsx';
import FileInput from '../components/FileInput.jsx';

import './AddBook.scss';

export default class AddBook extends Component {

  render() {

    return (
      <main className="AddBook other-pages__block">
        <div className="main-header">
          <span className="main-header__text">Add a new book</span>
        </div>
        <form action="" method="POST" className="options AddBook__options">
          <Option optionName="main data" subClass="AddBook__external-options" closeVar={ true }>
            <input type="text"
              name="title"
              placeholder="title"
              className="field Option__field"
              required />
            <input type="text"
              name="author"
              placeholder="author"
              className="field Option__field"
              required />
            <FileInput subClass="Option__field" />
            <textarea className="field AddBook__description" placeholder="description" rows="4"></textarea>
            <label htmlFor="publish-date" className="AddBook__date-header">
              Publishing
              <input type="date"
                name="publish-date"
                className="field AddBook__date-field"
                id="publish-date" />
            </label>
          </Option>
          <Option optionName="external options" subClass="AddBook__external-options">
              <input type="text"
                name="genre"
                placeholder="genre"
                className="field Option__genre" />
              <input type="text"
                name="topics"
                placeholder="topics"
                className="field Option__topics" />
              <input type="text"
                name="cover-image"
                placeholder="cover-image"
                className="field Option__cover-image" />
          </Option>
          <div className="field captcha AddBook__captcha">
            <input type="checkbox"
              id="isRobot"
              name="isRobot"
              className="captcha__quest" />
            <label htmlFor="isRobot" className="captcha__text">
              I`m not a robot?
            </label>
          </div>
          <button type="submit" className="button AddBook__upload-btn">
            Upload book
          </button>
        </form>
      </main>
      );
  }
}
