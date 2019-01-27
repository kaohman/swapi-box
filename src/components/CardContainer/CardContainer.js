import React from 'react';
import Card from '../Card/Card';
import PropTypes from 'prop-types';

const CardContainer = ({cards, favorites, toggleFavorite, currentPage, show10, toggleShownCards}) => {
  const cardsToDisplay = show10 === true ? cards.splice(0, 10) : cards;

  if (currentPage === 'favorites' && favorites.length === 0) {
    return (
      <div className='no-cards-container'>
        <img className='star-wars-images' src={require('../../images/yoda.png')} alt='yoda' />
        <h3 className='no-cards-text'>Any favorites right now you have not.</h3>
      </div>
    )
  } else {
    return (
      <div id='card-container'>
        {
          cardsToDisplay.map(card => {
            return(
              <Card
                card={card}
                toggleFavorite={toggleFavorite}
                favorites={favorites}
                key={card.id}
              />
            )
          })
        }
        <div id='show-button-div'>
          <button id='show-button' onClick={() => toggleShownCards()} disabled={cards.length <= 10 ? true : false}>
            {show10 === true ? 'Show More' : 'Show Less'}
          </button>
        </div>
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