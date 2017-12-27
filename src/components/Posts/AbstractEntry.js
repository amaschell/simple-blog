import React from 'react';
import {Link} from 'react-router-dom'

import './posts.css';

const AbstractEntry = (props) => {
    const {abstract, author, date, title, url} = props.post;

    return (
        <article className="abstractEntry">
            <h2 className="abstractEntry__title">
                <Link to={`posts/${url}`} className="abstractEntry__link">
                    {title}
                </Link>
            </h2>
            <time className="abstractEntry__date">{date}</time>
            <span className="abstractEntry__author">by {author}</span>
            <p className="abstractEntry__abstract">{abstract}</p>
        </article>
    );
};

export default AbstractEntry;