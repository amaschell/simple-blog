import React from 'react';
import { Link } from 'react-router-dom';

import Entry from './Entry';
import InfoMessage from '../InfoMessage/InfoMessage';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import './post.css';
import * as requestsAndURLs from '../../config/requestsUtility';

class Post extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasNotLoadedPostYet: true,
            post: null,
            hasGeneralServerError: false
        };
    }

    async componentDidMount() {
        try {
            const res = await requestsAndURLs.getPost(this.props.match.params.slug);

            this.setState({
                hasNotLoadedPostYet: false,
                post: res.data,
                hasGeneralServerError: false
            });
        } catch (error) {
            let is404Error;

            try {
                is404Error = error.response.status === 404;
            } catch (e) {
                is404Error = false;
            }

            this.setState({
                hasNotLoadedPostYet: false,
                post: null,
                hasGeneralServerError: !is404Error
            });
        }
    }

    renderPost() {
        const { hasGeneralServerError, hasNotLoadedPostYet, post } = this.state;

        if (hasNotLoadedPostYet) {
            // As long as we have no data, show a loading indicator.
            return (<LoadingIndicator text='Loading...' />);
        } else if (hasGeneralServerError) {
            // The promise was rejected by the server because of a specific error.
            return (<InfoMessage iconClass='em em-no_entry' text='Could not get proper response from server'/>);
        } else if (!post) {
            // The promise was resolved but the post was not found (404).
            return (<InfoMessage iconClass='em em-ghost' text='This post does not seem to exist...'/>);
        }

        // The post does exist, simply display it.
        return (<Entry post={post} />);
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