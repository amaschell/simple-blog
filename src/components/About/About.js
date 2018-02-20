import React from 'react';
import axios from 'axios';

import UserInfo from "./UserInfo";
import './about.css';

class About extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3001/about')
            .then(res => {
                this.setState({
                    users: res.data
                })
            });
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
