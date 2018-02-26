import React from 'react';

import './infoMessage.css';

const InfoMessage = (props) => (
    <div className="infoMessage">
        <span className="infoMessage__icon">
                <i className={props.iconClass}/>
        </span>

        <span className="infoMessage__title">
            {props.title}
        </span>

        <p className="infoMessage__text">
            {props.text}
        </p>
    </div>
);

export default InfoMessage;