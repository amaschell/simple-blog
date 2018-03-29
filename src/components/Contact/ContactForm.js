import React from 'react';

import Field from './Field';
import Feedback from './Feedback';
import * as utils from '../../utils/utils';
import * as requestsAndURLs from "../../config/requestsUtility";
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

        // Properly bind the this inside the click handler to this component.
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleFieldChange(name, newValue) {
        this.setState({
            [name]: newValue,
        });
    }

    isFormValid() {
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
        // Return the promise here, so that the promise can get chained in the tests!
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

    validateAndTryToSubmitForm() {
        // Do the validation first, and then try to do the actual submit action!
        // The setting of the state is wrapped into another promise so that this method (i.e. the actual submit action)
        // can get tested more easily later.
        return new Promise((resolve, reject) => {
            this.setState(
                {
                    nameIsValid: utils.isNonEmptyString(this.state.name),
                    emailIsValid: utils.isValidEmail(this.state.email),
                    subjectIsValid: utils.isNonEmptyString(this.state.subject),
                    messageIsValid: utils.isNonEmptyString(this.state.message),
                },

                async () => {
                    if (this.isFormValid()) {
                        // Do the actual request.
                        resolve(this.doFormSubmit());
                    } else {
                        reject("Form not valid!");
                    }

                }
            );
        });
    }

    handleButtonClick(e) {
        // Disable the default form submit, so that possible invalid fields are properly shown
        // without clearing the form input even after the user clicked on the button. Otherwise the user loses
        // all the input he has provided and that would lead to a very bad UX design.
        e.preventDefault();

        this.validateAndTryToSubmitForm()
            .catch((error) => {
                // Swallow any error here silently. This is for debugging purposes.
                //console.log(error);
            });

        // Stop propagation of the event. Only this button should handle and trigger the request.
        return false;
    }

    render() {
        const {
            errorWhenSendingMessage, messageHasBeenSent,
            email, message, name, subject,
            emailIsValid, messageIsValid, nameIsValid, subjectIsValid
        } = this.state;

        let renderedResult;

        if (messageHasBeenSent) {
            renderedResult = <Feedback type="SUCCESS" title="Yeeehaaa!"
                                       message="Your message has been delivered successfully." />;
        } else {
            const fieldCanNotBeEmptyValidationText = "This field can not be empty!";
            let errorMessage;

            if (errorWhenSendingMessage) {
                errorMessage = <Feedback type="ERROR" title="Your mail could not get sent due to an error!"
                                         message={errorWhenSendingMessage} />;
            }

            renderedResult =
                <form className="contact__form">
                    <Field type="SMALL" name="Name" value={name}
                           valueChanged={this.handleFieldChange.bind(this, 'name')}
                           isValid={nameIsValid} errorText={fieldCanNotBeEmptyValidationText} />

                    <Field type="SMALL" name="E-mail" value={email}
                           valueChanged={this.handleFieldChange.bind(this, 'email')}
                           isValid={emailIsValid} errorText="This is not a valid e-mail address!" />

                    <Field type="SMALL" name="Subject" value={subject}
                           valueChanged={this.handleFieldChange.bind(this, 'subject')}
                           isValid={subjectIsValid} errorText={fieldCanNotBeEmptyValidationText} />

                    <Field type="BIG"  name="Message" value={message}
                           valueChanged={this.handleFieldChange.bind(this, 'message')}
                           isValid={messageIsValid} errorText={fieldCanNotBeEmptyValidationText} />

                    {errorMessage}

                    <div className="contact__formSubmitButtonWrapper">
                        <button type="submit" className="contact__formSubmitButton" onClick={this.handleButtonClick}>
                            Send
                        </button>
                    </div>
                </form>;
        }


        return renderedResult;
    }
}

export default ContactForm;