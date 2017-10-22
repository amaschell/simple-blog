import React from 'react';
import {Link} from 'react-router-dom'

import './header.css';

const NavigationItem = (props) => (
    <li className="navbar__item">
        <Link to={props.url} className="navbar__link">{props.name}</Link>
    </li>
);

export default NavigationItem;
