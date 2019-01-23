import React, { Component } from 'react';
import '../../normalize.css';
import './App.css';
import '../../main.scss';
import Button from '../Button/Button';
import CardContainer from '../CardContainer/CardContainer';

class App extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <h1>SWAPI-BOX</h1>
        <Button />
        <CardContainer />
      </div>
    );
  }
}

export default App;
