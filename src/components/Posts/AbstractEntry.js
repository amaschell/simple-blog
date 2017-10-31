import React from 'react';
import {Link} from 'react-router-dom'

import './posts.css';

const AbstractEntry = (props) => (
    <article className="abstractEntry">
        <h2 className="abstractEntry__title">
            {/* TODO: How to link and display here posts/post_url? */}
            <Link to={props.post.url} className="abstractEntry__link">
                {props.post.title}
            </Link>
        </h2>
        <time className="abstractEntry__date">{props.post.date}</time>
        <span className="abstractEntry__author">by {props.post.author}</span>
        <p className="abstractEntry__abstract">{props.post.abstract}</p>
    </article>
);

export default AbstractEntry;