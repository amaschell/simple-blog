import React from 'react';
import {Route} from 'react-router-dom'

import About from '../About/About';
import Contact from '../Contact/Contact';
import Home from '../Home/Home';
import Posts from '../Posts/Posts';
import './main.css';

const Main = () => (
    <main className="main">
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/posts" component={Posts}/>
        <Route path="/contact" component={Contact}/>
    </main>
);

export default Main;
