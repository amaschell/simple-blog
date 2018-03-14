import React from 'react';

import './contact.css';

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
        return (
            <div tabIndex="-1"
                 className={(this.props.type === "SUCCESS" ? 'contact__feedback--success' : 'contact__feedback--failure')}
                 ref={(node) => { this.divToFocus = node; }}>

                <h3 className='contact__feedbackTitle'>{this.props.title}</h3>
                <div className='contact__feedbackMessage'>{this.props.message}</div>
            </div>
        );
    }
}

export default Feedback;
