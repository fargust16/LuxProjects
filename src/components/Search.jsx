import React, { Component } from 'react';
import './Search.scss';

export default class Search extends Component {

  render() {
    return (
      <div className="Search home-page__search">
        <div className="Search__box-shadow">
          <label htmlFor="search-field" className="Search__field-ico">
            <input id="search-field"
              type="text"
              className="Search__field"
              name="search"
              placeholder="Find a solution" />
          </label>
          <label htmlFor="search-options" className="Search__options-ico">
            <select id="search-options" className="Search__options">
              <option className="Search__option" value="all">
                All
              </option>
              <option className="Search__option" value="title">
                Title
              </option>
              <option className="Search__option" value="author">
                Author
              </option>
              <option className="Search__option" value="ISBN">
                ISBN
              </option>
            </select>
          </label>
          <div className="button Search__button">
            Search
          </div>
        </div>
      </div>
      );
  }
}

