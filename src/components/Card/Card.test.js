import React from 'react';
import ReactDOM from 'react-dom';
import Card from './Card';
import { shallow } from 'enzyme';

describe('Card', () => {
  let wrapper;
  let mockCard;
  let mockToggleFavorite;
  let mockFavorites;
  let mockEvent;

  beforeEach(() => {
    mockCard = { type: 'planets', terrain: 'rocky', climate: 'temperate', residents: ['Karin', 'Austin', 'Aria'] };
    mockToggleFavorite = jest.fn();
    mockFavorites = [];
    mockEvent = {target: {parentElement: {id: '1'}}};
    wrapper = shallow(
      <Card
        card={mockCard}
        toggleFavorite={mockToggleFavorite}
        favorites={mockFavorites}
      />
    );
  });

  it('should match the snapshot with all data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it.skip('should call getResidents list with the correct parameters if the cards to display are planets', () => {
    // setup
    const expected = ['Karin', 'Austin', 'Aria'];
    // expect
    expect(wrapper.getResidentsList).toHaveBeenCalledWith(expected);
  });

  it.skip('should return a list of residents when getResidentsList is called', () => {
    // setup
    const expected = 'Karin, Austin, Aria';
    // execution
    const result = wrapper.getResidentsList(mockCard.residents);
    // expect
    expect(result).toEqual(expected);
  });

  it('should call toggleFavorites when favorites button is clicked', () => {
    wrapper.find('.favorite-icon').simulate('click', mockEvent);
    // expectation
    expect(mockToggleFavorite).toHaveBeenCalled();
  });
});