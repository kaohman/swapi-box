import React from 'react';
import Card from '../Card/Card';
import PropTypes from 'prop-types';

const CardContainer = ({cards, favorites, toggleFavorite}) => {
  return (
    <div id='card-container'>
      <Card 
        data={cards} 
        toggleFavorite={toggleFavorite} 
        favorites={favorites}
      />
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