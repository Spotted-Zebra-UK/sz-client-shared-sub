import { shallow } from 'enzyme';
import FormField from '../../../atoms/FormField/FormField';
import PasswordInput from '../../../molecules/PasswordInput/PasswordInput';
import CreatePasswordForm from './CreatePasswordForm';

describe('CreatePasswordForm', () => {
  let onSubmit: (password: string) => void;

  beforeEach(() => {
    onSubmit = jest.fn();
  });

  // it('should render correctly by default', () => {
  //   const wrapper = shallow(<CreatePasswordForm onSubmit={onSubmit} />);

  //   expect(toJson(wrapper)).toMatchSnapshot();
  //   expect(wrapper.find(FormField).props().error).toBeUndefined();
  //   expect(wrapper.find(PasswordInput).props().value).toBe('');
  // });

  it('should change input value on input change', () => {
    const passwordValue = 'test-passwordValue';
    const wrapper = shallow(<CreatePasswordForm onSubmit={onSubmit} />);

    wrapper.find(PasswordInput).props().onChange(passwordValue, 'password');
    expect(wrapper.find(PasswordInput).props().value).toBe(passwordValue);
  });

  it('should call provided onSubmit', () => {
    const passwordValue = 'test-passwordValue';
    const wrapper = shallow(<CreatePasswordForm onSubmit={onSubmit} />);

    wrapper.find(PasswordInput).props().onChange(passwordValue, 'password');
    expect(wrapper.find(PasswordInput).props().value).toBe(passwordValue);

    const eventMock = {
      preventDefault: jest.fn(),
    };

    wrapper.find('form').simulate('submit', eventMock);

    expect(eventMock.preventDefault).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledWith(passwordValue);
  });

  it('should show error and not call onSubmit if submit too short password', () => {
    const wrapper = shallow(<CreatePasswordForm onSubmit={onSubmit} />);

    const eventMock = {
      preventDefault: jest.fn(),
    };

    wrapper.find('form').simulate('submit', eventMock);

    expect(eventMock.preventDefault).toHaveBeenCalled();
    expect(wrapper.find(FormField).props().error).toBe(
      'Password is too short (minimum is 5 characters)'
    );
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('should hide error if error is visible and input changed', () => {
    const passwordValue = 'test-passwordValue';
    const wrapper = shallow(<CreatePasswordForm onSubmit={onSubmit} />);

    const eventMock = {
      preventDefault: jest.fn(),
    };

    wrapper.find('form').simulate('submit', eventMock);

    expect(wrapper.find(FormField).props().error).toBe(
      'Password is too short (minimum is 5 characters)'
    );

    wrapper.find(PasswordInput).props().onChange(passwordValue, 'password');
    expect(wrapper.find(FormField).props().error).toBe('');
  });
});
