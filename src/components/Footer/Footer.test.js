import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';

import Footer from './Footer';

describe('Footer', () => {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(<Footer />);
    });

    test('Renders without crashing.', () => {
        const div = document.createElement('div');
        ReactDOM.render(shallowWrapper, div);
    });

    test('Renders primarily a footer.', () => {
        expect(shallowWrapper.type()).toEqual('footer');
    });

    test('Displays the correct current year.', () => {
        const content = shallowWrapper.find(".footer__content");
        const currentYear = new Date().getFullYear();
        expect(content.text()).toMatch(currentYear.toString());
    });

    test('Displays the author\'s correct name.', () => {
        const content = shallowWrapper.find(".footer__content");
        const authorName = "Amadeus Schell";
        expect(content.text()).toMatch(authorName);
    });

    test('Displays the author\'s email address with a proper link.', () => {
        const linkElement = shallowWrapper.find(".footer__email");

        expect(linkElement.type()).toEqual('a');
        expect(linkElement.text()).toEqual('ama.schell7@gmail.com');
        expect(linkElement.props().href).toEqual('mailto:ama.schell7@gmail.com');
    });
});
