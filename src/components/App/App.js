import React, { Component } from 'react';
import '../../normalize.css';
import './App.css';
import '../../main.scss';
import ControlForm from '../ControlForm/ControlForm';
import CardContainer from '../CardContainer/CardContainer';
import Landing from '../Landing/Landing';

class App extends Component {
  constructor() {
    super();
    this.state = {
      landing: true,
      loaded: false,
      scrollText: {},
      favorites: [],
      people: [],
      planets: [],
      vehicles: []
    }
  }

  getPeopleData = async (item) => {
    try {
      const response = await fetch(`https://swapi.co/api/${item}`)
      const results = await response.json();
      const unresolvedPromises = await results.results.map(async person => {
        const homeworld = await this.getName(person.homeworld);
        const species = await this.getName(person.species);
        return {
          name: person.name,
          homeworld,
          species
        }
      });
      const people = await Promise.all(unresolvedPromises);
      console.log(people);
      this.setState({
        people,
        landing: false
      });
    } catch (error) {
      console.log(error);
    }
  }

  getName = async (url) => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      return result.name
    } catch (error) {
      console.log(error);
    }
  }

  getFavorites = () => {

  }

  componentDidMount = async () => {
    let filmId = Math.floor(Math.random() * 7)+1;
    try {
      const response = await fetch(`https://swapi.co/api/films/${filmId}`);
      const result = await response.json();
      const { opening_crawl, title, release_date } = result;
      this.setState({
        scrollText: { 
          text: opening_crawl,
          title: title,
          date: release_date,
          favorites: []
        },
        loaded: true
      });
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    const { scrollText, landing, loaded, favorites, people } = this.state;
    if (loaded) {
      return (
        <div>
          <h1>SWAPI-BOX</h1>
          <ControlForm getData={this.getPeopleData} favoritesCount={favorites.length}/>
          {
            landing ? 
            <Landing {...scrollText} /> : 
            <CardContainer people={people}/>
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
