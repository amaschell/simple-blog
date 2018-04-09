import React from 'react';

import Field from './Field';
import Feedback from './Feedback';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import * as utils from '../../utils/utils';
import * as requestsAndURLs from '../../config/requestsUtility';
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

            isCurrentlySendingFormDataToServer: false,
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
                    isCurrentlySendingFormDataToServer: false,
                    messageHasBeenSent: true
                });
            })
            .catch(error => {
                this.setState({
                    isCurrentlySendingFormDataToServer: false,
                    messageHasBeenSent: false,
                    errorWhenSendingMessage: error.response.data
                });
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
                    messageIsValid: utils.isNonEmptyString(this.state.message)
                },

                async () => {
                    if (this.isFormValid()) {
                        // First set the state, so that the component gets re-rendered and the loading indicator
                        // gets shown. After that, the actual request is performed. This is done so that the user
                        // receives an immediate loading feedback for his form submit action.
                        this.setState(
                            {
                                isCurrentlySendingFormDataToServer: true
                            },

                            resolve(this.doFormSubmit())
                        );
                    } else {
                        reject('Form not valid!');
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
            .catch(error => {
                // Swallow any error here silently. This is for debugging purposes.
                //console.log(error);
            });

        // Stop propagation of the event. Only this button should handle and trigger the request.
        return false;
    }

    render() {
        const {
            errorWhenSendingMessage, messageHasBeenSent, isCurrentlySendingFormDataToServer,
            email, message, name, subject,
            emailIsValid, messageIsValid, nameIsValid, subjectIsValid
        } = this.state;


        if (isCurrentlySendingFormDataToServer) {
            // If we're currently sending something to the server, we need to display a loading indicator so that
            // the user knows that something is happening.
            return (<LoadingIndicator text='Sending...'/>);

        } else if (messageHasBeenSent) {
            return (
                <Feedback type={Feedback.Types.SUCCESS} title='Yeeehaaa!'
                          message='Your message has been delivered successfully.' />
            );
        }

        // Just render the form. The fields could be empty or already be filled (The latter when the validation
        // failed for example).
        const fieldCanNotBeEmptyValidationText = 'This field can not be empty!';

        // Show an error only if there was one!
        const errorMessage = errorWhenSendingMessage ?
                             (
                                 <Feedback type={Feedback.Types.FAILURE}
                                           title='Your mail could not get sent due to an error!'
                                           message={errorWhenSendingMessage} />
                             ) :
                             null;

        return (
            <form className='contact__form'>
                    <Field size={Field.Sizes.SMALL} name='Name' value={name}
                           valueChanged={this.handleFieldChange.bind(this, 'name')}
                           isValid={nameIsValid} errorText={fieldCanNotBeEmptyValidationText} />

                    <Field size={Field.Sizes.SMALL} name='E-mail' value={email}
                           valueChanged={this.handleFieldChange.bind(this, 'email')}
                           isValid={emailIsValid} errorText='This is not a valid e-mail address!' />

                    <Field size={Field.Sizes.SMALL} name='Subject' value={subject}
                           valueChanged={this.handleFieldChange.bind(this, 'subject')}
                           isValid={subjectIsValid} errorText={fieldCanNotBeEmptyValidationText} />

                    <Field size={Field.Sizes.LARGE}  name='Message' value={message}
                           valueChanged={this.handleFieldChange.bind(this, 'message')}
                           isValid={messageIsValid} errorText={fieldCanNotBeEmptyValidationText} />

                    {errorMessage}

                    <div className='contact__formSubmitButtonWrapper'>
                        <button type='submit' className='contact__formSubmitButton' onClick={this.handleButtonClick}>
                            Send
                        </button>
                    </div>
            </form>
        );
    }
}

export default ContactForm;