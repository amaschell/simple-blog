import React from 'react';

import './post.css';

const Entry = (props) => {
    const {author, date, title, content} = props.post;

    return (
        <div>
            <div>{date}</div>
            <h2>{title}</h2>
            <div>by {author}</div>
            <p>{content}</p>
        </div>

    );
};

export default Entry;