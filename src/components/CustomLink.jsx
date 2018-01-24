import React from 'react';
import history from '../history';

const CustomLink = ({pathTo, text, className}) => {

  const handleRedirect = (path) => {
    if(path.indexOf('undefined') + 1) return;
    history.push(path);
  }

  return (
    <div onClick={(path) => handleRedirect(pathTo)} className={className}>
      {text}
    </div>
  );
};

export default CustomLink;