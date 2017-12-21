import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './BlockHeader.scss';

const BlockHeader = ({closeVar, blockName, handleChangeVar, className}) => {

  let headerClass = classNames('header category__name', {
    'header_open': closeVar,
    'header_close': !closeVar
  }, className || '');

  return (
    <div className={ headerClass } onClick={ handleChangeVar }>
      <span className="header__text">{ blockName || 'Unnamed block' }</span>
    </div>
    );
};

BlockHeader.propTypes = {
  closeVar: PropTypes.bool.isRequired
};

export default BlockHeader;
