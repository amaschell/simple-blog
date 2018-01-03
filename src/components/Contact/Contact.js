import React from 'react';

import ContactForm from './ContactForm';
import './contact.css';

class Contact extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="contact">
                <h1 className="contact__mainTitle">How to contact us</h1>
                <ContactForm />
            </div>
        );
    }
}

export default Contact;
