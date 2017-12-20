import React, { Component } from 'react';
import './Search.scss';

export default class Search extends Component {

  render() {
    return (
      <div className="search home-page__search">
        <div className="search__box-shadow">
          <label htmlFor="search-field" className="search__field-ico">
            <input ref="search-field"
              type="text"
              className="search__field"
              name="search"
              placeholder="Find a solution" />
          </label>
          <label htmlFor="search-options" className="search__options-ico">
            <select ref="search-options" className="search__options">
              <option className="search__option" value="all">
                All
              </option>
              <option className="search__option" value="title">
                Title
              </option>
              <option className="search__option" value="author">
                Author
              </option>
              <option className="search__option" value="ISBN">
                ISBN
              </option>
            </select>
          </label>
          <div className="button search__button">
            Search
          </div>
        </div>
      </div>
      );
  }
}

