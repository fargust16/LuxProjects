import React, { Component } from 'react';
import classNames from 'classnames';

import BlockHeader from './BlockHeader.jsx';

import './Option.scss';

export default class Option extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showOption: window.innerWidth >= 768 ? true : false
    }

    this.resizeWindow = this.resizeWindow.bind(this);
  }

  handleShowExternalOptions() {
    const {showOption} = this.state;

    this.setState({
      showOption: !showOption
    });
  }

  resizeWindow() {
    const {showOption} = this.state;

    this.setState({
      showOption: window.innerWidth >= 768 ? showOption : false
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
    const {optionType, children} = this.props;

    return (
      <section className="option">
        <BlockHeader blockName={'Change ' + optionType} closeVar={ showOption } handleChangeVar={ () => this.handleShowExternalOptions() } />
        <form ref={ optionType }
          name={ optionType }
          action=""
          method="POST"
          className={ classNames('option__content', {
                        'settings__form': showOption,
                        'settings__form_hide': !showOption
                      }) }>
          { children }
          <div className="option__buttons">
            <button className="option__button button btn-clear" type="reset" onClick={ () => this.handleShowExternalOptions() }>
              Cancel
            </button>
            <button className="option__button button btn-submit" type="submit">
              Save changes
            </button>
          </div>
        </form>
      </section>
      );
  }
}