import React from 'react';

import allPosts from '../Posts/posts.json';
import UnknownPost from './UnknownPost';
import './post.css';

const Post = (props) => {
    const post = allPosts.find(p => p.url === props.match.params.slug);
    var postContent;

    if (post) {
        postContent = <div>{post.title} {post.url} {post.id}</div>
    } else {
        postContent = <UnknownPost />
    }


    return (
        <main className="post">
            {postContent}
        </main>
    );
};

export default Post;