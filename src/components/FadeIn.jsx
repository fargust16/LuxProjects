import React, { Component } from 'react';
import classNames from 'classnames';

import './FadeIn.scss';

export default class FadeIn extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    }
  }

  componentDidMount() {
    window.setTimeout(() => {
      this.setState({
        isLoading: true
      })
    }, 1000 / 60);
  }

  render() {
    const {isLoading} = this.state;
    return (
      <div className={ classNames('transition-item', {
                   'transition-item_show': isLoading
                 }) }>
        { this.props.children }
      </div>
    )
  }
}