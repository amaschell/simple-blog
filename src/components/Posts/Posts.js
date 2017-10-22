import React from 'react';
import PostsListEntry from './PostsListEntry';

import '../Posts/posts.css';

class Posts extends React.Component {
    render() {
        // TODO: Use real mocks for this!
        const posts = [
            {id: "1", date: "12.12.2012", title: "1. Entry"},
            {id: "2", date: "12.12.2013", title: "2. Entry"},
            {id: "3", date: "12.12.2014", title: "3. Entry"},
            {id: "4", date: "12.12.2015", title: "4. Entry"},
            {id: "5", date: "12.12.2016", title: "5. Entry"}
        ];

        return <nav className="posts">
            <ul className="posts__list">
                {
                    posts.map(function(post, i) {
                        return <PostsListEntry key={post.id} post={post}/>
                    })
                }
            </ul>
        </nav>;
    }
}

export default Posts;