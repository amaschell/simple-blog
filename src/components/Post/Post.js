import React from 'react';
import {Link} from 'react-router-dom';

import Entry from './Entry';
import UnknownPost from './UnknownPost';
import './post.css';
import * as requestsAndURLs from "../../config/requestsAndURLs";

class Post extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            post: null
        }
    }

    componentDidMount() {
        requestsAndURLs.getPost(this.props.match.params.slug)
            .then(res => {
                this.setState({
                    post: res.data
                });
            });
    }

    render() {
        let postContent;

        if (this.state.post) {
            postContent = <Entry post={this.state.post} />
        } else {
            postContent = <UnknownPost />
        }

        return (
            <div className="post">
                <nav className="post__backNavigation">
                    <Link to={requestsAndURLs.makePostsURL()} className="post__backToPostsLink">&larr; Back to posts</Link>
                </nav>

                {postContent}
            </div>
        );
    }
}

export default Post;