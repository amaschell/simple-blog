import React from 'react';

import makeRequestURL from "../../config/requests";

import './about.css';


const UserInfo = (props) => {
    const {firstName, lastName, description, profilePicture} = props.user;
    const fullName = firstName + " " + lastName;
    const imageSrc = makeRequestURL('images/' + profilePicture);

    return (
        <li className="about__user">
            <img className="about__userPicture" src={imageSrc}
                 title={fullName} alt={fullName} />
            <div className="about__userInfo">
                <p className="about__userName">{fullName}</p>
                <p className="about__userDescription">{description}</p>
            </div>
        </li>
    );

};

export default UserInfo;