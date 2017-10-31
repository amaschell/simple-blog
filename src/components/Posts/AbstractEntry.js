import React from 'react';

import './posts.css';

const AbstractEntry = (props) => (
    <article className="abstractEntry">
        <h2 className="abstractEntry__title">
            <a className="abstractEntry__link" href="#">{props.post.title}</a>
        </h2>
        <time className="abstractEntry__date">{props.post.date}</time>
        <span className="abstractEntry__author">by {props.post.author}</span>
        <p className="abstractEntry__abstract">{props.post.abstract}</p>
    </article>
);

export default AbstractEntry;