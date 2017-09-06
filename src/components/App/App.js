import React from 'react';

import Header from '../Header/Header';
import Posts from '../Posts/Posts';
import Post from '../Post/Post';
import Footer from '../Footer/Footer';
import './app.css';

const App = () => (
    <div className="app">
        <Header />
        <Posts />
        <Post />
        <Footer />
    </div>
);

export default App;