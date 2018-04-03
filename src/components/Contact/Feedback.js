import React from 'react';

import './contact.css';
import PropTypes from "prop-types";

class Feedback extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // After the first rendering.
        this.scrollIntoView();
    }

    componentDidUpdate() {
        // For all subsequent renderings after the first rendering.
        this.scrollIntoView();
    }

    scrollIntoView() {
        // As this component displays the result of the contact form POST request to the server,
        // we want the user to directly see this important message by scrolling it into focus.
        window.scrollTo(0, this.divToFocus.offsetTop);
    }

    render() {
        const {message, title, type} = this.props;

        return (
            <div tabIndex="-1"
                 className={(type === Types.SUCCESS ? 'contact__feedback--success' : 'contact__feedback--failure')}
                 ref={(node) => { this.divToFocus = node; }}>

                <h3 className='contact__feedbackTitle'>{title}</h3>
                <p className='contact__feedbackMessage'>{message}</p>
            </div>
        );
    }
}

// Introduce a kind of Enum (with immutable values) for the allowed types of feedback.
// By using this logic, "magic strings" are getting avoided.
const Types = Object.freeze({
    SUCCESS: "SUCCESS",
    FAILURE: "FAILURE"
});

// Extra type check for development mode.
Feedback.propTypes = {
    type: PropTypes.oneOf(Object.keys(Types))
};

// By doing this, the parent component can reference all allowed sizes when defining this component as child.
Feedback.Types = Types;

export default Feedback;
