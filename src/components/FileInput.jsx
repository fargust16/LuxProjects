import React, { Component } from 'react';

export default class FileInput extends Component {

  handleFileInput() {
    let file_api = (window.File && window.FileReader && window.FileList && window.Blob) ? true : false,
      file_name;

    if (file_api && this._sourceField.files[0]) {
      file_name = this._sourceField.files[0].name;
    } else {
      file_name = this._sourceField.value.replace("C:\\fakepath\\", '');
    }

    if (!file_name.length) {
      this._sourceTitle.innerText = 'File doesn`t choosed';
      return;
    } else {
      this._sourceTitle.innerText = file_name;
    }
  }

  render() {
    return (
      <label htmlFor="book_source" className="field option__field add-book__source">
        <mark ref={ (mark) => {
                      this._sourceTitle = mark
                    } } className="add-book__source-title">
          Файл не выбран
        </mark>
        <input type="file"
          id="book_source"
          ref={ (input) => {
                  this._sourceField = input
                } }
          name="source"
          className="add-book__source-field"
          onChange={ () => this.handleFileInput() } />
      </label>
      );
  }
}