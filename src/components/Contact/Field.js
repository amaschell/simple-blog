import React from 'react';

import './contact.css';

const Field = (props) => {
    let inputElement;

    if (props.type === 'BIG') {
        inputElement = <textarea value={props.value} rows="6"
                                 className={(props.isValid ?
                                             "contact__formInput--big" : "contact__formInput--bigAndNotValid")}
                                 onChange={(e) => props.valueChanged(e.target.value)} />;
    } else {
        inputElement = <input type="text" value={props.value}
                              className={(props.isValid ?
                                          "contact__formInput--small" : "contact__formInput--smallAndNotValid")}
                              onChange={(e) => props.valueChanged(e.target.value)} />;
    }

    const errorMessage = props.isValid ?
                         null :
                         <small className="contact__formFieldError">
                            <i className="fa fa-exclamation-triangle"/> {props.errorText}
                         </small>;


    return (
        <div className="contact__formField">
            <label className={(props.isValid ? "contact__formLabel" : "contact__formLabel--notValid")}>
                {props.name}
            </label>

            {inputElement}

            {errorMessage}
        </div>
    );

};

export default Field;