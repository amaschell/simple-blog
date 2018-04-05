import React from 'react';
import {Link} from 'react-router-dom';

import './home.css';
import * as requestsAndURLs from '../../config/requestsUtility';

const LatestPostPreview = (props) => {
    const {abstract, date, title, url} = props.latestPost;
    const linkToPost = requestsAndURLs.makePostURL(url);

    return (
        <article className='home__latestPost'>
            <h1 className='home__latestPostMainTitle'>
                Check out the latest post from the {date}!
            </h1>
            <h3 className='home__latestPostEntryTitle'>
                {title}
            </h3>
            <p className='home__latestPostAbstract'>{abstract}</p>
            <Link to={linkToPost} className='home__latestPostShowMore'>
                Read more...
            </Link>
        </article>
    );
};

export default LatestPostPreview;