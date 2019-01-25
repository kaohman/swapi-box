import React from 'react';
import Card from '../Card/Card';

const CardContainer = (props) => {
  return (
    <div id='card-container'>
      <Card data={props.cards} />
    </div>
  );
}

export default CardContainer;