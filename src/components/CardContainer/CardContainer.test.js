import React from 'react';
import ReactDOM from 'react-dom';
import CardContainer from './CardContainer';
import { shallow } from 'enzyme';

describe('CardContainer', () => {
  let wrapper;
  let mockCardsToDisplay;
  let mockFavorites;
  let mockToggleFavorite;
  let mockCurrentPage;

  beforeEach(() => {
    mockCardsToDisplay = [{}, {}];
    mockFavorites = ['1', '2'];
    mockToggleFavorite = jest.fn();
    mockCurrentPage = 'people';
    wrapper = shallow(
      <CardContainer
        cards={mockCardsToDisplay}
        favorites={mockFavorites}
        toggleFavorite={mockToggleFavorite}
        currentPage={mockCurrentPage}
      />
    );
  });

  it('should match the snapshot with all data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  });
});