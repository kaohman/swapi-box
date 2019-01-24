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
      currentPage: 'landing',
      loaded: false,
      scrollText: {},
      favorites: [],
      people: [],
      planets: [],
      vehicles: []
    }
  }

  getPeopleData = async (item) => {
    if (this.state.people.length === 0) {
      try {
        const response = await fetch(`https://swapi.co/api/${item}`)
        let results = await response.json();
        const allPeople = await this.getNextPageData(results);
        const unresolvedPromises = await allPeople.map(async person => {
          const homeworld = await this.getHomeworld(person.homeworld);
          const species = await this.getSpecies(person.species);
          return {
            name: person.name,
            homeworld: homeworld[0],
            population: homeworld[1],
            species
          }
        });
        const people = await Promise.all(unresolvedPromises);
        this.setState({
          people,
          currentPage: item
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  getNextPageData = async (prevResults) => {
    let allResults = prevResults.results;
    do {
      const response = await fetch(prevResults.next);
      let results = await response.json();
      allResults = await allResults.concat(results.results);
      prevResults = results;
    } while (prevResults.next);
    return allResults
  }

  getHomeworld = async (url) => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      return [result.name, result.population]
    } catch (error) {
      console.log(error);
    }
  }

  getSpecies = async (url) => {
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
    const { scrollText, currentPage, loaded, favorites, people } = this.state;
    if (loaded) {
      return (
        <div>
          <h1>SWAPI-BOX</h1>
          <ControlForm getData={this.getPeopleData} favoritesCount={favorites.length}/>
          {
            currentPage === 'landing' ? 
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
