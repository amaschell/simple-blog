import React from 'react';
import { Link } from 'react-router-dom';

import './navigation.css';
import * as requestsAndURLs from "../../config/requestsUtility";

const Navigation = () => (
    <nav className="navigation">
        <ul className="navigation__list">

            <li className='navigation__item'>
                <Link to={requestsAndURLs.makeIndexURL()} className='navigation__link'>
                    Home
                </Link>
            </li>

            <li className='navigation__item'>
                <Link to={requestsAndURLs.makeAboutURL()} className='navigation__link'>
                    About
                </Link>
            </li>

            <li className='navigation__item'>
                <Link to={requestsAndURLs.makePostsURL()} className='navigation__link'>
                    Posts
                </Link>
            </li>

            <li className='navigation__item'>
                <Link to={requestsAndURLs.makeContactUrl()} className='navigation__link'>
                    Contact
                </Link>
            </li>

        </ul>
    </nav>
);

export default Navigation;