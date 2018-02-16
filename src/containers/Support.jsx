import React, {Component} from 'react';

import * as supportActions from "../actions/SupportActions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";


import {PopUp} from '../components/PopUp';
import './Support.scss';


class Support extends Component {

    handleMailToSupport(e) {
        e.preventDefault();
        const {subject, message} = this.props.support;
        const {mailToSupport} = this.props.supportActions;

        mailToSupport({subject, message});
    }

    render() {
        const {subject, message, successMes, popUpShow} = this.props.support;
        const {fetching} = this.props.load;
        const {changeSubjectText, changeMessageText, resetInputData} = this.props.supportActions;

        return (
            <main className="support other-pages__block">
                <div className="main-header">
                    <span className="main-header__text">Support</span>
                </div>
                <form method="POST" className="support__form" onSubmit={::this.handleMailToSupport}>
                    <section className="support__form-content">
                        <h2 className="support__form-info">Please try to include as much detail as possible about the
                            situation you encountered and the platform you use.</h2>
                        <input type="text"
                               name="subject"
                               className="field support__form-subject"
                               placeholder="subject"
                               value={subject}
                               onChange={(e) => changeSubjectText(e.target.value)}
                               required/>
                        <textarea className="field support__form-message"
                                  placeholder="your message"
                                  rows="5"
                                  value={message}
                                  onChange={(e) => changeMessageText(e.target.value)}
                                  required/>
                        <div className="support__buttons">
                            <button className="button btn-clear" type="reset" onClick={resetInputData}>
                                Cancel
                            </button>
                            <button className="button btn-submit" type="submit">
                                Send email
                            </button>
                        </div>
                    </section>
                </form>
                {popUpShow && !fetching && <PopUp message={successMes} onSubmit={resetInputData}/>}
            </main>
        );
    }
}

export default connect(
    state => ({
        support: state.support,
        load: state.load
    }),
    dispatch => ({
        supportActions: bindActionCreators(supportActions, dispatch)
    })
)(Support)
