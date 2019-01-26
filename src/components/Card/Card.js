import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ data, favorites, toggleFavorite }) => {
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
  
  const cards = data.map(card => {
    switch (card.type) {
      case 'people':
        const { homeworld, species, population } = card;
        return (
          <div className='card-text-div'>
            <h3>{card.name}</h3>
            <p>Home World: {homeworld}</p>
            <p>Species: {species}</p>
            <p>Population of Home World: { parseInt(population) ? parseInt(population).toLocaleString() : population }
            </p>
          </div>
        )
      case 'planets':
        const { terrain, climate, residents } = card;
        let residentsList = getResidentsList(residents);
        return (
          <div className='card-text-div'>
            <h3>{card.name}</h3>
            <p>Terrain: {terrain}</p>
            <p>Climate: {climate}</p>
            <p>Residents: {residentsList}</p>
          </div>
        )
      case 'vehicles':
        const { model, vehicle_class, passengers } = card;
        return (
          <div className='card-text-div'>
            <h3>{card.name}</h3>
            <p>Model: {model}</p>
            <p>Class: {vehicle_class}</p>
            <p>Passenger Capacity: {parseInt(passengers).toLocaleString()}</p>
          </div>
        )
      default:
        return('Error: card case not valid');
    }
  });

  return (
    cards.map((card, i) => {
      return (
        <div className='card' key={data[i].id} id={data[i].id}>
          <button 
            onClick={(event) => toggleFavorite(event.target.parentElement.id)}
            className= 
            {
              favorites.includes(data[i].id) ? 'favorite-icon favorite' : 'favorite-icon'
            }
          ></button>
          {card}
        </div>
      )
    })
  )
}

Card.propTypes = {
  data: PropTypes.array
}

Card.defaultProps = {
  data: []
}

export default Card;