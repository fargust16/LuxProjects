import React, { Component } from 'react';

import './FileInput.scss';

export default class FileInput extends Component {

  handleFileInput() {
    let fileApi = (window.File && window.FileReader && window.FileList && window.Blob) ? true : false,
      fileName;

    if (fileApi && this._sourceField.files[0]) {
      fileName = this._sourceField.files[0].name;
    } else {
      fileName = this._sourceField.value.replace("C:\\fakepath\\", '');
    }

    if (!fileName.length) {
      this._sourceTitle.innerText = 'File doesn`t choosed';
      return;
    } else {
      this._sourceTitle.innerText = fileName;
    }
  }

  render() {
    const {subClass} = this.props;
    return (
      <label htmlFor="source" className={ "field source " + subClass }>
        <mark ref={ (mark) => {
                      this._sourceTitle = mark
                    } } className="source__title">
          Файл не выбран
        </mark>
        <input type="file"
          id="source"
          ref={ (input) => {
                  this._sourceField = input
                } }
          name="source"
          className="source__field"
          onChange={ () => this.handleFileInput() } />
      </label>
      );
  }
}