import React from 'react';
import './SectionHeading.css';

function SectionHeading({
  number,        // e.g. "02", "03"
  title,         // e.g. "How it works"
  subtitle,      // optional plain-language description
  className = ''
}) {
  return (
    <div className={`section-heading ${className}`}>
      {number && <span className="section-number mono-num">{number} —</span>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}

export default SectionHeading;
