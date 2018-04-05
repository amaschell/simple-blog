import React from 'react';
import {Link} from 'react-router-dom'

import '../Header/header.css';

const NavigationItem = (props) => (
    <li className='navigation__item'>
        <Link to={props.url} className='navigation__link'>{props.name}</Link>
    </li>
);

export default NavigationItem;
