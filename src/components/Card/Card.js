import React from 'react';

const Card = (props) => {
  return (
    <div className='card'>
      <img className='favorite-icon' alt='favorite icon'/>
      <h3>NAME HERE</h3>
      <img className='card-icon' alt='given item'/>
      <p>Other text here</p>
    </div>
  );
}

export default Card;