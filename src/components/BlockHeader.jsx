import React, { Component } from 'react';

import './BlockHeader.scss';

class BlockHeader extends Component {

  render() {
    const { blockName } = this.props;
    return (
      <div className="header_lines category__name"><span className="header__text">{ blockName || 'Unnamed block' }</span></div>
    );
  }
}

export default BlockHeader;
