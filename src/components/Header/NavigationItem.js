import React from 'react';

import './header.css';

const NavigationItem = (props) => (
    <li className="navbar__item">
        <a href={props.url} className="navbar__link">
            {props.name}
        </a>
    </li>
);

export default NavigationItem;
