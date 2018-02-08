import React from 'react';

import './contact.css';

const Field = (props) => {
    const labelStyle = props.isValid ? "contact__formLabel" : "contact__formLabel--notValid";

    let inputElement;

    if (props.type === 'BIG') {
        const inputStyle = props.isValid ? "contact__formInput--big" : "contact__formInput--bigAndNotValid";
        inputElement = <textarea value={props.value} className={inputStyle} rows="6"
                                 onChange={(e) => props.valueChanged(e.target.value)} />;
    } else {
        const inputStyle = props.isValid ? "contact__formInput--small" : "contact__formInput--smallAndNotValid";
        inputElement = <input type="text" value={props.value} className={inputStyle}
                               onChange={(e) => props.valueChanged(e.target.value)} />;
    }

    const errorMessage = props.isValid ?
          null :
          <small className="contact__formFieldError">
              <i className="fa fa-exclamation-triangle"/> {props.errorText}
          </small>;


    return (
        <div className="contact__formField">
            <label className={labelStyle}>{props.name}</label>
            {inputElement}
            {errorMessage}
        </div>
    );

};

export default Field;