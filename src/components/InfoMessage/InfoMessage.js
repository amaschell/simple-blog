import React from 'react';

import './infoMessage.css';

const InfoMessage = (props) => (
    <p className="infoMessage">
        <span className="infoMessage__icon">
                <i className={props.iconClass}/>
        </span>

        <span className="infoMessage__text">
            {props.text}
        </span>
    </p>
);

export default InfoMessage;