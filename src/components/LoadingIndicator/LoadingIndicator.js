import React from 'react';

import './loadingIndicator.css';


const LoadingIndicator = (props) => (
    <div className='loadingIndicator'>
        <div className='loadingIndicator__spinner' />
        <span className='loadingIndicator__text'>
            {props.text}
        </span>
    </div>
);

export default LoadingIndicator;