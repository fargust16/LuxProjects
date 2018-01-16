import React from 'react'

import './Loading.scss';

const Loading = ({subClass}) => {
  return (
    <div className="cssload-thecube">
      <div className="cssload-cube cssload-c1"></div>
      <div className="cssload-cube cssload-c2"></div>
      <div className="cssload-cube cssload-c4"></div>
      <div className="cssload-cube cssload-c3"></div>
    </div>
  )
}

export default Loading;