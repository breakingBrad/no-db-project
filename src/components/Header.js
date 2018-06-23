import React from 'react';
import './Header.css';
import './pokeball-header.png';

const Header = ({ children }) => (
    <header>
        <h1>
            {children}
        </h1>
    </header>
);
export default Header;