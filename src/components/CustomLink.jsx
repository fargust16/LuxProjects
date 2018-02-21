import React from 'react';
import history from '../history';

const CustomLink = ({pathTo, text, className, beforeClick = () => {}}) => {

    const handleRedirect = (path) => {
        beforeClick();
        if (path.indexOf('undefined') + 1) return;
        history.push(path);
    };

    return (
        <div onClick={() => handleRedirect(pathTo)} className={className}>
            {text}
        </div>
    );
};

export default CustomLink;