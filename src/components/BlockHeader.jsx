import React, { Component } from 'react';

import './BlockHeader.scss';

export default class BlockHeader extends Component {

  render() {
    const {blockName} = this.props;
    return (
      <div className="header header_open category__name">
        <span className="header__text">{ blockName || 'Unnamed block' }</span>
      </div>
      );
  }
}
