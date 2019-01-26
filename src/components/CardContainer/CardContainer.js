import React from 'react';
import Card from '../Card/Card';
import PropTypes from 'prop-types';

const CardContainer = ({cards, favorites, toggleFavorite, currentPage}) => {
  if (currentPage === 'favorites' && favorites.length === 0) {
    return <h3 id='loading-text'>Any favorites right now you have not.</h3>
  } else {
    return (
      <div id='card-container'>
        <Card 
          data={cards} 
          toggleFavorite={toggleFavorite} 
          favorites={favorites}
        />
      </div>
    )
  }
}

CardContainer.propTypes = {
  cards: PropTypes.array
}

CardContainer.defaultProps = {
  cards: []
}

export default CardContainer;