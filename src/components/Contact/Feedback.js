import React from 'react';

import './contact.css';

const Feedback = (props) => {
    let mainClass;

    if (props.type === "SUCCESS") {
        mainClass = "contact__feedback--success";
    } else {
        mainClass = "contact__feedback--failure";
    }

    return (
        <div className={mainClass}>
            <h3 className='contact__feedbackTitle'>{props.title}</h3>
            <div className='contact__feedbackMessage'>{props.message}</div>
        </div>
    );
};

export default Feedback;
