import React from 'react';

const Loading = () => {
  return(
    <div className='no-cards-container'>
      <img className='star-wars-images' src={require('../../images/darth-vader.png')} alt='darth vader' />
      <h3 className='no-cards-text'>Loading data... I find your lack of faith disturbing</h3>
      <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default Loading;