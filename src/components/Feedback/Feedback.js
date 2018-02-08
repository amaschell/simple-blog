import React from 'react';

import './feedback.css';

const Feedback = (props) => {
    let iconStyle;

    if (props.type === "SUCCESS") {
        iconStyle = "fa fa-check";
    } else {
        iconStyle = "fa fa-fa-exclamation-triangle";
    }

    return (
        <p className="feedback">
            <h3>{props.title}</h3>
            <i className={iconStyle}/>
            <span>{props.message}</span>
        </p>
    );
};

export default Feedback;
