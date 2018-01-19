import React, { Component } from 'react';
import classNames from 'classnames';

import BlockHeader from './BlockHeader.jsx';

import { ON_HIDE_WIDTH } from '../constants/UI.js';

import './Option.scss';

export default class Option extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showOption: window.innerWidth >= ON_HIDE_WIDTH ? true : false
    }

    this.resizeWindow = this.resizeWindow.bind(this);
  }

  handleShowExternalOptions(isOpen) {
    if (isOpen) return;
    const {showOption} = this.state;

    this.setState({
      showOption: !showOption
    });
  }

  resizeWindow() {
    const {showOption} = this.state;

    this.setState({
      showOption: window.innerWidth >= ON_HIDE_WIDTH ? showOption : false
    });
  }

  componentWillMount() {
    window && window.addEventListener('resize', this.resizeWindow, false);
  }

  componentWillUnmount() {
    window && window.removeEventListener('resize', this.resizeWindow, false);
  }

  render() {
    const {showOption} = this.state;
    const {children, optionName, subClass, closeVar, needButtons} = this.props;

    let alwaysOpen = closeVar || false;

    return (
      <section className="option">
        <BlockHeader optionName={ optionName } isShowOption={ showOption || alwaysOpen } handleChangeView={ (isOpen) => this.handleShowExternalOptions(alwaysOpen) } />
        <div className={ classNames(subClass || '', {
                           'option__content': showOption || alwaysOpen,
                           'option__content_hide': !showOption && !alwaysOpen
                         }) }>
          { children }
          { needButtons ?
            <div className="option__buttons">
              <button className="option__button button btn-clear" type="reset" onClick={ (isOpen) => this.handleShowExternalOptions(alwaysOpen) }>
                Cancel
              </button>
              <button className="option__button button btn-submit" type="submit">
                Save changes
              </button>
            </div>
            :
            '' }
        </div>
      </section>
      );
  }
}