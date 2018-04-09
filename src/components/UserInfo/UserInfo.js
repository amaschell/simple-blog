import React from 'react';

import './userInfo.css';
import * as requestsAndURLs from "../../config/requestsUtility";


const UserInfo = ({ user: { firstName, lastName, description, profilePicture }}) => {
    const fullName = `${firstName} ${lastName}`;
    const imageSrc = requestsAndURLs.makeImageSourceURL(profilePicture);

    return (
        <div className='userInfo'>
            <img className='userInfo__picture' src={imageSrc} title={fullName} alt={fullName} />

            <div className='userInfo__informationWrapper'>
                <p className='userInfo__name'>
                    {fullName}
                </p>
                <p className='userInfo__description'>
                    {description}
                </p>
            </div>
        </div>
    );
};

export default UserInfo;