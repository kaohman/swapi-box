import React from 'react';
import ReactDOM from 'react-dom';
import CardContainer from './CardContainer';
import { shallow } from 'enzyme';

describe('CardContainer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <CardContainer
        cards={cardsToDisplay}
        favorites={favorites}
        toggleFavorite={this.toggleFavorite}
        currentPage={currentPage}
      />
    );
  });

  it('should match the snapshot with all data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  });
});