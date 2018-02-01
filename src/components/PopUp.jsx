import React from 'react';
import PropTypes from 'prop-types';

import './PopUp.scss';

export const PopUp = ({message, onSubmit}) => {
    PopUp.propTypes = {
        message: PropTypes.string
    };

    return <article className="PopUp">
        <section className="PopUp__content">
            <div className="PopUp__message">
                {message}
            </div>
            <button className="button PopUp__button" onClick={() => onSubmit()}>
                Ok
            </button>
        </section>
    </article>;
};