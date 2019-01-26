import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './Landing';
import { shallow } from 'enzyme';

const mockScrollText = {
  text: 'this is sample text',
  title: 'movie title',
  date: '11-5-2018'
}

describe('Landing', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Landing
        {...mockScrollText}
      />
    );
  });

  it('should match the snapshot with all data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  });
});