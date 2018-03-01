import React from 'react';

import AbstractEntry from './AbstractEntry';
import InfoMessage from '../InfoMessage/InfoMessage';
import '../Posts/posts.css';
import * as requestsAndURLs from "../../config/requestsAndURLs";

class Posts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            hasError: false
        };
    }

    componentDidMount() {
        return requestsAndURLs.getPosts()
            .then(res => {
                this.setState({
                    hasError: false,
                    posts: res.data
                })
            })
            .catch((error) => {
                this.setState({
                    hasError: true
                })
            });
    }

    renderPosts() {
        let toBeRendered;

        if (this.state.hasError) {
            // The promise was rejected by the server. Inform the user!
            toBeRendered = <InfoMessage iconClass="em em-no_entry" text="Could not get proper response from server"/>

        } else if (this.state.posts.length === 0) {
            // The promise resolved but the list is empty and therefore there's nothing to display.
            // Inform the user!
            toBeRendered = <InfoMessage iconClass="em em-ghost" text="No posts seem to exist..."/>

        } else {
            // We have a list of posts, simply display it.
            toBeRendered = <ul className="posts__list">
                            {
                                this.state.posts.map( (post) => {
                                    return <AbstractEntry key={post.id} post={post} />
                                })
                            }
                            </ul>;

        }

        return toBeRendered;
    }

    render() {
        return <nav className="posts">
            <h1 className="posts__mainTitle">All posts</h1>
            { this.renderPosts() }
        </nav>;
    }
}

export default Posts;