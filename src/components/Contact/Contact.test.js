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

        function isProperField(fieldIndex, hasInput, name) {
            const field = mounted.find('form').childAt(fieldIndex);

            expect(field.type()).toEqual(Field);
            // Correct label without error style.
            expect(field.find('.contact__formLabel').text()).toMatch(name);
            // The correct input element is present.
            expect(field.find(hasInput ? 'input' : 'textarea').length).toEqual(1);
            // No initial value!
            expect(field.find((hasInput ? 'input' : 'textarea')).props().value).toEqual('');
            // Proper and valid CSS class!
            expect(field.find(hasInput ? '.contact__formInput--small' : '.contact__formInput--big').length).toEqual(1);
            // No error present.
            expect(field.find('.contact__formFieldError').length).toEqual(0);
        }


        // The form is present.
        expect(mounted.find(ContactForm).length).toEqual(1);
        expect(mounted.find('form').length).toEqual(1);

        // All fields are present and properly displayed.
        const fields = mounted.find(Field);
        expect(fields.length).toEqual(4);
        isProperField(0, true, 'Name');
        isProperField(1, true, 'E-mail');
        isProperField(2, true, 'Subject');
        isProperField(3, false, 'Message');

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
});
