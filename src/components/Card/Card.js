import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ card, favorites, toggleFavorite }) => {
  const getResidentsList = (residents) => {
    if (typeof residents === 'string') {
      return residents
    } else {
      return residents.reduce((acc, resident, i) => {
        acc = (i === residents.length - 1) ? acc + resident : acc + resident + ', ';
        return acc
      }, '');
    }
  }
  
  let displayCard;
  switch (card.type) {
    case 'people':
      const { homeworld, species, population } = card;
      displayCard = 
        <div className='card-text-div'>
          <h3>{card.name}</h3>
          <p>Home World: {homeworld}</p>
          <p>Species: {species}</p>
          <p>Population of Home World: { parseInt(population) ? parseInt(population).toLocaleString() : population }
          </p>
        </div>
      break;
    case 'planets':
      const { terrain, climate, residents } = card;
      let residentsList = getResidentsList(residents);
      displayCard = 
        <div className='card-text-div'>
          <h3>{card.name}</h3>
          <p>Terrain: {terrain}</p>
          <p>Climate: {climate}</p>
          <p>Residents: {residentsList}</p>
        </div>
      break;
    case 'vehicles':
      const { model, vehicle_class, passengers } = card;
      displayCard = 
        <div className='card-text-div'>
          <h3>{card.name}</h3>
          <p>Model: {model}</p>
          <p>Class: {vehicle_class}</p>
          <p>Passenger Capacity: {parseInt(passengers).toLocaleString()}</p>
        </div>
      break;
    default:
      displayCard = 'Error: card case not valid';
  }

  return (
    <div className='card' id={card.id}>
      <button 
        onClick={(event) => toggleFavorite(event.target.parentElement.id)}
        className= 
        {
          favorites.includes(card.id) ? 'favorite-icon favorite' : 'favorite-icon'
        }
      ></button>
      {displayCard}
    </div>
  )
}

Card.propTypes = {
  card: PropTypes.object
}

Card.defaultProps = {
  card: {}
}

export default Card;