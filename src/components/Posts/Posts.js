import React from 'react';

import AbstractEntry from './AbstractEntry';
import InfoMessage from '../InfoMessage/InfoMessage';
import '../Posts/posts.css';
import * as requestsAndURLs from '../../config/requestsUtility';

class Posts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            hasError: false
        };
    }

    componentDidMount() {
        // Return the promise here, so that the promise can get chained in the tests!
        return requestsAndURLs.getPosts()
            .then(res => {
                this.setState({
                    posts: res.data,
                    hasError: false
                });
            })
            .catch(error => {
                this.setState({
                    posts: [],
                    hasError: true
                });
            });
    }

    renderPosts() {
        const {hasError, posts} = this.state;
        let toBeRendered;

        if (hasError) {
            // The promise was rejected by the server. Inform the user!
            toBeRendered = <InfoMessage iconClass='em em-no_entry' text='Could not get proper response from server'/>;

        } else if (posts.length === 0) {
            // The promise resolved but the list is empty and therefore there's nothing to display.
            // Inform the user!
            toBeRendered = <InfoMessage iconClass='em em-ghost' text='No posts seem to exist...'/>;

        } else {
            // We have a list of posts, simply display it.
            toBeRendered = <ul className='posts__list'>
                            {
                                posts.map( (post) => {
                                    return <AbstractEntry key={post.id} post={post} />;
                                })
                            }
                            </ul>;

        }

        return toBeRendered;
    }

    render() {
        return (
            <nav className='posts'>
                <h1 className='posts__mainTitle'>All posts</h1>
                { this.renderPosts() }
            </nav>
        );
    }
}

export default Posts;