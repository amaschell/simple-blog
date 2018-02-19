import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import Entry from './Entry';
import UnknownPost from './UnknownPost';
import './post.css';

class Post extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            post: null
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/posts/' + this.props.match.params.slug)
            .then(res => {
                this.setState({
                    post: res.data
                });
            });
    }

    render() {
        var postContent;

        if (this.state.post) {
            postContent = <Entry post={this.state.post} />
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
    }
};

export default Post;