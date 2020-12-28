import { shallow } from 'enzyme';
import React from 'react';
import Button from './Button';

describe('Button', () => {
  let onClick: (id?: string) => void;

  beforeEach(() => {
    onClick = jest.fn();
  });

  it('should call onClick with provided id', () => {
    const id = 'button-id';
    const wrapper = shallow(<Button id={id} onClick={onClick} />);

    wrapper.find('button').simulate('click');

    expect(onClick).toBeCalledWith(id);
  });

  it('should call onClick', () => {
    const wrapper = shallow(<Button onClick={onClick} />);

    wrapper.find('button').simulate('click');

    expect(onClick).toBeCalledWith();
  });

  it('should add class name to button', () => {
    const className = 'test-class-name';
    const wrapper = shallow(<Button className={className} />);

    expect(wrapper.find('button').hasClass(className)).toBe(true);
  });

  it('should not throw error if onClick was not provided', () => {
    const wrapper = shallow(<Button />);

    expect(wrapper.find('button').props().onClick).not.toThrowError();
  });
});
