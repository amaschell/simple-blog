import React from 'react';

import './footer.css';

const Footer = () => (
    <footer className='footer'>
        <p className='footer__content'>
            Copyright &copy; { new Date().getFullYear() }
            <br/>
            <br/>
            Amadeus Schell, <a className='footer__email' href='mailto:ama.schell7@gmail.com'>ama.schell7@gmail.com</a>
        </p>
    </footer>
);

export default Footer;