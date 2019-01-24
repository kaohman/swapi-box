import React from 'react';

const People = (props) => {
  return (
    props.people.map(person => {
      const { name, homeworld, species, population } = person;
      return (<div className='card' key={name}>
        <img className='favorite-icon' alt='favorite icon'/>
        <h3>{name}</h3>
        <p>Home World: {homeworld}</p>
        <p>Species: {species}</p>
        <p>Population of Home World: {parseInt(population).toLocaleString()}</p>
      </div>)
    })
  );
}

export default People;