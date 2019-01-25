import React from 'react';
import ReactDOM from 'react-dom';
import People from './People';
import { shallow } from 'enzyme';

describe('People', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <People

      />
    );
  });

  it('should match the snapshot with all data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  });
});