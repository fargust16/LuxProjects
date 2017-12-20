import React, { Component } from 'react';
import classNames from 'classnames';

import './AddBook.scss';

export default class AddBook extends Component {

  constructor(props) {
    super(props);

    this.state = {
      optionShow: window.innerWidth >= 768 ? true : false
    }

    this.resizeWindow = this.resizeWindow.bind(this);
  }

  handleShowExternalOptions() {
    const {optionShow} = this.state;

    this.setState({
      optionShow: !optionShow
    })
  }

  handleChooseBookSource() {
    console.log('enter');
    let file_api = (window.File && window.FileReader && window.FileList && window.Blob) ? true : false,
      inp = this.refs.book_source,
      lbl = this.refs.source_title,
      file_name;

    if (file_api && inp.files[0]) {
      file_name = inp.files[0].name;
    } else {
      file_name = inp.value.replace("C:\\fakepath\\", '');
    }

    if (!file_name.length) {
      lbl.innerText = 'File doesn`t choosed';
      return;
    } else {
      lbl.innerText = file_name;
    }
  }

  resizeWindow(e) {
    const {optionShow} = this.state;

    this.setState({
      optionShow: window.innerWidth >= 768 ? optionShow : false
    });
  }

  componentWillMount() {
    window.addEventListener('resize', this.resizeWindow, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeWindow, false);
  }

  render() {
    const {optionShow} = this.state;
    let headerClass = classNames('header', {
      'header_open': optionShow,
      'header_close': !optionShow
    }, this.props.className);

    let optionClass = classNames('option__content', {
      'add-book__external-options': optionShow,
      'add-book__external-options_hide': !optionShow
    }, this.props.className);

    return (
      <main className="add-book other-pages__block">
        <div className="main-header">
          <span className="main-header__text">Add a new book</span>
        </div>
        <form ref="book-data"
          action=""
          method="POST"
          className="options add-book__options">
          <section className="option">
            <div className="header header_open">
              <span className="header__text">main data</span>
            </div>
            <div className="option__content">
              <input type="text"
                name="title"
                placeholder="title"
                className="field option__field"
                required />
              <input type="text"
                name="author"
                placeholder="author"
                className="field option__field"
                required />
              <label htmlFor="book_source" className="field option__field add-book__source">
                <mark className="add-book__source-title" ref="source_title">
                  Файл не выбран
                </mark>
                <input type="file"
                  ref="book_source"
                  name="source"
                  className="add-book__source-field"
                  onChange={ () => this.handleChooseBookSource() } />
              </label>
              <textarea className="field add-book__description" placeholder="description" rows="4"></textarea>
              <label htmlFor="publish-date" className="add-book__date-header">
                Publishing
                <input type="date"
                  name="publish-date"
                  className="field add-book__date-field"
                  ref="publish-date" />
              </label>
            </div>
          </section>
          <section className="option add-book__option">
            <div onClick={ () => this.handleShowExternalOptions() } className={headerClass}>
              <span className="header__text">external options</span>
            </div>
            <div className={optionClass}>
              <input type="text"
                name="genre"
                placeholder="genre"
                className="field option__genre" />
              <input type="text"
                name="topics"
                placeholder="topics"
                className="field option__topics" />
              <input type="text"
                name="cover-image"
                placeholder="cover-image"
                className="field option__cover-image" />
            </div>
          </section>
          <div className="field captcha add-book__captcha">
            <input type="checkbox"
              ref="isRobot"
              name="isRobot"
              className="captcha__quest" />
            <label htmlFor="isRobot" className="captcha__text">
              I`m not a robot?
            </label>
          </div>
          <button type="submit" className="button add-book__upload-btn">
            Upload book
          </button>
        </form>
      </main>
      );
  }
}
