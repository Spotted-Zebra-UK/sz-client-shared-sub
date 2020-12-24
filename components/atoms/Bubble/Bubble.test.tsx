import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import Bubble from './Bubble';

describe('Bubble', () => {
  it('should render correctly by default', () => {
    const wrapper = shallow(<Bubble />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
