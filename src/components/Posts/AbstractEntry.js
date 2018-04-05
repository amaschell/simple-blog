import React from 'react';
import {Link} from 'react-router-dom'

import './posts.css';
import * as requestsAndURLs from '../../config/requestsUtility';


const AbstractEntry = (props) => {
    const {abstract, author, date, title, url} = props.post;

    return (
        <li className='abstractEntry'>
            <article >
                <h2 className='abstractEntry__title'>
                    <Link to={requestsAndURLs.makePostURL(url)} className='abstractEntry__link'>
                        {title}
                    </Link>
                </h2>
                <time className='abstractEntry__date'>{date}</time>
                <span className='abstractEntry__author'>by {author}</span>
                <p className='abstractEntry__abstract'>{abstract}</p>
            </article>
        </li>
    );
};

export default AbstractEntry;