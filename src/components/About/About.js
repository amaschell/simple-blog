import React from 'react';

import UserInfo from "./UserInfo";
import InfoMessage from '../InfoMessage/InfoMessage';
import './about.css';
import * as requestsAndURLs from "../../config/requestsAndURLs";

class About extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            hasError: false
        };
    }

    componentDidMount() {
        return requestsAndURLs.getAbout()
            .then(res => {
                this.setState({
                    users: res.data,
                    hasError: false
                })
            })
            .catch((error) => {
                this.setState({
                    posts: [],
                    hasError: true
                })
            });
    }

    renderAuthors() {
        let toBeRendered;

        if (this.state.hasError) {
            // The promise was rejected by the server. Inform the user!
            toBeRendered = <InfoMessage iconClass="em em-no_entry" text="Could not get proper response from server"/>

        } else if (this.state.users.length === 0) {
            // The promise resolved but the list is empty and therefore there's nothing to display.
            // Inform the user!
            toBeRendered = <InfoMessage iconClass="em em-ghost" text="No authors seem to exist..."/>

        } else {
            // We have a list of authors, simply display it.
            toBeRendered =  <ul className="about__usersList">
                                {
                                    this.state.users.map( (user) => {
                                        return <UserInfo key={user.id} user={user} />
                                    })
                                }
                            </ul>;

        }

        return toBeRendered;
    }

    render() {
        return (
            <div className="about">
                <h1 className="about__mainTitle">About this blog</h1>
                { this.renderAuthors() }
            </div>
        );
    }
}

export default About;
