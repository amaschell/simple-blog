import React from 'react';

import posts from './posts.json';
import AbstractEntry from './AbstractEntry';
import '../Posts/posts.css';

class Posts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: posts
        };
    }

    render() {
        return <nav className="posts">
            <ul className="posts__list">
                {
                    this.state.posts.map(function(post, i) {
                        return <AbstractEntry key={post.id} post={post} />
                    })
                }
            </ul>
        </nav>;
    }
}

export default Posts;