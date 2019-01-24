import React from 'react';
import People from '../People/People';

const CardContainer = (props) => {
  return (
    <div id='card-container'>
      <People people={props.people} />
    </div>
  );
}

export default CardContainer;