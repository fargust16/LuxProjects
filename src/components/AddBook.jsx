import React, { Component } from 'react';

import './AddBook.scss';
import './Option.scss';

class AddBook extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showExOptions: window.innerWidth >= 768 ? true : false
    }

    this.showExternalOptions = this.showExternalOptions.bind(this);
    this.chooseBookSource = this.chooseBookSource.bind(this);
    this.resizeWindow = this.resizeWindow.bind(this);
  }

  showExternalOptions() {
    this.setState({showExOptions: !this.state.showExOptions})
  }

  chooseBookSource() {
    console.log('enter');
    var file_api = ( window.File && window.FileReader && window.FileList && window.Blob ) ? true : false;
    var inp = this.refs.book_source;
    var lbl = this.refs.source_title;
    var file_name;

    if( file_api && inp.files[0] ) {
        file_name = inp.files[0].name;
    }
    else {
        file_name = inp.value.replace("C:\\fakepath\\", '');
    }

    if( !file_name.length ) {
      lbl.innerText = 'Файл не выбран';
        return;
    }
    else {
      lbl.innerText = file_name;
    }
  }

  resizeWindow() {
    this.setState({showExOptions: window.innerWidth >= 768 ? true : false});
  }

  componentWillMount() {
    window && window.addEventListener('resize', this.resizeWindow, false);
  }

  componentWillUnmount () {
    window && window.removeEventListener('resize', this.resizeWindow, false);
  }

  render() {
    const { showExOptions } = this.state;
    const { showExternalOptions, chooseBookSource } = this;

    return (
      <article className="other-pages">
        <main className="add-book other-pages__block">
          <div className="main-header"><span className="main-header__text">Add a new book</span></div>
          <form id="book-data" action="" method="POST" className="options add-book__options">
            <section className="option">
              <div className="header_lines option__header open-header"><span className="header__text">main data</span></div>
              <div className="option__content">
                <input type="text" name="title" placeholder="title" className="field option__field" required />
                <input type="text" name="author" placeholder="author" className="field option__field" required />
                <label htmlFor="book_source" className="field option__field add-book__source">
                  <mark className="add-book__source-title" ref="source_title">Файл не выбран</mark>
                  <input type="file" ref="book_source" id="book_source" name="source" className="add-book__source-field" onChange={chooseBookSource} />
                </label>
                <textarea className="field add-book__description" placeholder="description" rows="4"></textarea>
                <label htmlFor="publish-date" className="add-book__date-header">Publishing <input type="date" name="publish-date" className="field add-book__date-field" id="publish-date" /></label>
              </div>
            </section>
            <section className="option add-book__option">
              <div onClick={showExternalOptions} className={showExOptions ? "option__header header open-header" : "option__header header close-header"}><span className="header__text">external options</span></div>
              <div className={showExOptions ? "option__content add-book__external-options" : "option__content add-book__external-options_hide"}>
                <input type="text" name="genre" placeholder="genre" className="field option__genre" />
                <input type="text" name="topics" placeholder="topics" className="field option__topics" />
                <input type="text" name="cover-image" placeholder="cover-image" className="field option__cover-image" />
              </div>
            </section>
            <div className="field captcha add-book__captcha">
              <input type="checkbox" id="isRobot" name="isRobot" className="captcha__quest" />
              <label htmlFor="isRobot" className="captcha__text">I`m not a robot?</label>
            </div>
            <button type="submit" className="button add-book__upload-btn">Upload book</button>
          </form>
        </main>
      </article>
    );
  }
}

export default AddBook;
