import React from 'react';

import './post.css';

const UnknownPost = () => (
    <div className="unknownPost">
        <span className="unknownPost__icon">
            <i className="em em-thinking_face"/>
        </span>
        <span className="unknownPost__text">Sorry, this post does not exist!</span>
    </div>
);

export default UnknownPost;