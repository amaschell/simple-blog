import React from 'react';

import posts from './posts.json';
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
                        return <div key={post.id}>{post.title}</div>
                    })
                }
            </ul>
        </nav>;
    }
}

export default Posts;