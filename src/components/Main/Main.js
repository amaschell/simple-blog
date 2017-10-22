import React from 'react';
import {Route} from 'react-router-dom'

import Home from '../Home/Home';
import About from '../About/About';
import Posts from '../Posts/Posts';
import Contact from '../Contact/Contact';
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
