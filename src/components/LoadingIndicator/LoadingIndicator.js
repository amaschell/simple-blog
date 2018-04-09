import React from 'react';

import './loadingIndicator.css';


const LoadingIndicator = ( { text } ) => (
    <div className='loadingIndicator'>
        <div className='loadingIndicator__spinner' />
        <span className='loadingIndicator__text'>
            {text}
        </span>
    </div>
);

export default LoadingIndicator;