import React from 'react';

const ControlForm = ({ getData, activeButton, favoritesCount }) => {
  const buttonLabels = ['People', 'Planets', 'Vehicles'];
  return (
    <div id='button-container'>
    {
      buttonLabels.map(label => {
        return (
          <button 
            onClick={(event) => getData(event.target.id)}
            key={label}
            id={label.toLowerCase()}
            className= {
              activeButton === label.toLowerCase() ? 'active' : 'inactive'
            }
          >{label}</button>
        )
      })
    }
      <button 

        id='favorites'
        className={activeButton === 'favorites' ? 'active' : 'inactive'}
      >
        View {favoritesCount} Favorites
      </button>
    </div>
  );
}

export default ControlForm;