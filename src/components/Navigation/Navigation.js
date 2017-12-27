import React from 'react';

import NavigationItem from './NavigationItem';

import './navigation.css';

const Navigation = () => (
    <nav className="navbar">
        <ul className="navbar__list">
            <NavigationItem name="Home" url="/"/>
            <NavigationItem name="About" url="/about"/>
            <NavigationItem name="Posts" url="/posts"/>
            <NavigationItem name="Contact" url="/contact"/>
        </ul>
    </nav>
);

export default Navigation;