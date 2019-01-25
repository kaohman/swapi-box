import React from 'react';

const Planets = (props) => {
  console.log(props.planets)
  return (
    props.planets.map(planet => {
      const { name, terrain, climate, residents } = planet;
      return (<div className='card' key={name}>
        <img className='favorite-icon' alt='favorite icon'/>
        <h3>{name}</h3>
        <p>Terrain: {terrain}</p>
        <p>Climate: {climate}</p>
        <p>Residents: 
        {
          residents.reduce((acc,resident) => {
            acc += resident + ', '
            return acc
          }, '')
        }
        </p>
      </div>)
    })
  );
}

export default Planets;