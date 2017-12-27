import React from 'react';

import './footer.css';

const Footer = () => (
    <footer className="footer">
        <p className="footer__content">
            Copyright &copy; { new Date().getFullYear() }
        </p>
    </footer>
);

export default Footer;