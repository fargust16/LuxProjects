import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';  

import './BlockHeader.scss';

const BlockHeader = ({isShowOption, optionName, handleChangeView, subClass}) => {

  BlockHeader.propTypes = {
    isShowOption: PropTypes.bool.isRequired,
    handleChangeView: PropTypes.func.isRequired,
    optionName: PropTypes.string,
    subClass: PropTypes.string
  };

  let headerClass = classNames('block-header category__name', {
    'block-header_open': isShowOption,
    'block-header_close': !isShowOption
  }, subClass || '');

  return (
    <div className={ headerClass } onClick={ handleChangeView }>
      <span className="block-header__text">{ optionName || 'Unnamed block' }</span>
    </div>
    );
};

export default BlockHeader;

