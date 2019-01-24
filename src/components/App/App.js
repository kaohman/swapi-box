import React, { Component } from 'react';
import '../../normalize.css';
import './App.css';
import '../../main.scss';
import ControlForm from '../ControlForm/ControlForm';
import CardContainer from '../CardContainer/CardContainer';
import Landing from '../Landing/Landing';
import API from '../api/api';

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

  getData = async (item) => {
    if (this.state[item].length === 0) {
      const results = await API.fetchData(`https://swapi.co/api/${item}`);
      // const allData = await this.getNextPageData(results);
      const unresolvedPromises = await this.getPeopleData(results.results);
      const finalData = await Promise.all(unresolvedPromises);
      this.setState({
        [item]: finalData,
        currentPage: item
      });
    } 
  }

  getNextPageData = async (prevResults) => {
    let allResults = prevResults.results;
    do {
      const results = await API.fetchData(prevResults.next);
      allResults = await allResults.concat(results.results);
      prevResults = results;
    } while (prevResults.next);
    return allResults
  }

  getPeopleData = (data) => {
    return data.map(async person => {
      const homeResult = await API.fetchData(person.homeworld);
      const homeworld = [homeResult.name, homeResult.population];
      const speciesResult = await API.fetchData(person.species);
      const species = speciesResult.name;
      return {
        name: person.name,
        homeworld: homeworld[0],
        population: homeworld[1],
        species
      }
    });
  }

  getPlanetData = (data) => {

  }

  getVehicleData = (data) => {
    
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
          <ControlForm getData={this.getData} favoritesCount={favorites.length}/>
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
