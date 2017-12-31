import React from 'react';

import './about.css';

const UserInfo = (props) => {
    const {firstName, lastName, description} = props.user;

    return (
        <li className="about__user">
            <div className="about__userName">{firstName} {lastName}</div>
            <div className="about__userDescription">{description}</div>
        </li>
    );

};

export default UserInfo;