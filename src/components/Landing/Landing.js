import React from 'react';

const Landing = ({ text, title, date }) => {

  return (
    <div id='landing-container'>
      <h3>{text}</h3>
      <h3>- {title}</h3>
      <h3>- {date}</h3>
      <h4>SELECT A CATEGORY</h4>
    </div>
  );
}



export default Landing;