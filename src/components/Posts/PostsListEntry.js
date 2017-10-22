import React from 'react';

import '../Posts/posts.css';

const PostsListEntry = (props) => (
    <li key={props.post.id} className="posts__entry">
        <span className="entry__symbol">-</span>
        <a href={'/posts/' + props.post.id} className="entry__link">
            <span className="entry__date">{props.post.date}: </span>
            <span className="entry__title">{props.post.title}</span>
        </a>
    </li>
);

export default PostsListEntry;