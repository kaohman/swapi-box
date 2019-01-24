import React from 'react';
import ReactDOM from 'react-dom';
import API from './api';
import { shallow } from 'enzyme';

describe('API', () => {
  describe('fetchData', () => {
    let wrapper;
    let mockEvent;
    let mockUpdateGroceryList;
    let mockGrocery;
    let mockGroceries;

    beforeEach(() => {
      wrapper = shallow(<App />);

      wrapper.setState({
        currentPage: 'landing',
        people: [],
      })
    });

    it('should call fetch with the correct parameters', () => {

    });

    it('should call fetchNextPageData with the correct parameters', () => {

    });

    it('should call getPeopleData with the correct parameters', () => {

    });

    it('should set state with the updated data', () => {

    });

    it('should console log an error if everything is not okay', () => {

    });
  });

  describe('fetchNextPageData', () => {
    it('should call fetch with the correct parameters', () => {

    });

    it('should return results from all the fetch calls', () => {

    });
  });

  describe('getPlanetData', () => {

  });

  describe('fetchVehicleData', () => {

  });

  describe('fetchHomeworld', () => {
    it('should call fetch with the correct parameters', () => {

    });

    it('should return an array with homeworld name and population', () => {

    });

    it('should console log an error if everything is not okay', () => {

    });
  });

  describe('fetchSpecies', () => {
    it('should call fetch with the correct parameters', () => {

    });

    it('should return a string with the species name', () => {

    });

    it('should console log an error if everything is not okay', () => {

    });
  });

});