import React from 'react';
import {Route, Switch} from 'react-router-dom'

import About from '../About/About';
import Contact from '../Contact/Contact';
import Home from '../Home/Home';
import Posts from '../Posts/Posts';
import Post from '../Post/Post';
import InfoMessage from '../InfoMessage/InfoMessage';
import './main.css';

const Main = () => (
    <main className="main">
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route exact path="/posts" component={Posts}/>
            <Route exact path="/posts/:slug" component={Post}/>
            <Route path="/contact" component={Contact}/>

            { /* 404 Route if nothing else matches. */ }
            <Route render={
                () => <InfoMessage title="404" text="Sorry, this page does not exist..." iconClass="em em-black_heart"/>
            }/>
        </Switch>
    </main>
);

export default Main;
