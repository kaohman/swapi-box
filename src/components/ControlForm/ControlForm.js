import React from 'react';
import PropTypes from 'prop-types';

const ControlForm = ({ getData, activeButton, favoritesCount, showFavorites }) => {
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
              activeButton === label.toLowerCase() ? 'control-button active' : 'control-button inactive'
            }
          >{label}</button>
        )
      })
    }
      <button 
        onClick={(event) => showFavorites(event.target.id)}
      id='favorites'
        className={activeButton === 'favorites' ? 'control-button active' : 'control-button inactive'}
      >
        View {favoritesCount} Favorites
      </button>
    </div>
  );
}

ControlForm.propTypes = {
  activeButton: PropTypes.string,
  getData: PropTypes.func,
  favoritesCount: PropTypes.number
}

ControlForm.defaultProps = {
  activeButton: 'DEFAULT',
  getData: 'NO FUNCTION PASSED',
  favoritesCount: 0
}

export default ControlForm;