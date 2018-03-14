import React from 'react';

import Field from './Field';
import Feedback from './Feedback';
import * as utils from '../../utils/utils';
import * as requestsAndURLs from "../../config/requestsAndURLs";
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

    makeFormDataForRequest() {
        // TODO: Security checks here? Escaping?

        return {
            name: this.state.name,
            email: this.state.email,
            subject: this.state.subject,
            message: this.state.message
        };
    }


    doFormSubmit() {
        if (this.formIsValid()) {
            return requestsAndURLs.postContactForm(this.makeFormDataForRequest())
                .then(res => {
                    this.setState({
                        messageHasBeenSent: true
                    })
                })
                .catch((error) => {
                    this.setState({
                        messageHasBeenSent: false,
                        errorWhenSendingMessage: error.response.data
                    })
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
        let renderedResult;

        if (this.state.messageHasBeenSent) {
            renderedResult = <Feedback type="SUCCESS" title="Yeeehaaa!"
                                       message="Your message has been delivered successfully. " />;
        } else {
            const fieldCanNotBeEmptyValidationText = "This field can not be empty!";
            let errorMessage;

            if (this.state.errorWhenSendingMessage) {
                errorMessage = <Feedback type="ERROR" title="Your mail could not get sent due to an error!"
                                         message={this.state.errorWhenSendingMessage} />;
            }

            renderedResult =
                <form className="contact__form">
                    <Field type="SMALL" name="Name" value={this.state.name}
                           valueChanged={this.handleChange.bind(this, 'name')}
                           isValid={this.state.nameIsValid} errorText={fieldCanNotBeEmptyValidationText} />

                    <Field type="SMALL" name="E-mail" value={this.state.email}
                           valueChanged={this.handleChange.bind(this, 'email')}
                           isValid={this.state.emailIsValid} errorText="This is not a valid e-mail address!" />

                    <Field type="SMALL" name="Subject" value={this.state.subject}
                           valueChanged={this.handleChange.bind(this, 'subject')}
                           isValid={this.state.subjectIsValid} errorText={fieldCanNotBeEmptyValidationText} />

                    <Field type="BIG"  name="Message" value={this.state.message}
                           valueChanged={this.handleChange.bind(this, 'message')}
                           isValid={this.state.messageIsValid} errorText={fieldCanNotBeEmptyValidationText} />

                    {errorMessage}

                    <div className="contact__formSubmitButtonWrapper">
                        <button type="submit" className="contact__formSubmitButton" onClick={this.onFormSubmit}>
                            Send
                        </button>
                    </div>
                </form>;
        }


        return renderedResult;
    }
}

export default ContactForm;