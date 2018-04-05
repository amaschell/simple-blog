import React from 'react';

import './about.css';
import * as requestsAndURLs from "../../config/requestsUtility";


const UserInfo = (props) => {
    const {firstName, lastName, description, profilePicture} = props.user;
    const fullName = firstName + ' ' + lastName;
    const imageSrc = requestsAndURLs.makeImageSourceURL(profilePicture);

    return (
        <li className='about__user'>
            <img className='about__userPicture' src={imageSrc}
                 title={fullName} alt={fullName} />
            <div className='about__userInfo'>
                <p className='about__userName'>{fullName}</p>
                <p className='about__userDescription'>{description}</p>
            </div>
        </li>
    );

};

export default UserInfo;