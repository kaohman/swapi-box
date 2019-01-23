import React, { Component } from 'react';
import '../../normalize.css';
import './App.css';
import '../../main.scss';
import Button from '../Button/Button';
import CardContainer from '../CardContainer/CardContainer';
import Landing from '../Landing/Landing';

class App extends Component {
  constructor() {
    super();
    this.state = {
      landing: true,
      loaded: false,
      scrollText: {}
    }
  }

  componentDidMount = () => {
    let filmId = Math.floor(Math.random() * 7)+1;
    fetch(`https://swapi.co/api/films/${filmId}`)
      .then(data => data.json())
      .then(results => {
        const { opening_crawl, title, release_date } = results;
        this.setState({
          scrollText: { 
            text: opening_crawl,
            title: title,
            date: release_date,
          },
          loaded: true
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { scrollText, landing, loaded } = this.state;
    if (loaded) {
      return (
        <div>
          <h1>SWAPI-BOX</h1>
          <Button />
          {
            landing ? 
            <Landing {...scrollText} /> : 
            <CardContainer />
          }
        </div>
      );
    } else {
      return (
        <h1>LOADING...</h1>
      );
    }
  }
}

export default App;
