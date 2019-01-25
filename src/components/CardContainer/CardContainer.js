import React from 'react';
import People from '../People/People';
import Planets from '../Planets/Planets'

const CardContainer = ({ currentPage, cards }) => {
  let cardsToDisplay;
  switch (currentPage) {
    case 'people':
      cardsToDisplay = <People people={cards} />
      break;
    case 'planets':
      cardsToDisplay = <Planets planets={cards} />
      break;
    // case 'vehicles':
    //   cardsToDisplay = <Vehicles vehicles={cards} />
    //   break;
    default:
      console.log('Error: card case not valid');
  }

  return (
    <div id='card-container'>
      {cardsToDisplay}
    </div>
  );
}

export default CardContainer;