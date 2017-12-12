import React, { Component } from 'react';

import './BlockHeader.scss';

class BlockHeader extends Component {

  render() {
    return (
	    <div className="header_lines category__name"><span className="header__text">{this.props.blockName || 'Unnamed block'}</span></div>
    );
  }
}

export default BlockHeader;
