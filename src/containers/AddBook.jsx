import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as addBookActions from '../actions/AddBookActions';

import Option from '../components/Option.jsx';
import FileInput from '../components/FileInput.jsx';

import './AddBook.scss';

class AddBook extends Component {

    handleAddBook(e) {
        e.preventDefault();
        const {handleAddNewBook} = this.props.addBookActions;
        const {title, author, genre, isbn, release_date, description, text_file, cover} = this.props.addBook;
        const {id} = this.props.user.username;

        let newBook = {
            title, author, genre, text_file,
            isbn: isbn || null,
            release_date: release_date || null,
            description: description || null,
            cover: cover || null,
            topics: null, //check to send object!!!!!!!!!!!!!!!!!!!!!!!!!
            user_id: id
        };

        handleAddNewBook(newBook);
    }

    componentDidMount() {
        const {getListOfGenres} = this.props.addBookActions;
        getListOfGenres();
    }

    render() {
        const {title, author, genre, isbn, release_date, description, cover, topics, allGenres} = this.props.addBookProps;
        const {
            changeTitle, changeAuthor, changeGenre, changeCover, changeTopics,
            changeDescription, changeText, changeIsbn, changeReleaseDate
        } = this.props.addBookActions;


        return (
            <main className="add-book other-pages__block">
                <div className="main-header">
                    <span className="main-header__text">Add a new book</span>
                </div>
                <form method="POST" className="options add-book__options" onSubmit={(e) => this.handleAddBook(e)}>
                    <Option optionName="main data" subClass="add-book__external-options" closeVar={true}
                            onCancel={() => {
                            }}>
                        <input type="text"
                               name="title"
                               placeholder="title"
                               className="field option__field"
                               value={title}
                               onChange={(e) => changeTitle(e.target.value)}
                               required/>
                        <input type="text"
                               name="author"
                               placeholder="author"
                               className="field option__field"
                               value={author}
                               onChange={(e) => changeAuthor(e.target.value)}
                               required/>
                        <GenresDropBox value={genre}
                                       onChange={(e) => changeGenre(e.target.value)}
                                       className="field option__field"
                                       genres={allGenres}/>
                        <FileInput subClass="option__field"
                                   onFileLoad={changeText}/>
                        <textarea className="field add-book__description"
                                  value={description}
                                  onChange={(e) => changeDescription(e.target.value)}
                                  placeholder="description"
                                  rows="4"/>
                        <label htmlFor="publish-date" className="add-book__date-header">
                            <span className="add-book__date-header-text">Release date</span>
                            <input type="date"
                                   name="publish-date"
                                   className="field add-book__date-field"
                                   id="publish-date"
                                   value={release_date}
                                   onChange={(e) => changeReleaseDate(e.target.value)}/>
                        </label>
                    </Option>
                    <Option optionName="external options" subClass="add-book__external-options"
                            onCancel={() => {
                            }}>
                        <input type="text"
                               name="topics"
                               placeholder="topics"
                               className="field option__topics"
                               value={topics}
                               onChange={(e) => changeTopics(e.target.value)}/>
                        <input type="text"
                               name="cover-image"
                               placeholder="cover image (URL)"
                               className="field option__cover-image"
                               value={cover}
                               onChange={(e) => changeCover(e.target.value)}/>
                        <input type="text"
                               name="isbn"
                               placeholder="ISBN"
                               className="field option__isbn"
                               value={isbn}
                               onChange={(e) => changeIsbn(e.target.value)}/>
                    </Option>
                    <div className="field captcha add-book__captcha">
                        <input type="checkbox"
                               id="isRobot"
                               name="isRobot"
                               className="captcha__quest"/>
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

export default connect(
    state => ({
        addBookProps: state.addBook,
        user: state.user
    }),
    dispatch => ({
        addBookActions: bindActionCreators(addBookActions, dispatch)
    })
)(AddBook)

const GenresDropBox = ({genres, value, onChange, className}) => {
    return <select className={className} value={value} name="genres" onChange={(e) => onChange(e)} required>
        <option value='' disabled={true}>Choose the genre</option>
        {genres && genres.map(genre => <option value={genre.id} key={genre.id}>{genre.genre}</option>)}
    </select>
};

