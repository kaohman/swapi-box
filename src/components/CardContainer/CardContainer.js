import React from 'react';
import Card from '../Card/Card';
import PropTypes from 'prop-types';

const CardContainer = (props) => {
  return (
    <div id='card-container'>
      <Card data={props.cards} />
    </div>
  );
}

CardContainer.propTypes = {
  cards: PropTypes.array
}

CardContainer.defaultProps = {
  cards: []
}

export default CardContainer;