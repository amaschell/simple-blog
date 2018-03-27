import React from 'react';
import {Route, Switch} from 'react-router-dom'

import About from '../About/About';
import Contact from '../Contact/Contact';
import Home from '../Home/Home';
import Posts from '../Posts/Posts';
import Post from '../Post/Post';
import InfoMessage from '../InfoMessage/InfoMessage';
import './main.css';
import * as urls from "../../config/requestsAndURLs";

const Main = () => (
    <main className="main">
        <Switch>
            <Route exact path={urls.makeIndexURL()} component={Home}/>
            <Route path={urls.makeAboutURL()} component={About}/>
            <Route exact path={urls.makePostsURL()} component={Posts}/>
            <Route exact path={urls.makeStaticPostURL()} component={Post}/>
            <Route path={urls.makeContactUrl()} component={Contact}/>

            { /* 404 Route if nothing else matches. */ }
            <Route render={
                () => <InfoMessage title="404" text="Sorry, this page does not exist..." iconClass="em em-black_heart"/>
            }/>
        </Switch>
    </main>
);

export default Main;
