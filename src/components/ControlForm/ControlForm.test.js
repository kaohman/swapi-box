import React from 'react';
import ReactDOM from 'react-dom';
import ControlForm from './ControlForm';
import { shallow } from 'enzyme';

describe('ControlForm', () => {
  let wrapper;
  let mockGetData;
  let mockShowFavorites;
  let mockCurrentPage;
  let mockFavoritesCount;
  let mockEvent;

  beforeEach(() => {
    mockGetData = jest.fn();
    mockShowFavorites = jest.fn();
    mockCurrentPage = 'people';
    mockFavoritesCount = 0;
    mockEvent = { target: { id: '' } };
    wrapper = shallow(
      <ControlForm
        activeButton={mockCurrentPage}
        getData={mockGetData}
        favoritesCount={mockFavoritesCount}
        showFavorites={mockShowFavorites}
      />
    );
  });

  it('should match the snapshot with all data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call getData on button click', () => {// execution
    wrapper.find('#people').simulate('click', mockEvent);
    // expectation
    expect(mockGetData).toHaveBeenCalled();
  });

  it('should call showFavorites on button click', () => {
    wrapper.find('#favorites').simulate('click', mockEvent);
    // expectation
    expect(mockShowFavorites).toHaveBeenCalled();
  });
});