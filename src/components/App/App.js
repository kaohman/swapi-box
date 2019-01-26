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
      currentPage: 'loading',
      scrollText: {},
      favorites: [],
      people: [],
      planets: [],
      vehicles: []
    }
  }

  getData = async (item) => {
    if (this.state[item].length === 0) {
      this.setState({
        currentPage: 'loading'
      });
      const results = await API.fetchData(`https://swapi.co/api/${item}`);
      const allData = await this.getNextPageData(results);
      let finalData;
      switch (item) {
        case 'people':
          finalData = await this.getPeopleData(allData);
          break;
        case 'planets':
          finalData = await this.getPlanetData(allData);
          break;
        case 'vehicles':
          finalData = await this.getVehicleData(allData);
          break;
        default:
          console.log('Error: case is not valid');
      }
      this.setState({
        [item]: finalData,
      });
    } 
    this.setState({
      currentPage: item
    });
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

  getPeopleData = async (data) => {
    const unresolvedPromises = data.map(async person => {
      const homeworld = await this.getHomeworld(person.homeworld);
      const species = typeof person.species === 'string' ? await this.getSpecies(person.species) : 'unknown';
      return {
        type: 'people',
        name: person.name,
        homeworld: homeworld[0],
        population: homeworld[1],
        species
      }
    });
    return await Promise.all(unresolvedPromises);
  }

  getPlanetData = async (data) => {
    const unresolvedPromises = data.map(async planet => {
      const residents = planet.residents.length > 0 ? await this.getResidents(planet.residents) : 'none';
      return {
        type: 'planet',
        name: planet.name,
        terrain: planet.terrain,
        climate: planet.climate,
        residents 
      }
    });
    return await Promise.all(unresolvedPromises);
  }

  getVehicleData = async (data) => {
    const unresolvedPromises = data.map(async vehicle => {
      return {
        type: 'vehicle',
        name: vehicle.name,
        model: vehicle.model,
        vehicle_class: vehicle.vehicle_class,
        passengers: vehicle.passengers
      }
    });
    return await Promise.all(unresolvedPromises);
  }

  getHomeworld = async (url) => {
    const result = await API.fetchData(url);
    return [result.name, result.population]
  }

  getSpecies = async (url) => {
    const result = await API.fetchData(url);
    return result.name
  }

  getResidents = async (urls) => {
    const unresolvedPromises = urls.map(async url => {
      const result = await API.fetchData(url);
      return result.name
    });
    return await Promise.all(unresolvedPromises);
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
        currentPage: 'landing'
      });
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    const { scrollText, currentPage, favorites } = this.state;
    let contentToDisplay;
    if (currentPage === 'landing') {
      contentToDisplay = <Landing {...scrollText} />;
    } else if (currentPage === 'loading') {
      contentToDisplay = 
        <div>
          <h3 id='loading-text'>Loading data... I find your lack of faith disturbing</h3>
          <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    } else {
      contentToDisplay = <CardContainer cards={this.state[currentPage]} />;
    }
    return (
      <div>
        <h1>SWAPI BOX</h1>
        <h2>a star wars api app - select a category</h2>
        <ControlForm activeButton={currentPage} getData={this.getData} favoritesCount={favorites.length}/>
        {contentToDisplay}
      </div>
    );
  }
}

export default App;
