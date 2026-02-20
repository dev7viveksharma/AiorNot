import React from 'react';
import '../Style/OrDivider.css'; // Import the CSS file

const OrDivider = () => {
  return (
    <div className="divider-container">
      <div className="divider-line" />
      <span className="divider-text">OR</span>
      <div className="divider-line" />
    </div>
  );
};

export default OrDivider;
