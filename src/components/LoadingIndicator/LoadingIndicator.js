import React from 'react';

import './loadingIndicator.css';


const LoadingIndicator = () => (
    <div className='loadingIndicator'>
        <div className='loadingIndicator__spinner' />
        <span className='loadingIndicator__text'>
            Loading...
        </span>
    </div>
);

export default LoadingIndicator;