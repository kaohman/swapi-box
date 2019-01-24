import React from 'react';
import ReactDOM from 'react-dom';
import ControlForm from './ControlForm';
import { shallow } from 'enzyme';

describe('ControlForm', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <ControlForm

      />
    );
  });

  it('should match the snapshot with all data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a default state', () => {
    
  });
  
});