import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
import { shallow } from 'enzyme';

describe('Button', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Button

      />
    );
  });

  it('should match the snapshot with all data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a default state', () => {
    
  });
  
});