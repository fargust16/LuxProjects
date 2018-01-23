import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './ControlButtons.scss';

const ControlButtons = ({transformFunc, btnDirect, currentSwitchPos, endSwitchPos, btnSubClass}) => {

  ControlButtons.propTypes = {
    btnDirect: PropTypes.number,
    currentSwitchPos: PropTypes.number,
    endSwitchPos: PropTypes.number,
    btnSubClass: PropTypes.string
  }

  let btnView;

  if ((currentSwitchPos === endSwitchPos && btnDirect === -1) || (currentSwitchPos === 0 && btnDirect === 1)) {
    btnView = false;
  } else {
    btnView = true;
  }

  let btnClass = classNames(btnSubClass, {
    [`${btnSubClass}_hide`]: !btnView
  }, {
    'btn-prev': btnDirect === 1,
    'btn-next': btnDirect === -1
  });

  return (
    <div className={ btnClass } onClick={ transformFunc }></div>
    );
};

export default ControlButtons;