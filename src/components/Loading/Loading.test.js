import React from 'react';
import ReactDOM from 'react-dom';
import Loading from './Loading';
import { shallow } from 'enzyme';

describe('Loading', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Loading />
    );
  });

  it('should match the snapshot with all data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should receive the text, title, and date for a movie given as props from app', () => {
    // expect(wrapper.props()).toEqual('this is sample text');
  });
});