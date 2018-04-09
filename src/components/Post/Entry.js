import React from 'react';
import { Link } from 'react-router-dom';

import './post.css';
import * as requestsAndURLs from '../../config/requestsUtility';

const Entry = ( { post : { author, date, title, content }} ) => (
    <article className='post__entry'>
        <time className='post__date'>{date}</time>
        <h2 className='post__title'>{title}</h2>
        <div className='post__author'>
            by <Link to={requestsAndURLs.makeAboutURL()} className='post__authorLink'>{author}</Link>
        </div>
        <p className='post__content'>{content}</p>
    </article>
);

export default Entry;