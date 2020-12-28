import { mount, shallow } from 'enzyme';
import React from 'react';
import SubmitButton from './SubmitButton';

describe('SubmitButton', () => {
  it('should call provided function on submit', () => {
    const onSubmit = jest.fn();
    const wrapper = mount(
      <form onSubmit={onSubmit}>
        <SubmitButton>Click me</SubmitButton>
      </form>
    );

    wrapper.find('button').simulate('submit');

    expect(onSubmit).toBeCalled();
  });

  it('should render correctly by default', () => {
    const wrapper = shallow(<SubmitButton />);

    expect(wrapper.props().disabled).toBe(false);
    expect(wrapper.hasClass('SubmitButton')).toBe(true);
  });

  it('should render correctly when is disabled', () => {
    const wrapper = shallow(<SubmitButton isDisabled />);

    expect(wrapper.props().disabled).toBe(true);
  });

  it('should add provided className', () => {
    const className = 'test-classname';
    const wrapper = shallow(<SubmitButton className={className} />);

    expect(wrapper.hasClass('SubmitButton')).toBe(true);
    expect(wrapper.hasClass(className)).toBe(true);
  });
});
