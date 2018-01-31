import React, {Component} from 'react';

import Option from '../components/Option.jsx';
import FileInput from '../components/FileInput.jsx';

import './AddBook.scss';

export default class AddBook extends Component {

    render() {

        return (
            <main className="add-book other-pages__block">
                <div className="main-header">
                    <span className="main-header__text">Add a new book</span>
                </div>
                <form action="" method="POST" className="options add-book__options">
                    <Option optionName="main data" subClass="add-book__external-options" closeVar={true}>
                        <input type="text"
                               name="title"
                               placeholder="title"
                               className="field option__field"
                               required/>
                        <input type="text"
                               name="author"
                               placeholder="author"
                               className="field option__field"
                               required/>
                        <FileInput subClass="option__field"/>
                        <textarea className="field add-book__description" placeholder="description" rows="4"/>
                        <label htmlFor="publish-date" className="add-book__date-header">
                            Publishing
                            <input type="date"
                                   name="publish-date"
                                   className="field add-book__date-field"
                                   id="publish-date"/>
                        </label>
                    </Option>
                    <Option optionName="external options" subClass="add-book__external-options">
                        <input type="text"
                               name="genre"
                               placeholder="genre"
                               className="field option__genre"/>
                        <input type="text"
                               name="topics"
                               placeholder="topics"
                               className="field option__topics"/>
                        <input type="text"
                               name="cover-image"
                               placeholder="cover-image"
                               className="field option__cover-image"/>
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
