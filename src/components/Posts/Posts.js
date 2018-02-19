import React from 'react';
import axios from 'axios';

import AbstractEntry from './AbstractEntry';
import '../Posts/posts.css';

class Posts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3001/posts')
            .then(res => {
                this.setState({
                    posts: res.data
                });
            });
    }

    render() {
        return <nav className="posts">
            <h1 className="posts__mainTitle">All posts</h1>
            <ul className="posts__list">
                {
                    this.state.posts.map( (post) => {
                        return <AbstractEntry key={post.id} post={post} />
                    })
                }
            </ul>
        </nav>;
    }
}

export default Posts;