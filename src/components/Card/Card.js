import React from 'react';

const Card = ({ data }) => {
  const cards = data.map(card => {
    switch (card.type) {
      case 'people':
        const { homeworld, species, population } = card;
        return (
          <div>
            <h3>{card.name}</h3>
            <p>Home World: {homeworld}</p>
            <p>Species: {species}</p>
            <p>Population of Home World: {parseInt(population).toLocaleString()}</p>
          </div>
        )
      case 'planet':
        const { terrain, climate, residents } = card;
        return (
          <div>
            <h3>{card.name}</h3>
            <p>Terrain: {terrain}</p>
            <p>Climate: {climate}</p>
            <p>Residents:
            {
                residents.reduce((acc, resident) => {
                  acc += resident + ', '
                  return acc
                }, '')
              }
            </p>
          </div>
        )
      case 'vehicle':
        const { model, vehicle_class, passengers } = card;
        return (
          <div>
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
        <div className='card' key={data[i].name}>
          <img className='favorite-icon' alt='favorite icon'/>
          {card}
        </div>
      )
    })
  )
}

export default Card;