import React from 'react';
import {Link} from 'react-router-dom';

import Entry from './Entry';
import InfoMessage from '../InfoMessage/InfoMessage';
import './post.css';
import * as requestsAndURLs from '../../config/requestsUtility';

class Post extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            post: null,
            hasGeneralServerError: false
        };
    }

    componentDidMount() {
        return requestsAndURLs.getPost(this.props.match.params.slug)
            .then(res => {
                this.setState({
                    post: res.data,
                    hasGeneralServerError: false
                });
            })
            .catch(error => {
                let is404Error;

                try {
                    is404Error = error.response.status === 404;
                } catch (e) {
                    is404Error = false;
                }

                this.setState({
                    post: null,
                    hasGeneralServerError: !is404Error
                });
            });
    }

    renderPost() {
        const {hasGeneralServerError, post} = this.state;
        let toBeRendered;

        if (hasGeneralServerError) {
            // The promise was rejected by the server because of a specific error.
            toBeRendered = <InfoMessage iconClass='em em-no_entry' text='Could not get proper response from server'/>;

        } else if (!post) {
            // The promise was resolved but the post was not found (404).
            toBeRendered = <InfoMessage iconClass='em em-ghost' text='This post does not seem to exist...'/>;

        } else {
            // The post does exist, simply display it.
            toBeRendered = <Entry post={post} />;
        }

        return toBeRendered;
    }

    render() {
        return (
            <div className='post'>
                <nav className='post__backNavigation'>
                    <Link to={requestsAndURLs.makePostsURL()} className='post__backToPostsLink'>&larr; Back to posts</Link>
                </nav>

                { this.renderPost() }
            </div>
        );
    }
}

export default Post;