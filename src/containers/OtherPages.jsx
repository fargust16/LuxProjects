import React, { Component } from 'react';

import './OtherPages.scss';

export default class OtherPages extends Component {

  render() {
    return (
      <article className="other-pages">
        { this.props.children }
      </article>
      );
  }
}
