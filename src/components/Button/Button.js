import React, { Component } from 'react';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div id='button-container'>
        <button>Characters</button>
        <button>Planets</button>
        <button>Vehicles</button>
        <button>Favorites</button>
      </div>
    );
  }
}

export default Button;