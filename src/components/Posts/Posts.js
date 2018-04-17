import React from 'react';

import PostAbstract from '../PostAbstract/PostAbstract';
import InfoMessage from '../InfoMessage/InfoMessage';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import '../Posts/posts.css';
import * as requestsAndURLs from '../../config/requestsUtility';

class Posts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasNotLoadedPostsYet: true,
            posts: [],
            hasError: false
        };
    }

    async componentDidMount() {
        try {
            const res = await requestsAndURLs.getPosts();

            this.setState({
                hasNotLoadedPostsYet: false,
                posts: res.data,
                hasError: false
            });
        } catch (error) {
            this.setState({
                hasNotLoadedPostsYet: false,
                posts: [],
                hasError: true
            });
        }
    }

    renderPosts() {
        const { hasError, hasNotLoadedPostsYet, posts } = this.state;

        if (hasNotLoadedPostsYet) {
            // As long as we have no data, show a loading indicator.
            return (<LoadingIndicator text='Loading...' />);
        } else if (hasError) {
            // The promise was rejected by the server. Inform the user!
            return (<InfoMessage iconClass='em em-no_entry' text='Could not get proper response from server'/>);
        } else if (posts.length === 0) {
            // The promise resolved but the list is empty and therefore there's nothing to display.
            // Inform the user!
            return (<InfoMessage iconClass='em em-ghost' text='No posts seem to exist...'/>);
        }

        // We have a list of posts, simply display it.
        return (
            <ul className='posts__list'>
                {
                    posts.map( (post) => {
                        return (
                            <li key={post.id}>
                                <PostAbstract post={post} />
                            </li>
                        );
                    })
                }
            </ul>
        );
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