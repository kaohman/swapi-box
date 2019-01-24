import React from 'react';

const People = (props) => {
  return (
    props.people.map(person => {
      const { name, homeworld, species, population } = person;
      return (<div className='card'>
        <img className='favorite-icon' alt='favorite icon'/>
        <h3>{name}</h3>
        <img className='card-icon' alt='given item'/>
        <p>Home World: {homeworld}</p>
        <p>Species: {species}</p>
        <p>Population of Home World: {population}</p>
      </div>)
    })
  );
}

export default People;