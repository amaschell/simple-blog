import React from 'react';
import PropTypes from 'prop-types';

import './contact.css';

const Field = (props) => {
    const {errorText, isValid, name, size, value, valueChanged} = props;
    let inputElement;

    if (size === Sizes.LARGE) {
        inputElement = <textarea value={value} rows="6"
                                 className={(isValid ? "contact__formInput--large" : "contact__formInput--largeAndNotValid")}
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

// Introduce a kind of Enum (with immutable values) for the allowed sizes of a field.
// By using this logic, "magic strings" are getting avoided.
const Sizes = Object.freeze({
    LARGE: "LARGE",
    SMALL: "SMALL"
});

// Extra type check for development mode.
Field.propTypes = {
    size: PropTypes.oneOf(Object.keys(Sizes))
};

// By doing this, the parent component can reference all allowed sizes when defining this component as child.
Field.Sizes = Sizes;


export default Field;