import React from 'react';

import './contact.css';

const Field = (props) => {
    const inputElement = props.type === 'BIG' ?
                         <textarea value={props.value}
                                onChange={(e) => props.valueChanged(e.target.value)} />:
                         <input type="text" value={props.value}
                               onChange={(e) => props.valueChanged(e.target.value)} />;

    const errorMessage = props.isValid ? null : <small>{props.errorText}</small>;

    return (
        <div>
            <label>{props.name}</label>
            {inputElement}
            {errorMessage}
        </div>
    );

};

export default Field;