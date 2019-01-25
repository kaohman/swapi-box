import React from 'react';
import ReactDOM from 'react-dom';
import Planets from './Planets';
import { shallow } from 'enzyme';

describe('Planets', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Planets

      />
    );
  });

  it('should match the snapshot with all data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  });
});