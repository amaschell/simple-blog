import React from 'react';

import NavigationItem from './NavigationItem';
import './navigation.css';
import * as requestsAndURLs from "../../config/requestsUtility";

const Navigation = () => (
    <nav className="navigation">
        <ul className="navigation__list">
            <NavigationItem name="Home" url={requestsAndURLs.makeIndexURL()}/>
            <NavigationItem name="About" url={requestsAndURLs.makeAboutURL()}/>
            <NavigationItem name="Posts" url={requestsAndURLs.makePostsURL()}/>
            <NavigationItem name="Contact" url={requestsAndURLs.makeContactUrl()}/>
        </ul>
    </nav>
);

export default Navigation;