import React from 'react';
import './Container.css';

function Container({ children, className = '', id, style }) {
  return (
    <div id={id} className={`vita-container ${className}`} style={style}>
      {children}
    </div>
  );
}

export default Container;
