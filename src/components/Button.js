import React from 'react';
import './Button.css';

const Button = ({ className, type, children, ...rest }) => (
    <button {...rest} type={type} className={`pkmn-button ${ className || '' }`}>
      {children}
    </button>
);

export default Button;