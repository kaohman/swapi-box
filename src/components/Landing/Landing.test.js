import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './Landing';
import { shallow } from 'enzyme';

describe('Landing', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Landing

      />
    );
  });

  it('should match the snapshot with all data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  });
});