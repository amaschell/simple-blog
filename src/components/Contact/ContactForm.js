import React from 'react';

import Field from './Field';
import Feedback from '../Feedback/Feedback';
import * as utils from '../../utils/utils';
import './contact.css';

class ContactForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            subject: '',
            message: '',

            nameIsValid: true,
            emailIsValid: true,
            subjectIsValid: true,
            messageIsValid: true,

            errorWhenSendingMessage: '',
            messageHasBeenSent: false
        };

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    handleChange(name, newValue) {
        this.setState({
            [name]: newValue,
        });
    }

    formIsValid() {
        return this.state.nameIsValid && this.state.emailIsValid &&
               this.state.subjectIsValid && this.state.messageIsValid;
    }

    doFormSubmit() {
        if (this.formIsValid()) {
            this.setState({
                messageHasBeenSent: true
            });
        }
    }

    onFormSubmit(e) {
        e.preventDefault();

        // Do the validation first, and then try to do the actual submit action!
        this.setState(
            {
                nameIsValid: utils.isNonEmptyString(this.state.name),
                emailIsValid: utils.isValidEmail(this.state.email),
                subjectIsValid: utils.isNonEmptyString(this.state.subject),
                messageIsValid: utils.isNonEmptyString(this.state.message),
            },
            this.doFormSubmit
        );

        return false;
    }

    render() {
        const fieldCanNotBeEmptyValidationText = "This field can not be empty!";

        let feedback;

        if (this.state.messageHasBeenSent) {
            feedback = <Feedback type="SUCCESS" title="It's done!" message="Your e-mail has been sent." />
        } else if (this.state.errorWhenSendingMessage) {
            feedback = <Feedback type="ERROR" title="An error occurred" message={this.state.errorWhenSendingMessage} />
        }

        return (
            <form className="contact__form">
                {feedback}

                <Field type="SMALL" name="Name" value={this.state.name} valueChanged={this.handleChange.bind(this, 'name')}
                       isValid={this.state.nameIsValid} errorText={fieldCanNotBeEmptyValidationText} />

                <Field type="SMALL" name="E-mail" value={this.state.email} valueChanged={this.handleChange.bind(this, 'email')}
                       isValid={this.state.emailIsValid} errorText="This is not a valid e-mail address!" />

                <Field type="SMALL" name="Subject" value={this.state.subject} valueChanged={this.handleChange.bind(this, 'subject')}
                       isValid={this.state.subjectIsValid} errorText={fieldCanNotBeEmptyValidationText} />

                <Field type="BIG"  name="Message" value={this.state.message} valueChanged={this.handleChange.bind(this, 'message')}
                       isValid={this.state.messageIsValid} errorText={fieldCanNotBeEmptyValidationText} />

                <div className="contact__formSubmitButtonWrapper">
                    <button type="submit" className="contact__formSubmitButton" onClick={this.onFormSubmit}>Send</button>
                </div>
            </form>
        );
    }
}

export default ContactForm;