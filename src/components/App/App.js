import React, { Component } from 'react';
import '../../normalize.css';
import './App.css';
import '../../main.scss';
import ControlForm from '../ControlForm/ControlForm';
import CardContainer from '../CardContainer/CardContainer';
import Landing from '../Landing/Landing';
import Loading from '../Loading/Loading';
import API from '../api/api';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 'loading',
      allCards: [],
      scrollText: {},
      favorites: [],
    }
  }

  getData = async (item) => {
    if (await this.state.allCards.findIndex(card => card.type === item) === -1) {
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
        allCards: [...this.state.allCards, ...finalData]
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
        id: person.url,
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
        id: planet.url,
        type: 'planets',
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
        id: vehicle.url,
        type: 'vehicles',
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

  toggleFavorite = (id) => {
    const { favorites } = this.state;
    let newFavorites;
    if (favorites.includes(id)) {
      newFavorites = favorites.filter(favorite => favorite !== id);
    } else {
      newFavorites = [ ...favorites, id ];
    }
    this.setState({
      favorites: newFavorites
    });
  }

  showFavorites = () => {
    this.setState({
      currentPage: 'favorites'
    });
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
    const { scrollText, currentPage, favorites, allCards } = this.state;
    const cardsToDisplay = currentPage === 'favorites' ? allCards.filter(card => favorites.includes(card.id)) : allCards.filter(card => card.type === currentPage);
    let contentToDisplay;
    if (currentPage === 'landing') {
      contentToDisplay = <Landing {...scrollText} />;
    } else if (currentPage === 'loading') {
      contentToDisplay = <Loading />
    } else {
      contentToDisplay = 
      <CardContainer 
        cards={cardsToDisplay} 
        favorites={favorites}
        toggleFavorite={this.toggleFavorite}
        currentPage={currentPage}
      />;
    }
    return (
      <div>
        <h1>SWAPI BOX</h1>
        <h2>a star wars api app - select a category</h2>
        <ControlForm 
          activeButton={currentPage} 
          getData={this.getData} 
          favoritesCount={favorites.length}
          showFavorites={this.showFavorites}
        />
        {contentToDisplay}
      </div>
    );
  }
}

export default App;
