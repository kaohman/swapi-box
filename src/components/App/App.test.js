import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import API from '../api/api';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('App', () => {
  describe('defaults', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<App />);

      wrapper.setState({
        currentPage: 'landing',
        scrollText: {},
        favorites: [],
        allCards: []
      })
    });

    it('should match the snapshot with all data passed in', () => {
      expect(wrapper).toMatchSnapshot();
    });
  
    it('should have a default state', () => {
      expect(wrapper.state()).toEqual({
        currentPage: 'landing',
        scrollText: {},
        favorites: [],
        allCards: []
      })
    });
  });

  describe('getData', () => {
    let wrapper;
    let item;
    let mockPeople;
    let mockPlanets;
    let mockVehicles;

    beforeEach(() => {
      item = 'people';
      mockPeople = { results: [{ id: 'https://swapi.co/api/people/3/', type: 'people', name: 'R2D2', homeworld: 'basement', population: '5000', species: 'droid' }, { id: 'https://swapi.co/api/people/1/', type: 'people', name: 'Luke Skywalker', homeworld: 'Tatooine', population: '2000', species: 'human' }]};
      API.fetchData = jest.fn().mockImplementation(() => {
        return mockPeople
      });
      mockPlanets = { results: [{ id:'https://swapi.co/api/planets/1/', type:'planets', name: 'Alderaan', climate: 'temperate', residents: ['Karin', 'Luke Skywalker'], terrain: 'grasslands, mountains'}]};
      mockVehicles = { results: [{ id:'https://swapi.co/api/vehicles/1/', type: 'vehicles', class: 'repulsorcraft', model: 'T-16 skyhopper', name:'T-16 skyhopper', passengers:'1'}]};
      wrapper = shallow(<App />);
      wrapper.setState({
        currentPage: 'loading',
        allData: []
      })
      wrapper.instance().getPeopleData = jest.fn().mockImplementation(() => {
        return mockPeople.results
      });
      wrapper.instance().getPlanetData = jest.fn().mockImplementation(() => {
        return mockPlanets.results
      });
      wrapper.instance().getVehicleData = jest.fn().mockImplementation(() => {
        return mockVehicles.results
      });
      wrapper.instance().getNextPageData = jest.fn().mockImplementation(() => {
        return mockPeople.results
      });
    });

    it('should call fetchData with the correct parameters', async () => {
      // setup
      const expected = 'https://swapi.co/api/people';
      // execution 
      await wrapper.instance().getData(item);
      // expectation
      expect(API.fetchData).toHaveBeenCalledWith(expected);
    });

    it('should be able to call getPeopleData with the correct parameters', async () => {
      // setup
      const expected = mockPeople.results;
      // execution 
      await wrapper.instance().getData(item);
      // expectation
      expect(wrapper.instance().getPeopleData).toHaveBeenCalledWith(expected);
    });

    it('should be able to call getPlanetData with the correct parameters', async () => {
      // setup
      item = 'planets';
      API.fetchData = jest.fn().mockImplementation(() => {
        return mockPlanets
      });
      wrapper.instance().getNextPageData = jest.fn().mockImplementation(() => {
        return mockPlanets.results
      });
      const expected = mockPlanets.results;
      // execution 
      await wrapper.instance().getData(item);
      // expectation
      expect(wrapper.instance().getPlanetData).toHaveBeenCalledWith(expected);
    });

    it('should be able to call getVehicleData with the correct parameters', async () => {
      // setup
      item = 'vehicles';
      const expected = mockVehicles.results;
      API.fetchData = jest.fn().mockImplementation(() => {
        return mockVehicles
      });
      wrapper.instance().getNextPageData = jest.fn().mockImplementation(() => {
        return mockVehicles.results
      });
      // execution 
      await wrapper.instance().getData(item);
      // expectation
      expect(wrapper.instance().getVehicleData).toHaveBeenCalledWith(expected);
    });

    it('should update state with new data', async () => {
      // setup
      item = 'people';
      API.fetchData = jest.fn().mockImplementation(() => {
        return mockPeople
      });
      wrapper.instance().getNextPageData = jest.fn().mockImplementation(() => {
        return mockPeople.results
      });
      const expected = mockPeople.results;
      // execution 
      await wrapper.instance().getData(item);
      // expectation
      expect(wrapper.state('allCards')).toEqual(expected);
      expect(wrapper.state('currentPage')).toEqual('people');
    });
  });

  describe('getNextPageData', () => {
    let wrapper;
    let mockPrevResults;
    let mockFetchResults;

    beforeEach(() => {
      mockPrevResults = { next:'https://swapi.co/api/people/?page=2', results: [{ name: 'Luke Skywalker', homeworld: 'https://swapi.co/api/planets/1/', species: 'https://swapi.co/api/species/1/' }]};
      mockFetchResults = { results: [{ name: 'C-3PO', homeworld: 'https://swapi.co/api/planets/1/', species: 'https://swapi.co/api/species/2/' }] };
      wrapper = shallow(<App />);
      API.fetchData = jest.fn().mockImplementation(() => {
        return mockFetchResults
      });
    });

    it('should call fetch with the correct parameters', async () => {
      // setup
      const expected = mockPrevResults.next;
      // execution 
      await wrapper.instance().getNextPageData(mockPrevResults);
      // expectation
      expect(API.fetchData).toHaveBeenCalledWith(expected);
    });

    it('should return results from all the fetch calls', async () => {
      // setup
      const expected = mockPrevResults.results.concat(mockFetchResults.results);
      // execution 
      const result = await wrapper.instance().getNextPageData(mockPrevResults);
      // expectation
      expect(result).toEqual(expected);
    });
  });

  describe('getPeopleData', () => {
    let wrapper;
    let mockData;
    let mockHomeworld;
    let mockSpecies;

    beforeEach(() => {
      mockData = [{ 
        url:'https://swapi.co/api/people/3/', 
        type: 'people', 
        name: 'Luke Skywalker', 
        homeworld: 'https://swapi.co/api/planets/1/', 
        species: 'https://swapi.co/api/species/1/' 
      }];
      mockHomeworld = ['Tatooine', '200000'];
      mockSpecies = 'Human';
      wrapper = shallow(<App />);
      wrapper.instance().getHomeworld = jest.fn().mockImplementation(() => {
        return mockHomeworld
      });
      wrapper.instance().getSpecies = jest.fn().mockImplementation(() => {
        return mockSpecies
      });
    });

    it('should call getHomeworld with the correct parameters', async () => {
      // setup
      const expected = 'https://swapi.co/api/planets/1/';
      // execution 
      await wrapper.instance().getPeopleData(mockData);
      // expectation
      expect(wrapper.instance().getHomeworld).toHaveBeenCalledWith(expected);
    });

    it('should call getSpecies with the correct parameters', async () => {
      // setup
      const expected = 'https://swapi.co/api/species/1/';
      // execution 
      await wrapper.instance().getPeopleData(mockData);
      // expectation
      expect(wrapper.instance().getSpecies).toHaveBeenCalledWith(expected);
    });

    it('should return an array of people objects', async () => {
      // setup
      const expected = [{ id:'https://swapi.co/api/people/3/', homeworld: 'Tatooine', name: 'Luke Skywalker', population: '200000', species: 'Human', type: 'people' }];
      // execution
      const result = await wrapper.instance().getPeopleData(mockData);
      // expectation
      expect(result).toEqual(expected);
    });
  });

  describe('getPlanetData', () => {
    let wrapper;
    let mockData;
    let mockResidents;

    beforeEach(() => {
      mockData = [{
        url:'https://swapi.co/api/planets/2/', 
        type: 'planets', 
        name: 'Alderaan', 
        climate: 'temperate', 
        residents: ['https://swapi.co/api/people/5/', 'https://swapi.co/api/people/68/', 'https://swapi.co/api/people/81/'], terrain: 'grasslands, mountains' 
      }];
      mockResidents = ['Leia Organa', 'Bail Prestor Organa', 'Raymus Antilles'];
      wrapper = shallow(<App />);
      wrapper.instance().getResidents = jest.fn().mockImplementation(() => {
        return mockResidents
      });
    });

    it('should call getResidents with the correct parameters', async () => {
      // setup
      const expected = ['https://swapi.co/api/people/5/', 'https://swapi.co/api/people/68/', 'https://swapi.co/api/people/81/'];
      // execution 
      await wrapper.instance().getPlanetData(mockData);
      // expectation
      expect(wrapper.instance().getResidents).toHaveBeenCalledWith(expected);
    });

    it('should return an array of planet objects', async () => {
      // setup
      const expected = [{ id: 'https://swapi.co/api/planets/2/', climate: 'temperate', name: 'Alderaan', residents: ['Leia Organa', 'Bail Prestor Organa', 'Raymus Antilles'], terrain: 'grasslands, mountains', type: 'planets' }];
      // execution
      const result = await wrapper.instance().getPlanetData(mockData);
      // expectation
      expect(result).toEqual(expected);
    });
  });

  describe('getVehicleData', () => {
    let wrapper;
    let mockData;

    beforeEach(() => {
      mockData = [{
        url: 'https://swapi.co/api/vehicles/2/',
        name: 'Sand Crawler',
        model: 'Digger Crawler',
        passengers: '30',
        vehicle_class: 'wheeled',
      }];
      wrapper = shallow(<App />);
    });

    it('should return an array of vehicle objects', async () => {
      // setup
      const expected = [{
        id: 'https://swapi.co/api/vehicles/2/',
        name: 'Sand Crawler',
        model: 'Digger Crawler',
        passengers: '30',
        vehicle_class: 'wheeled',
        type: 'vehicles'
      }];
      // execution
      const result = await wrapper.instance().getVehicleData(mockData);
      // expectation
      expect(result).toEqual(expected);
    });
  });

  describe('getHomeworld', () => {
    let wrapper;
    let mockData;
    let url;

    beforeEach(() => {
      mockData = {name: 'Tatooine', population: '200000'};
      url = 'https://swapi.co/api/planets/1/';
      API.fetchData = jest.fn().mockImplementation(() => {
        return mockData
      });
      wrapper = shallow(<App />);
    });

    it('should call fetch with the correct parameters', async () => {
      // setup
      const expected = url;
      // execution 
      await wrapper.instance().getHomeworld(url);
      // expectation
      expect(API.fetchData).toHaveBeenCalledWith(expected);
    });

    it('should return an array with homeworld name and population', async () => {
      // setup
      const expected = ['Tatooine', '200000'];
      // execution 
      const result = await wrapper.instance().getHomeworld(url);
      // expectation
      expect(result).toEqual(expected);
    });
  });

  describe('getSpecies', () => {
    let wrapper;
    let mockData;
    let url;

    beforeEach(() => {
      mockData = { name: 'Human' };
      url = 'https://swapi.co/api/species/1/';
      API.fetchData = jest.fn().mockImplementation(() => {
        return mockData
      });
      wrapper = shallow(<App />);
    });

    it('should call fetch with the correct parameters', async () => {
      // setup
      const expected = url;
      // execution 
      await wrapper.instance().getSpecies(url);
      // expectation
      expect(API.fetchData).toHaveBeenCalledWith(expected);
    });

    it('should return a string with the species name', async () => {
      // setup
      const expected = 'Human';
      // execution 
      const result = await wrapper.instance().getSpecies(url);
      // expectation
      expect(result).toEqual(expected);
    });
  });

  describe('getResidents', () => {
    let wrapper;
    let mockData;
    let urls;

    beforeEach(() => {
      mockData = { name: 'Leia Organa' };
      urls = ['https://swapi.co/api/people/5/', 'https://swapi.co/api/people/5/'];
      API.fetchData = jest.fn().mockImplementation(() => {
        return mockData
      });
      wrapper = shallow(<App />);
    });

    it('should call fetch with the correct parameters', async () => {
      // setup
      const expected = urls[0];
      // execution 
      await wrapper.instance().getResidents(urls);
      // expectation
      expect(API.fetchData).toHaveBeenCalledWith(expected);
    });

    it('should return an array with all residents', async () => {
      // setup
      const expected = ['Leia Organa', 'Leia Organa'];
      // execution 
      const result = await wrapper.instance().getResidents(urls);
      // expectation
      expect(result).toEqual(expected);
    });
  });

  describe('toggleFavorite', () => {
    let wrapper;
    let mockId;

    beforeEach(() => {
      mockId = 'https://swapi.co/api/people/5/';
      wrapper = shallow(<App />);

      wrapper.setState({
        favorites: []
      })
    });

    it('should be able to add favorite to favorites array in state', () => {
      // setup
      const expected = ['https://swapi.co/api/people/5/'];
      // execution
      wrapper.instance().toggleFavorite(mockId);
      // expectation
      expect(wrapper.state('favorites')).toEqual(expected);
    });

    it('should be able to remove favorite from favorites array in state', () => {
      const expected = [];
      // execution
      wrapper.instance().toggleFavorite(mockId);
      wrapper.instance().toggleFavorite(mockId);
      // expectation
      expect(wrapper.state('favorites')).toEqual(expected);
    });
  });

  describe('showFavorites', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<App />);
      wrapper.instance().getData = jest.fn();
      wrapper.setState({
        currentPage: 'loading'
      })
    });

    it('should call getData three times', async () => {
      // setup
      const expected = 3;
      // execution
      await wrapper.instance().showFavorites();
      // expectation
      expect(wrapper.instance().getData.mock.calls.length).toBe(expected);
    });

    it('should update currentPage to favorites in state', async () => {
      // setup
      const expected = 'favorites';
      // execution
      await wrapper.instance().showFavorites();
      // expectation
      expect(wrapper.state('currentPage')).toEqual(expected);
    });
  });

  describe('componentDidMount', () => {
    let wrapper;
    let mockData;
    let url;

    beforeEach(() => {
      url = 'https://swapi.co/api/films/1/';
      mockData = { opening_crawl: 'test text', title: 'star wars movie', release_date: '2005-11-20'};
      wrapper = shallow(<App />);
      API.fetch = jest.fn().mockImplementation(() => {
        return mockdata
      });
      wrapper.setState({
        currentPage: 'loading',
        scrollText: {},
      })
    });

    it.skip('should call fetch with the correct parameters', async () => {
      // setup
      const expected = url;
      // execution 
      await wrapper.instance().componentDidMount();
      // expectation
      expect(API.fetchData).toHaveBeenCalledWith(expected);
    });

    it('should get favorites from local storage and set them to state', async () => {
      // setup
      const expected = ['https://swapi.co/api/people/5/'];
      localStorage.setItem('favorites', JSON.stringify(expected));
      // execution 
      await wrapper.instance().componentDidMount()
      // expectation
      expect(wrapper.state('favorites')).toEqual(expected);
    });

    it.skip('should update default scrollText and currentPage in state', async () => {
      // execution 
      await wrapper.instance().componentDidMount();
      // expectation
      expect(wrapper.state('scrollText')).toEqual({
        text: 'test text',
        title: 'star wars movie',
        date: '2005-11-20'
      });
      expect(wrapper.state('currentPage')).toEqual('landing');
    });
  });
});
