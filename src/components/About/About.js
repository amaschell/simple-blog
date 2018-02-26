import React from 'react';

import UserInfo from "./UserInfo";
import './about.css';
import * as requestsAndURLs from "../../config/requestsAndURLs";

class About extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };
    }

    componentDidMount() {
        return requestsAndURLs.getAbout()
            .then(res => {
                this.setAuthors(res.data);
            })
            .catch((error) => {
                //TODO
                console.log("An error occurred: " + error);
            });
    }

    setAuthors(authors) {
        this.setState({
            users: authors
        })
    }

    render() {
        return (
            <div className="about">
                <h1 className="about__mainTitle">About this blog</h1>
                <ul className="about__usersList">
                    {
                        this.state.users.map( (user) => {
                            return <UserInfo key={user.id} user={user} />
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default About;
