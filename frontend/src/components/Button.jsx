import React from 'react';
import './Button.css';

function Button({
  children,
  variant = 'outline', // 'filled' (green) | 'outline' (white/dark surface)
  size = 'default',     // 'default' | 'sm' | 'lg'
  className = '',
  as: Component = 'button',
  ...props
}) {
  const variantClass = variant === 'filled' ? 'btn-filled' : 'btn-outline';
  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';

  return (
    <Component
      className={`vita-btn ${variantClass} ${sizeClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Button;
