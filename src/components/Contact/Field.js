import React from 'react';

import './contact.css';

const Field = (props) => {
    const {errorText, isValid, name, type, value, valueChanged} = props;
    let inputElement;

    if (type === 'BIG') {
        inputElement = <textarea value={value} rows="6"
                                 className={(isValid ? "contact__formInput--big" : "contact__formInput--bigAndNotValid")}
                                 onChange={(e) => valueChanged(e.target.value)} />;
    } else {
        inputElement = <input type="text" value={value}
                              className={(isValid ? "contact__formInput--small" : "contact__formInput--smallAndNotValid")}
                              onChange={(e) => valueChanged(e.target.value)} />;
    }

    const errorMessage = isValid ?
                         null :
                         <small className="contact__formFieldError">
                            <i className="fa fa-exclamation-triangle"/> {errorText}
                         </small>;


    return (
        <div className="contact__formField">
            <label className={(isValid ? "contact__formLabel" : "contact__formLabel--notValid")}>
                {name}
            </label>

            {inputElement}

            {errorMessage}
        </div>
    );

};

export default Field;