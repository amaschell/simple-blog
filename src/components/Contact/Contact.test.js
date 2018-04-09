import React from 'react';
import ReactDOM from 'react-dom';
import {mount} from 'enzyme';

import Contact from './Contact';
import ContactForm from './ContactForm';
import Field from './Field';
import Feedback from './Feedback';
import * as requests from '../../config/requestsUtility';


describe('Contact', () => {
    const MockAdapter = require('axios-mock-adapter');
    const axios = require('axios');

    const contactFormSubmitToMockMethodName = 'doFormSubmit';

    /**
     * Helper method to define if a field is valid and contains a certain value.
     *
     * @param wrapper The wrapper inside where the field lives.
     * @param fieldIndex The index of the field in the vertical display order.
     * @param hasInput True if the field displays an input HTML element. False if it displays a textarea HTML element.
     * @param name The name of the field.
     * @param value The value that should be inside the field. Empty string as default value for empty fields.
     */
    function isValidField(wrapper, fieldIndex, hasInput, name, value = '') {
        const field = wrapper.find('form').childAt(fieldIndex);

        expect(field.type()).toEqual(Field);
        // Correct label without error style.
        expect(field.find('.contact__formLabel').text()).toMatch(name);
        expect(field.find('.contact__formLabel--notValid').length).toEqual(0);
        // The correct input element is present.
        expect(field.find(hasInput ? 'input' : 'textarea').length).toEqual(1);
        // Contains correct value.
        expect(field.find((hasInput ? 'input' : 'textarea')).props().value).toEqual(value);
        // Proper and valid CSS class is set.
        expect(field.find(hasInput ? '.contact__formInput--small' : '.contact__formInput--large').length).toEqual(1);
        // No error is present.
        expect(field.find('.contact__formFieldError').length).toEqual(0);
    }

    /**
     * Helper method to define if a field is invalid regardless of the set value.
     *
     * @param wrapper The wrapper inside where the field lives.
     * @param fieldIndex The index of the field in the vertical display order.
     * @param hasInput True if the field displays an input HTML element. False if it displays a textarea HTML element.
     * @param name The name of the field.
     */
    function isInvalidField(wrapper, fieldIndex, hasInput, name) {
        const field = wrapper.find('form').childAt(fieldIndex);

        expect(field.type()).toEqual(Field);
        // Correct label with error style set.
        expect(field.find('.contact__formLabel--notValid').text()).toMatch(name);
        // The correct input element is present.
        expect(field.find(hasInput ? 'input' : 'textarea').length).toEqual(1);
        // Proper and valid CSS class is set.
        expect(field.find(hasInput ? '.contact__formInput--small' : '.contact__formInput--large').length).toEqual(1);
        // The invalid CSS class is set for the input.
        expect(field.find('.contact__formInput--notValid').length).toEqual(1);
        // The error label is present.
        expect(field.find('.contact__formFieldError').length).toEqual(1);
    }

    /**
     * Helper method to test if the given contact form is in its initial valid state. That means that all fields
     * are visible, valid and that they contain no values.
     *
     * @param form The form to validate.
     */
    function isInitiallyValid(form) {
        // All fields are initially valid.
        isValidField(form, 0, true, 'Name');
        isValidField(form, 1, true, 'E-mail');
        isValidField(form, 2, true, 'Subject');
        isValidField(form, 3, false, 'Message');

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
            isCurrentlySendingFormDataToServer: false,
            errorWhenSendingMessage: '',
            messageHasBeenSent: false
        });
    }

    /**
     * Helper method to simulate the click on the form's submit button.
     *
     * @param wrapper The wrapper inside which the submit button lives.
     */
    function doClickOnSend(wrapper) {
        // Do the click on Send.
        wrapper.find('.contact__formSubmitButton').simulate('click');
    }


    test('Renders without crashing.', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Contact/>, div);
    });

    test('Feedback sub-component displays success message correctly.', () => {
        const successTitle = 'Success Title';
        const successMessage = 'Success Message';
        const mountedFeedback = mount(
            <Feedback type={Feedback.Types.SUCCESS} title={successTitle} message={successMessage}/>
        );

        expect(mountedFeedback.find('.contact__feedback').length).toEqual(1);
        expect(mountedFeedback.find('.contact__feedback--success').length).toEqual(1);
        expect(mountedFeedback.find('.contact__feedbackTitle').text()).toMatch(successTitle);
        expect(mountedFeedback.find('.contact__feedbackMessage').text()).toMatch(successMessage);
    });

    test('Feedback sub-component displays error message correctly.', () => {
        const errorTitle = 'Error Title';
        const errorMessage = 'Error Message';
        const mountedFeedback = mount(
            <Feedback type={Feedback.Types.FAILURE} title={errorTitle} message={errorMessage}/>
        );

        expect(mountedFeedback.find('.contact__feedback').length).toEqual(1);
        expect(mountedFeedback.find('.contact__feedback--failure').length).toEqual(1);
        expect(mountedFeedback.find('.contact__feedbackTitle').text()).toMatch(errorTitle);
        expect(mountedFeedback.find('.contact__feedbackMessage').text()).toMatch(errorMessage);
    });

    test('Valid small Field sub-component displays correctly.', () => {
        const label = 'Test Label';
        const val = '';
        const eText = 'Error Text';

        function dummyFunction() {}

        const mountedField = mount(
            <Field size={Field.Sizes.SMALL} name={label} value={val} valueChanged={dummyFunction}
                   isValid={true} errorText={eText} />
        );

        // Contains only the label and the input.
        expect(mountedField.find('.contact__formField').children().length).toEqual(2);

        expect(mountedField.find('.contact__formLabel').length).toEqual(1);
        expect(mountedField.find('.contact__formLabel').text()).toMatch(label);

        // Has an HTML input element as input element.
        expect(mountedField.find('input').length).toEqual(1);
        expect(mountedField.find('.contact__formInput--small').length).toEqual(1);
        expect(mountedField.find('.contact__formInput--notValid').length).toEqual(0);
        expect(mountedField.find('input').props().value).toEqual(val);
    });

    test('Invalid small Field sub-component displays correctly.', () => {
        const label = 'Test Label';
        const val = 'Invalid';
        const eText = 'Error Text';

        function dummyFunction() {}

        const mountedField = mount(
            <Field size={Field.Sizes.SMALL} name={label} value={val} valueChanged={dummyFunction}
                   isValid={false} errorText={eText} />
        );

        // Contains the label, the input and an error message.
        expect(mountedField.find('.contact__formField').children().length).toEqual(3);

        // The label has the proper "not-valid" class.
        expect(mountedField.find('.contact__formLabel--notValid').length).toEqual(1);
        expect(mountedField.find('.contact__formLabel--notValid').text()).toMatch(label);

        expect(mountedField.find('input').length).toEqual(1);
        // The input has the proper "not-valid" class.
        expect(mountedField.find('.contact__formInput--small').length).toEqual(1);
        expect(mountedField.find('.contact__formInput--notValid').length).toEqual(1);
        expect(mountedField.find('input').props().value).toEqual(val);

        // The field error is present.
        expect(mountedField.find('.contact__formFieldError').length).toEqual(1);
        expect(mountedField.find('.contact__formFieldError').text()).toMatch(eText);
    });

    test('Valid large Field sub-component displays correctly.', () => {
        const label = 'Test Label';
        const val = '';
        const eText = 'Error Text';

        function dummyFunction() {}

        const mountedField = mount(
            <Field size={Field.Sizes.LARGE} name={label} value={val} valueChanged={dummyFunction}
                   isValid={true} errorText={eText} />
        );

        // Contains only the label and the input.
        expect(mountedField.find('.contact__formField').children().length).toEqual(2);

        expect(mountedField.find('.contact__formLabel').length).toEqual(1);
        expect(mountedField.find('.contact__formLabel').text()).toMatch(label);

        // Has a HTML textarea element as input element.
        expect(mountedField.find('textarea').length).toEqual(1);
        expect(mountedField.find('.contact__formInput--large').length).toEqual(1);
        expect(mountedField.find('.contact__formInput--notValid').length).toEqual(0);
        expect(mountedField.find('textarea').props().value).toEqual(val);
    });

    test('Invalid large Field sub-component displays correctly.', () => {
        const label = 'Test Label';
        const val = 'Invalid';
        const eText = 'Error Text';

        function dummyFunction() {}

        const mountedField = mount(
            <Field size={Field.Sizes.LARGE} name={label} value={val} valueChanged={dummyFunction}
                   isValid={false} errorText={eText} />
        );

        // Contains the label, the input and an error message.
        expect(mountedField.find('.contact__formField').children().length).toEqual(3);

        // The label has the proper "not-valid" class.
        expect(mountedField.find('.contact__formLabel--notValid').length).toEqual(1);
        expect(mountedField.find('.contact__formLabel--notValid').text()).toMatch(label);

        expect(mountedField.find('textarea').length).toEqual(1);
        // The textarea element has the proper "not-valid" class.
        expect(mountedField.find('.contact__formInput--large').length).toEqual(1);
        expect(mountedField.find('.contact__formInput--notValid').length).toEqual(1);
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
        isInitiallyValid(mounted.find(ContactForm));

        // The submit button is present.
        const submitButton = mounted.find('button');
        expect(submitButton.length).toEqual(1);
        expect(submitButton.text()).toMatch('Send');
    });

    test('Clicking on Send for empty contact form does invalidate the form and not send a request.', () => {
        const mounted = mount(<ContactForm />);
        // Mock the form submit request method.
        const formSubmitSpy = jest.spyOn(mounted.instance(), contactFormSubmitToMockMethodName);

        isInitiallyValid(mounted.find(ContactForm));
        doClickOnSend(mounted);

        // All fields are now invalid.
        isInvalidField(mounted, 0, true, 'Name');
        isInvalidField(mounted, 1, true, 'E-mail');
        isInvalidField(mounted, 2, true, 'Subject');
        isInvalidField(mounted, 3, false, 'Message');

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
            isCurrentlySendingFormDataToServer: false,
            errorWhenSendingMessage: '',
            messageHasBeenSent: false
        });


        // No error or success messages displayed as no POST request should have happened!
        expect(mounted.find(Feedback).length).toEqual(0);

        // The POST request should not have happened!
        expect(formSubmitSpy).toHaveBeenCalledTimes(0);
        // Reset the spy to not interfere with other methods!
        formSubmitSpy.mockReset();
        formSubmitSpy.mockRestore();
    });

    test('No name provided does invalidate field and not send request therefore.', () => {
        const mounted = mount(<ContactForm />);
        // Mock the form submit request method.
        const formSubmitSpy = jest.spyOn(mounted.instance(), contactFormSubmitToMockMethodName);

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
            isCurrentlySendingFormDataToServer: false,
            errorWhenSendingMessage: '',
            messageHasBeenSent: false
        });


        // No error or success messages displayed as no POST request should have happened!
        expect(mounted.find(Feedback).length).toEqual(0);

        // The POST request should not have happened!
        expect(formSubmitSpy).toHaveBeenCalledTimes(0);
        // Reset the spy to not interfere with other methods!
        formSubmitSpy.mockReset();
        formSubmitSpy.mockRestore();
    });

    test('Incorrect email provided does invalidate field and not send request therefore.', () => {
        const mounted = mount(<ContactForm />);
        // Mock the form submit request method.
        const formSubmitSpy = jest.spyOn(mounted.instance(), contactFormSubmitToMockMethodName);

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
            isCurrentlySendingFormDataToServer: false,
            errorWhenSendingMessage: '',
            messageHasBeenSent: false
        });

        // No error or success messages displayed as no POST request should have happened!
        expect(mounted.find(Feedback).length).toEqual(0);

        // The POST request should not have happened!
        expect(formSubmitSpy).toHaveBeenCalledTimes(0);
        // Reset the spy to not interfere with other methods!
        formSubmitSpy.mockReset();
        formSubmitSpy.mockRestore();
    });

    test('No subject provided does invalidate field and not send request therefore.', () => {
        const mounted = mount(<ContactForm />);
        // Mock the form submit request method.
        const formSubmitSpy = jest.spyOn(mounted.instance(), contactFormSubmitToMockMethodName);

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
            isCurrentlySendingFormDataToServer: false,
            errorWhenSendingMessage: '',
            messageHasBeenSent: false
        });

        // No error or success messages displayed as no POST request should have happened!
        expect(mounted.find(Feedback).length).toEqual(0);

        // The POST request should not have happened!
        expect(formSubmitSpy).toHaveBeenCalledTimes(0);
        // Reset the spy to not interfere with other methods!
        formSubmitSpy.mockReset();
        formSubmitSpy.mockRestore();
    });

    test('No message provided does invalidate field and not send request therefore.', () => {
        const mounted = mount(<ContactForm />);
        // Mock the form submit request method.
        const formSubmitSpy = jest.spyOn(mounted.instance(), contactFormSubmitToMockMethodName);

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
            isCurrentlySendingFormDataToServer: false,
            errorWhenSendingMessage: '',
            messageHasBeenSent: false
        });

        // No error or success messages displayed as no POST request should have happened!
        expect(mounted.find(Feedback).length).toEqual(0);

        // The POST request should not have happened!
        expect(formSubmitSpy).toHaveBeenCalledTimes(0);
        // Reset the spy to not interfere with other methods!
        formSubmitSpy.mockReset();
        formSubmitSpy.mockRestore();
    });

    test('Valid form gets submitted correctly, POST request succeeds on the server, ' +
         'form disappears and only success message is shown.', async (done) => {
        const mounted = mount(<ContactForm />);
        // Mock the form submit request method.
        const formSubmitSpy = jest.spyOn(mounted.instance(), contactFormSubmitToMockMethodName);

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

        // Mock the POST network request.
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

            // The POST request should have happened exactly once!
            expect(formSubmitSpy).toHaveBeenCalledTimes(1);
            // Reset the spy to not interfere with other methods!
            formSubmitSpy.mockReset();
            formSubmitSpy.mockRestore();

            done();
        });
    });

    test('Valid form gets submitted correctly, but POST request fails on the server, ' +
         'the form and the provided input does not disappear and an error message is shown.', async (done) => {

        const mounted = mount(<ContactForm />);
        // Mock the form submit request method.
        const formSubmitSpy = jest.spyOn(mounted.instance(), contactFormSubmitToMockMethodName);

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

        // Mock the POST network request.
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

            // The POST request should have happened exactly once!
            expect(formSubmitSpy).toHaveBeenCalledTimes(1);
            // Reset the spy to not interfere with other methods!
            formSubmitSpy.mockReset();
            formSubmitSpy.mockRestore();

            done();
        });
    });
});
