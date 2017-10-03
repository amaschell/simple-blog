import React from 'react';
import NavigationItem from './NavigationItem';

import './header.css';

const Header = () => (
    <header className="header">
        <h1 className="header__title">A Rather Simplistic Blog</h1>
        <nav className="header__navbar">
            <ul className="navbar__list">
                <NavigationItem name="Home" url="home"/>
                <NavigationItem name="Posts" url="posts"/>
                <NavigationItem name="About" url="about"/>
                <NavigationItem name="Contact" url="contact"/>
            </ul>
        </nav>
    </header>
);

export default Header;