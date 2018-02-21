import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as searchActions from '../actions/SearchActions';
import CustomLink from '../components/CustomLink';
import BlockHeader from '../components/BlockHeader';
import ReactHtmlParser from 'react-html-parser';

import './SearchResults.scss';

class SearchResults extends Component {

    componentDidMount() {
        const {handleStartSearch} = this.props.searchActions;
        const {query} = this.props.match.params;

        handleStartSearch(query);
    }

    componentWillReceiveProps(nextProps) {
        const {handleStartSearch} = this.props.searchActions;
        const {query} = nextProps.match.params;
        const current = this.props.match.params.query;

        if (current !== query)
            handleStartSearch(query);
    }

    render() {
        const {searchResults} = this.props.search;

        let resHeader = searchResults && searchResults.length === 0 ? 'Nothing found on request' : `Results: ${searchResults.length}`;

        return (
            <main className="search-results other-pages__block">
                <div className="main-header">
                    <BlockHeader optionName={resHeader} isShowOption={true} handleChangeView={()=>{}}/>
                </div>
                <section className="search-results__content">
                    {searchResults.map(resultRow => {
                        return <div key={resultRow.id} className="search-results__row">
                            <img src={`${resultRow.cover}`} className="book__cover" alt={resultRow.title}/>
                            <div className="book__info">
                                <CustomLink className="search-results__row-header book__title"
                                            pathTo={`/books/view/${resultRow.id}`} text={ReactHtmlParser(resultRow.title)}/>
                                <div className="book__author">
                                    {ReactHtmlParser(resultRow.author)}
                                </div>
                                <div className="book__isbn">
                                    {ReactHtmlParser(resultRow.isbn)}
                                </div>
                                <div className="search-results__entrance book__desc">
                                    ...{ReactHtmlParser(resultRow.text)}
                                </div>
                            </div>

                        </div>
                    })}
                </section>
            </main>
        );
    }
}

export default connect(
    state => ({
        search: state.search
    }),
    dispatch => ({
        searchActions: bindActionCreators(searchActions, dispatch)
    })
)(SearchResults)