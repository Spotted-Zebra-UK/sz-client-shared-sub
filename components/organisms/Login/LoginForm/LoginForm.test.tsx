import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import FormField from '../../../atoms/FormField/FormField';
import Input from '../../../atoms/Input/Input';
import PasswordInput from '../../../molecules/PasswordInput/PasswordInput';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  let onSubmit: (email: string) => void;

  beforeEach(() => {
    onSubmit = jest.fn();
  });

  // it('should render correctly by default', () => {
  //   const wrapper = shallow(<LoginForm onSubmit={onSubmit} />);

  //   expect(toJson(wrapper)).toMatchSnapshot();
  //   expect(wrapper.find(FormField).at(0).props().error).toBeUndefined();
  //   expect(wrapper.find(Input).props().value).toBe('');
  //   expect(wrapper.find(FormField).at(1).props().error).toBeUndefined();
  //   expect(wrapper.find(PasswordInput).props().value).toBe('');
  // });

  it('should change password input value on input change', () => {
    const passwordValue = 'test-passwordValue';
    const wrapper = shallow(<LoginForm onSubmit={onSubmit} />);

    wrapper.find(PasswordInput).props().onChange(passwordValue, 'password');
    expect(wrapper.find(PasswordInput).props().value).toBe(passwordValue);
  });

  it('should change email input value on input change', () => {
    const emailValue = 'test@email.com';
    const wrapper = shallow(<LoginForm onSubmit={onSubmit} />);

    wrapper.find(Input).props().onChange(emailValue, 'email');
    expect(wrapper.find(Input).props().value).toBe(emailValue);
  });

  it('should call provided onSubmit', () => {
    const passwordValue = 'test-passwordValue';
    const emailValue = 'test@email.com';
    const wrapper = shallow(<LoginForm onSubmit={onSubmit} />);

    wrapper.find(PasswordInput).props().onChange(passwordValue, 'password');
    expect(wrapper.find(PasswordInput).props().value).toBe(passwordValue);

    wrapper.find(Input).props().onChange(emailValue, 'email');
    expect(wrapper.find(Input).props().value).toBe(emailValue);

    const eventMock = {
      preventDefault: jest.fn(),
    };

    wrapper.find('form').simulate('submit', eventMock);

    expect(eventMock.preventDefault).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledWith(emailValue, passwordValue);
  });

  it('should show error and not call onSubmit if submit too short password', () => {
    const wrapper = shallow(<LoginForm onSubmit={onSubmit} />);

    const eventMock = {
      preventDefault: jest.fn(),
    };

    wrapper.find('form').simulate('submit', eventMock);

    expect(eventMock.preventDefault).toHaveBeenCalled();
    expect(wrapper.find(FormField).at(1).props().error).toBe(
      'Password is too short (minimum is 5 characters)'
    );
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('should show error and not call onSubmit if submit invalid email', () => {
    const emailValue = 'invalid-email';
    const wrapper = shallow(<LoginForm onSubmit={onSubmit} />);

    wrapper.find(Input).props().onChange(emailValue, 'email');

    const eventMock = {
      preventDefault: jest.fn(),
    };

    wrapper.find('form').simulate('submit', eventMock);

    expect(eventMock.preventDefault).toHaveBeenCalled();
    expect(wrapper.find(FormField).at(0).props().error).toBe(
      'Not a valid email'
    );
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('should hide password error if error is visible and password input changed', () => {
    const passwordValue = 'test-passwordValue';
    const wrapper = shallow(<LoginForm onSubmit={onSubmit} />);

    const eventMock = {
      preventDefault: jest.fn(),
    };

    wrapper.find('form').simulate('submit', eventMock);

    expect(wrapper.find(FormField).at(1).props().error).toBe(
      'Password is too short (minimum is 5 characters)'
    );

    wrapper.find(PasswordInput).props().onChange(passwordValue, 'password');
    expect(wrapper.find(FormField).at(1).props().error).toBe('');
  });

  it('should hide email error if error is visible and email input changed', () => {
    const validEmailValue = 'test@email.com';
    const invalidEmailValue = 'test-emailValue';
    const wrapper = shallow(<LoginForm onSubmit={onSubmit} />);

    wrapper.find(Input).props().onChange(invalidEmailValue, 'email');

    const eventMock = {
      preventDefault: jest.fn(),
    };

    wrapper.find('form').simulate('submit', eventMock);

    expect(wrapper.find(FormField).at(0).props().error).toBe(
      'Not a valid email'
    );

    wrapper.find(Input).props().onChange(validEmailValue, 'email');
    expect(wrapper.find(FormField).at(0).props().error).toBe('');
  });
});
