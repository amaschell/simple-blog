import React from 'react';
import {Link} from 'react-router-dom'

import allPosts from '../Posts/posts.json';
import Entry from './Entry';
import UnknownPost from './UnknownPost';
import './post.css';

const Post = (props) => {
    const post = allPosts.find(p => p.url === props.match.params.slug);
    var postContent;

    if (post) {
        postContent = <Entry post={post} />
    } else {
        postContent = <UnknownPost />
    }


    return (
        <main className="post">
            <nav className="post__backNavigation">
                <Link to="/posts" className="post__backToPostsLink">&larr; Back to posts</Link>
            </nav>

            {postContent}
        </main>
    );
};

export default Post;