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
        loaded: false,
        scrollText: {},
        favorites: [],
        people: [],
        planets: [],
        vehicles: []
      })
    });

    it('should match the snapshot with all data passed in', () => {
      expect(wrapper).toMatchSnapshot();
    });
  
    it('should have a default state', () => {
      expect(wrapper.state()).toEqual({
        currentPage: 'landing',
        loaded: false,
        scrollText: {},
        favorites: [],
        people: [],
        planets: [],
        vehicles: []
      })
    });
  });

  describe('getData', () => {
    let wrapper;
    let item;
    let mockPeople;

    beforeEach(() => {
      item = 'people';
      mockPeople = {results: [{ name: 'R2D2', homeworld: 'basement', population: '5000', species: 'droid' }, { name: 'Luke Skywalker', homeworld: 'Tatooine', population: '2000', species: 'human' }]};
      API.fetchData = jest.fn().mockImplementation(() => {
        return mockPeople
      });
      wrapper = shallow(<App />);
      wrapper.setState({
        currentPage: 'landing',
        people: [],
      })
      wrapper.instance().getPeopleData = jest.fn().mockImplementation(() => {
        return mockPeople.results
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

    // it('should be able to call getPlanetData with the correct parameters', () => {

    // });

    // it('should be able to call getVehicleData with the correct parameters', () => {

    // });

    it('should update state with new data', async () => {
      // setup
      const expected = mockPeople.results;
      // execution 
      await wrapper.instance().getData(item);
      // expectation
      expect(wrapper.state('people')).toEqual(expected);
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
      mockData = [{ name: 'Luke Skywalker', homeworld: 'https://swapi.co/api/planets/1/', species: 'https://swapi.co/api/species/1/' }];
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
      const expected = mockData.homeworld;
      // execution 
      await wrapper.instance().getHomeworld(mockData.homeworld);
      // expectation
      expect(wrapper.instance().getHomeworld).toHaveBeenCalledWith(expected);
    });

    it('should call getSpecies with the correct parameters', async () => {
      // setup
      const expected = mockData.species;
      // execution 
      await wrapper.instance().getSpecies(mockData.species);
      // expectation
      expect(wrapper.instance().getSpecies).toHaveBeenCalledWith(expected);
    });

    it('should return an array of people objects', async () => {
      // setup
      const expected = [{ name: 'Luke Skywalker', homeworld: 'Tatooine', population: '200000', species: 'Human' }];
      // execution
      const result = await wrapper.instance().getPeopleData(mockData);
      // expectation
      expect(result).toEqual(expected);
    });
  });

  // describe('getPlanetData', () => {

  // });

  // describe('getVehicleData', () => {

  // });

  describe('getHomeworld', () => {
    it('should call fetch with the correct parameters', () => {

    });

    it('should return an array with homeworld name and population', async () => {

    });
  });

  describe('getSpecies', () => {
    it('should call fetch with the correct parameters', () => {

    });

    it('should return a string with the species name', async () => {

    });
  });

  // describe('getFavorites', () => {

  // });

  describe('componentDidMount', () => {
    it('should call fetch with the correct parameters', () => {

    });

    it('should update default scrollText and loaded in state', () => {

    });

    it('should console log an error if everything is not okay', () => {

    });
  });
});
