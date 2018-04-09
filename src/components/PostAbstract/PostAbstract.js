import React from 'react';
import { Link } from 'react-router-dom'

import './postAbstract.css';
import * as requestsAndURLs from '../../config/requestsUtility';


const PostAbstract = ( { post : { abstract, author, date, title, url }} ) => (
    <article className='postAbstract'>
        <h2 className='postAbstract__title'>
            <Link to={requestsAndURLs.makePostURL(url)} className='postAbstract__link'>
                {title}
            </Link>
        </h2>
        <time className='postAbstract__date'>{date}</time>
        <span className='postAbstract__author'>by {author}</span>
        <p className='postAbstract__abstract'>{abstract}</p>
    </article>
);

export default PostAbstract;