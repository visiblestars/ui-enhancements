import React from 'react';

const Logo = (props) => {
  return (
    <img
      alt='Logo'
      src='static/logo.png'
      {...props}
      height={50}
      style={{backgroundColor: `#F4F6F8`, padding: `2px`}}
    />
  );
};

export default Logo;
