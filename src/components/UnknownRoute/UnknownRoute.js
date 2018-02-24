import React from 'react';

import './unknownRoute.css';

const UnknownRoute = () => (
    <div className="unknownRoute">
        <span className="unknownRoute__icon">
                <i className="em em-black_heart"/>
        </span>

        <span className="unknownRoute__code">
            404
        </span>

        <p className="unknownRoute__message">
            Sorry, this page does not exist...
        </p>
    </div>
);

export default UnknownRoute;