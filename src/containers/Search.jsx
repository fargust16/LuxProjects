import React, {Component} from 'react';
import './Search.scss';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import CustomLink from '../components/CustomLink.jsx';
import * as searchActions from '../actions/SearchActions';

class Search extends Component {

    handleChangeSearchInput(e, value) {
        const {changeSearchInput} = this.props.searchActions;
        let re = /[!@#№$%^&*=()_/|]+/g;
        let searchStr = value.replace(re, '');
        changeSearchInput(searchStr);
    }

    render() {
        const {searchInput, searchType} = this.props.search;
        const {changeSearchType} = this.props.searchActions;

        return (
            <div className="search home-page__search">
                <div className="search__box-shadow">
                    <label htmlFor="search-field" className="search__field-ico">
                        <input id="search-field"
                               type="text"
                               className="search__field"
                               name="search"
                               placeholder="Find a solution"
                               value={searchInput}
                               onChange={(e) => this.handleChangeSearchInput(e, e.target.value)}/>
                    </label>
                    <label htmlFor="search-options" className="search__options-ico">
                        <select id="search-options" className="search__options" defaultValue={searchType}
                                onChange={(e) => changeSearchType(e.target.value)}>
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
                    <CustomLink
                        className="button search__button"
                        pathTo={`/search-results/str=${searchInput}&type=${searchType}`}
                        text="Search"/>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        search: state.search,
    }),
    dispatch => ({
        searchActions: bindActionCreators(searchActions, dispatch)
    })
)(Search)

