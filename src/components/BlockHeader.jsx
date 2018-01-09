import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './BlockHeader.scss';

const BlockHeader = ({isShowOption, optionName, handleChangeView, subClass}) => {

  let headerClass = classNames('BlockHeader Category__name', {
    'BlockHeader_open': isShowOption,
    'BlockHeader_close': !isShowOption
  }, subClass || '');

  return (
    <div className={ headerClass } onClick={ handleChangeView }>
      <span className="BlockHeader__text">{ optionName || 'Unnamed block' }</span>
    </div>
    );
};

BlockHeader.propTypes = {
  isShowOption: PropTypes.bool.isRequired
};

export default BlockHeader;
