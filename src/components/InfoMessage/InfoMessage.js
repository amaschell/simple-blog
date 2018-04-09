import React from 'react';

import './infoMessage.css';

const InfoMessage = ({ iconClass, text }) => (
    <p className='infoMessage'>
        <span className='infoMessage__icon'>
                <i className={iconClass}/>
        </span>

        <span className='infoMessage__text'>
            {text}
        </span>
    </p>
);

export default InfoMessage;