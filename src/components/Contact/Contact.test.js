import React from 'react';
import ReactDOM from 'react-dom';
import {mount} from 'enzyme';

import Contact from './Contact';
import ContactForm from './ContactForm';
import Field from './Field';
import Feedback from './Feedback';
import * as requests from "../../config/requestsAndURLs";

describe('Contact', () => {
    const MockAdapter = require('axios-mock-adapter');
    const axios = require('axios');

    function isValidEmptyField(wrapper, fieldIndex, hasInput, name) {
        isValidField(wrapper, fieldIndex, hasInput, name, '');
    }

    function isValidField(wrapper, fieldIndex, hasInput, name, value) {
        const field = wrapper.find('form').childAt(fieldIndex);

        expect(field.type()).toEqual(Field);
        // Correct label without error style.
        expect(field.find('.contact__formLabel').text()).toMatch(name);
        // The correct input element is present.
        expect(field.find(hasInput ? 'input' : 'textarea').length).toEqual(1);
        // No initial value!
        expect(field.find((hasInput ? 'input' : 'textarea')).props().value).toEqual(value);
        // Proper and valid CSS class!
        expect(field.find(hasInput ? '.contact__formInput--small' : '.contact__formInput--big').length).toEqual(1);
        // No error present.
        expect(field.find('.contact__formFieldError').length).toEqual(0);
    }

    function isInvalidField(wrapper, fieldIndex, hasInput, name) {
        const field = wrapper.find('form').childAt(fieldIndex);

        expect(field.type()).toEqual(Field);
        // Correct label with error style.
        expect(field.find('.contact__formLabel--notValid').text()).toMatch(name);
        // The correct input element is present.
        expect(field.find(hasInput ? 'input' : 'textarea').length).toEqual(1);
        // Invalid CSS class!
        expect(field.find(hasInput ? '.contact__formInput--smallAndNotValid' : '.contact__formInput--bigAndNotValid').length).toEqual(1);
        // An error is present.
        expect(field.find('.contact__formFieldError').length).toEqual(1);
    }

    function isInitiallyValid(form) {
        // All fields are initially valid.
        isValidEmptyField(form, 0, true, 'Name');
        isValidEmptyField(form, 1, true, 'E-mail');
        isValidEmptyField(form, 2, true, 'Subject');
        isValidEmptyField(form, 3, false, 'Message');

        // No error or success messages displayed!
        expect(form.find(Feedback).length).toEqual(0);

        // Has correct initial state.
        expect(form.instance().state).toEqual({
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
        });
    }

    function doClickOnSend(wrapper) {
        // Do the click on Send.
        wrapper.find('.contact__formSubmitButton').simulate('click');
    }


    test('Renders without crashing.', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Contact/>, div);
    });

    test('Feedback sub-component displays success message correctly.', () => {
        const successTitle = "Success Title";
        const successMessage = "Success Message";
        const mountedFeedback = mount(<Feedback type="SUCCESS" title={successTitle} message={successMessage}/>);

        expect(mountedFeedback.find('.contact__feedback--success').length).toEqual(1);
        expect(mountedFeedback.find('.contact__feedbackTitle').text()).toMatch(successTitle);
        expect(mountedFeedback.find('.contact__feedbackMessage').text()).toMatch(successMessage);
    });

    test('Feedback sub-component displays error message correctly.', () => {
        const errorTitle = "Error Title";
        const errorMessage = "Error Message";
        const mountedFeedback = mount(<Feedback type="ERROR" title={errorTitle} message={errorMessage}/>);

        expect(mountedFeedback.find('.contact__feedback--failure').length).toEqual(1);
        expect(mountedFeedback.find('.contact__feedbackTitle').text()).toMatch(errorTitle);
        expect(mountedFeedback.find('.contact__feedbackMessage').text()).toMatch(errorMessage);
    });

    test('Valid small Field sub-component displays correctly.', () => {
        const label = "Test Label";
        const val = "";
        const eText = "Error Text";

        function dummyFunction() {}

        const mountedField = mount(
            <Field type="SMALL" name={label} value={val} valueChanged={dummyFunction} isValid={true} errorText={eText}/>
        );

        // Contains only the label and the input.
        expect(mountedField.find('.contact__formField').children().length).toEqual(2);

        expect(mountedField.find('.contact__formLabel').length).toEqual(1);
        expect(mountedField.find('.contact__formLabel').text()).toMatch(label);

        // Has an input element as input element.
        expect(mountedField.find('input').length).toEqual(1);
        expect(mountedField.find('.contact__formInput--small').length).toEqual(1);
        expect(mountedField.find('input').props().value).toEqual(val);
    });

    test('Invalid small Field sub-component displays correctly.', () => {
        const label = "Test Label";
        const val = "Invalid";
        const eText = "Error Text";

        function dummyFunction() {}

        const mountedField = mount(
            <Field type="SMALL" name={label} value={val} valueChanged={dummyFunction} isValid={false} errorText={eText}/>
        );

        // Contains the label, the input and an error message.
        expect(mountedField.find('.contact__formField').children().length).toEqual(3);

        // The label has the proper "not-valid" class.
        expect(mountedField.find('.contact__formLabel--notValid').length).toEqual(1);
        expect(mountedField.find('.contact__formLabel--notValid').text()).toMatch(label);

        expect(mountedField.find('input').length).toEqual(1);
        // The input has the proper "not-valid" class.
        expect(mountedField.find('.contact__formInput--smallAndNotValid').length).toEqual(1);
        expect(mountedField.find('input').props().value).toEqual(val);

        // The field error is present.
        expect(mountedField.find('.contact__formFieldError').length).toEqual(1);
        expect(mountedField.find('.contact__formFieldError').text()).toMatch(eText);
    });

    test('Valid big Field sub-component displays correctly.', () => {
        const label = "Test Label";
        const val = "";
        const eText = "Error Text";

        function dummyFunction() {}

        const mountedField = mount(
            <Field type="BIG" name={label} value={val} valueChanged={dummyFunction} isValid={true} errorText={eText}/>
        );

        // Contains only the label and the input.
        expect(mountedField.find('.contact__formField').children().length).toEqual(2);

        expect(mountedField.find('.contact__formLabel').length).toEqual(1);
        expect(mountedField.find('.contact__formLabel').text()).toMatch(label);

        // Has a textarea element as input element.
        expect(mountedField.find('textarea').length).toEqual(1);
        expect(mountedField.find('.contact__formInput--big').length).toEqual(1);
        expect(mountedField.find('textarea').props().value).toEqual(val);
    });

    test('Invalid big Field sub-component displays correctly.', () => {
        const label = "Test Label";
        const val = "Invalid";
        const eText = "Error Text";

        function dummyFunction() {}

        const mountedField = mount(
            <Field type="BIG" name={label} value={val} valueChanged={dummyFunction} isValid={false} errorText={eText}/>
        );

        // Contains the label, the input and an error message.
        expect(mountedField.find('.contact__formField').children().length).toEqual(3);

        // The label has the proper "not-valid" class.
        expect(mountedField.find('.contact__formLabel--notValid').length).toEqual(1);
        expect(mountedField.find('.contact__formLabel--notValid').text()).toMatch(label);

        expect(mountedField.find('textarea').length).toEqual(1);
        // The textarea element has the proper "not-valid" class.
        expect(mountedField.find('.contact__formInput--bigAndNotValid').length).toEqual(1);
        expect(mountedField.find('textarea').props().value).toEqual(val);

        // The field error is present.
        expect(mountedField.find('.contact__formFieldError').length).toEqual(1);
        expect(mountedField.find('.contact__formFieldError').text()).toMatch(eText);
    });

    test('Renders ContactForm sub-component correctly and has correct initial state.', () => {
        const mounted = mount(<Contact />);

        // The form is present.
        expect(mounted.find(ContactForm).length).toEqual(1);
        expect(mounted.find('form').length).toEqual(1);

        // All fields are present and properly displayed.
        const fields = mounted.find(Field);
        expect(fields.length).toEqual(4);
        isValidEmptyField(mounted, 0, true, 'Name');
        isValidEmptyField(mounted, 1, true, 'E-mail');
        isValidEmptyField(mounted, 2, true, 'Subject');
        isValidEmptyField(mounted, 3, false, 'Message');

        // No error or success messages displayed!
        expect(mounted.find(Feedback).length).toEqual(0);

        // The button is present.
        const submitButton = mounted.find('button');
        expect(submitButton.length).toEqual(1);
        expect(submitButton.text()).toMatch('Send');

        // Has correct state.
        expect(mounted.find(ContactForm).instance().state).toEqual({
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
        });
    });

    test('Clicking on Send for empty contact form does invalidate the form and not send a request.', () => {
        const mounted = mount(<Contact />);

        isInitiallyValid(mounted.find(ContactForm));

        doClickOnSend(mounted);

        // All fields are now invalid
        isInvalidField(mounted, 0, true, 'Name');
        isInvalidField(mounted, 1, true, 'E-mail');
        isInvalidField(mounted, 2, true, 'Subject');
        isInvalidField(mounted, 3, false, 'Message');

        // No error or success messages displayed as no POST request should have happened!
        expect(mounted.find(Feedback).length).toEqual(0);

        // Has correct state.
        expect(mounted.find(ContactForm).instance().state).toEqual({
            name: '',
            email: '',
            subject: '',
            message: '',
            nameIsValid: false,
            emailIsValid: false,
            subjectIsValid: false,
            messageIsValid: false,
            errorWhenSendingMessage: '',
            messageHasBeenSent: false
        });
    });

    test('No name provided does invalidate field and not send request therefore.', () => {
        const mounted = mount(<ContactForm />);
        const nameValue = '';
        const emailValue = 'abc@gmx.com';
        const subjectValue = 'Subject';
        const messageValue = 'Message';

        isInitiallyValid(mounted);

        // State to test.
        mounted.setState(
            {
                name: nameValue,
                email: emailValue,
                subject: subjectValue,
                message: messageValue,
            }
        );

        doClickOnSend(mounted);

        // All fields are valid, except the name.
        isInvalidField(mounted, 0, true, 'Name');
        isValidField(mounted, 1, true, 'E-mail', emailValue);
        isValidField(mounted, 2, true, 'Subject', subjectValue);
        isValidField(mounted, 3, false, 'Message', messageValue);

        // No error or success messages displayed as no POST request should have happened!
        expect(mounted.find(Feedback).length).toEqual(0);

        // Has correct state.
        expect(mounted.instance().state).toEqual({
            name: nameValue,
            email: emailValue,
            subject: subjectValue,
            message: messageValue,
            nameIsValid: false,
            emailIsValid: true,
            subjectIsValid: true,
            messageIsValid: true,
            errorWhenSendingMessage: '',
            messageHasBeenSent: false
        });
    });

    test('Incorrect email provided does invalidate field and not send request therefore.', () => {
        const mounted = mount(<ContactForm />);
        const nameValue = 'Name';
        const emailValue = 'abc.com';
        const subjectValue = 'Subject';
        const messageValue = 'Message';

        isInitiallyValid(mounted);

        // State to test.
        mounted.setState(
            {
                name: nameValue,
                email: emailValue,
                subject: subjectValue,
                message: messageValue,
            }
        );

        doClickOnSend(mounted);

        // All fields are valid, except the e-mail.
        isValidField(mounted, 0, true, 'Name', nameValue);
        isInvalidField(mounted, 1, true, 'E-mail');
        isValidField(mounted, 2, true, 'Subject', subjectValue);
        isValidField(mounted, 3, false, 'Message', messageValue);

        // No error or success messages displayed as no POST request should have happened!
        expect(mounted.find(Feedback).length).toEqual(0);

        // Has correct state.
        expect(mounted.instance().state).toEqual({
            name: nameValue,
            email: emailValue,
            subject: subjectValue,
            message: messageValue,
            nameIsValid: true,
            emailIsValid: false,
            subjectIsValid: true,
            messageIsValid: true,
            errorWhenSendingMessage: '',
            messageHasBeenSent: false
        });
    });

    test('No subject provided does invalidate field and not send request therefore.', () => {
        const mounted = mount(<ContactForm />);
        const nameValue = 'Name';
        const emailValue = 'abc@gmx.com';
        const subjectValue = '';
        const messageValue = 'Message';

        isInitiallyValid(mounted);

        // State to test.
        mounted.setState(
            {
                name: nameValue,
                email: emailValue,
                subject: subjectValue,
                message: messageValue,
            }
        );

        doClickOnSend(mounted);

        // All fields are valid, except the subject.
        isValidField(mounted, 0, true, 'Name', nameValue);
        isValidField(mounted, 1, true, 'E-mail', emailValue);
        isInvalidField(mounted, 2, true, 'Subject');
        isValidField(mounted, 3, false, 'Message', messageValue);

        // No error or success messages displayed as no POST request should have happened!
        expect(mounted.find(Feedback).length).toEqual(0);

        // Has correct state.
        expect(mounted.instance().state).toEqual({
            name: nameValue,
            email: emailValue,
            subject: subjectValue,
            message: messageValue,
            nameIsValid: true,
            emailIsValid: true,
            subjectIsValid: false,
            messageIsValid: true,
            errorWhenSendingMessage: '',
            messageHasBeenSent: false
        });
    });

    test('No message provided does invalidate field and not send request therefore.', () => {
        const mounted = mount(<ContactForm />);
        const nameValue = 'Name';
        const emailValue = 'abc@gmx.com';
        const subjectValue = 'Subject';
        const messageValue = '';

        isInitiallyValid(mounted);

        // State to test.
        mounted.setState(
            {
                name: nameValue,
                email: emailValue,
                subject: subjectValue,
                message: messageValue,
            }
        );

        doClickOnSend(mounted);

        // All fields are valid, except the message.
        isValidField(mounted, 0, true, 'Name', nameValue);
        isValidField(mounted, 1, true, 'E-mail', emailValue);
        isValidField(mounted, 2, true, 'Subject', subjectValue);
        isInvalidField(mounted, 3, false, 'Message');

        // No error or success messages displayed as no POST request should have happened!
        expect(mounted.find(Feedback).length).toEqual(0);

        // Has correct state.
        expect(mounted.instance().state).toEqual({
            name: nameValue,
            email: emailValue,
            subject: subjectValue,
            message: messageValue,
            nameIsValid: true,
            emailIsValid: true,
            subjectIsValid: true,
            messageIsValid: false,
            errorWhenSendingMessage: '',
            messageHasBeenSent: false
        });
    });

    test('Valid form gets submitted correctly, POST request succeeds on the server, ' +
         'form disappears and only success message is shown.', async (done) => {

        const mounted = mount(<ContactForm />);
        const nameValue = 'Name';
        const emailValue = 'abc@gmx.com';
        const subjectValue = 'Subject';
        const messageValue = 'Message';

        isInitiallyValid(mounted);

        // State to test.
        mounted.setState(
            {
                name: nameValue,
                email: emailValue,
                subject: subjectValue,
                message: messageValue,
            }
        );

        const mock = new MockAdapter(axios);
        mock.onPost(requests.makeRequestURL(requests.makeContactFormSubmitUrl())).reply(200);

        await mounted.instance().validateAndTryToSubmitForm().then(response => {
            // Force re-rendering with the new state.
            mounted.update();
            // The form should be gone.
            expect(mounted.find('form').length).toEqual(0);
            // There should now only be a success message.
            const feedback = mounted.find(Feedback);
            expect(feedback.length).toEqual(1);
            expect(feedback.find('.contact__feedback--success').length).toEqual(1);
            expect(feedback.find('.contact__feedbackTitle').text()).toMatch('Yeeehaaa!');
            expect(feedback.find('.contact__feedbackMessage').text()).toMatch('Your message has been delivered successfully.');

            done();
        });
    });

    test('Valid form gets submitted correctly, but POST request fails on the server, ' +
         'the form and the provided input does not disappear and an error message is shown.', async (done) => {

        const mounted = mount(<ContactForm />);
        const nameValue = 'Name';
        const emailValue = 'abc@gmx.com';
        const subjectValue = 'Subject';
        const messageValue = 'Message';
        const serverErrorText = 'Internal error, so sad...';

        isInitiallyValid(mounted);

        // State to test.
        mounted.setState(
            {
                name: nameValue,
                email: emailValue,
                subject: subjectValue,
                message: messageValue,
            }
        );

        const mock = new MockAdapter(axios);
        mock.onPost(requests.makeRequestURL(requests.makeContactFormSubmitUrl())).reply(500, serverErrorText);

        await mounted.instance().validateAndTryToSubmitForm().then(response => {
            // Force re-rendering with the new state.
            mounted.update();
            // The form should still be present!
            expect(mounted.find('form').length).toEqual(1);
            // All fields should still be there and still contain the values the user provided.
            expect(mounted.find(Field).length).toEqual(4);
            isValidField(mounted, 0, true, 'Name', nameValue);
            isValidField(mounted, 1, true, 'E-mail', emailValue);
            isValidField(mounted, 2, true, 'Subject', subjectValue);
            isValidField(mounted, 3, false, 'Message', messageValue);

            // But there should now also be the error message returned by the server!
            const feedback = mounted.find(Feedback);
            expect(feedback.length).toEqual(1);
            expect(feedback.find('.contact__feedback--failure').length).toEqual(1);
            expect(feedback.find('.contact__feedbackTitle').text()).toMatch('Your mail could not get sent due to an error!');
            expect(feedback.find('.contact__feedbackMessage').text()).toMatch(serverErrorText);

            done();
        });
    });
});
