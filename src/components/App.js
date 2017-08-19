import React, { Component } from 'react';
import BlogHeader from './BlogHeader';
import BlogPostsList from './BlogPostsList';
import BlogPostArea from './BlogPostArea';
import BlogFooter from './BlogFooter';
import '../css/app.css';

class App extends Component {
  render() {
    return (
        <div>
            <BlogHeader />
            <BlogPostsList />
            <BlogPostArea />
            <BlogFooter />
        </div>
    );
  }
}

export default App;
