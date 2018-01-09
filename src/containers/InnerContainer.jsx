import React, { Component } from 'react';

import './InnerContainer.scss';

export default class InnerContainer extends Component {

  render() {
    return (
      <article className="other-pages">
        { this.props.children }
      </article>
      );
  }
}
