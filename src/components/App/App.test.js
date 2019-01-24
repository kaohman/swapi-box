import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';

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

  });

  describe('getNextPageData', () => {

  });

  describe('getPeopleData', () => {
    it('should call fetch with the correct parameters', () => {

    });

    it('should call fetchHomeworld with the correct parameters', () => {

    });

    it('should call fetchSpecies with the correct parameters', () => {

    });

    it('should return an array of people objects', () => {

    });
  });

  describe('getFavorites', () => {
  });

  describe('componentDidMount', () => {
    it('should call fetch with the correct parameters', () => {

    });

    it('should update default scrollText and loaded in state', () => {

    });

    it('should console log an error if everything is not okay', () => {

    });
  });
});
