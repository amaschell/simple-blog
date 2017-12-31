import React from 'react';

import users from './users.json';
import UserInfo from "./UserInfo";
import './about.css';

class About extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: users
        };
    }

    render() {
        return (
            <div className="about">
                <h1 className="about__title">About this blog</h1>
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
};

export default About;
