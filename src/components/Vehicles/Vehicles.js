import React from 'react';

const Vehicles = (props) => {
  return (
    props.vehicles.map(vehicle => {
      const { name, model, vehicle_class, passengers } = vehicle;
      return (<div className='card' key={name}>
        <img className='favorite-icon' alt='favorite icon'/>
        <h3>{name}</h3>
        <p>Model: {model}</p>
        <p>Class: {vehicle_class}</p>
        <p>Passenger Capacity: {parseInt(passengers).toLocaleString()}</p>
      </div>)
    })
  );
}

export default Vehicles;