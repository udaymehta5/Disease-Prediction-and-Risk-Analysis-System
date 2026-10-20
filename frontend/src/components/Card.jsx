import React from 'react';
import './Card.css';

function Card({
  children,
  className = '',
  interactive = false,
  accent = false, // soft green surface
  as: Component = 'div',
  ...props
}) {
  const classes = [
    'vita-card',
    interactive ? 'vita-card-interactive' : '',
    accent ? 'vita-card-accent' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}

export default Card;
