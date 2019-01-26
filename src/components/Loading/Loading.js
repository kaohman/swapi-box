import React from 'react';

const Loading = () => {
  return(
    <div>
      <h3 id='loading-text'>Loading data... I find your lack of faith disturbing</h3>
      <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      <img id='darth-vader-img' src={require('../../images/darth-vader.png')} alt='darth vader' />
    </div>
  )
}

export default Loading;