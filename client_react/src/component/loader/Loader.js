import React from 'react';
import './Loader.css';

const Loader = () => (
  <div className="loader-container">
    <div className="react-spinner" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/loader.webp'})` }}></div>
  </div>
);

export default Loader;
