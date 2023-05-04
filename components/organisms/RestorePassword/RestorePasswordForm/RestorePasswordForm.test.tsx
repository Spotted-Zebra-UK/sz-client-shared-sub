import { shallow } from 'enzyme';
import FormField from '../../../atoms/FormField/FormField';
import Input from '../../../atoms/Input/Input';
import RestorePasswordForm from './RestorePasswordForm';

describe('RestorePasswordForm', () => {
  let onSubmit: (email: string) => void;

  beforeEach(() => {
    onSubmit = jest.fn();
  });

  // it('should render correctly by default', () => {
  //   const wrapper = shallow(<RestorePasswordForm onSubmit={onSubmit} />);

  //   expect(toJson(wrapper)).toMatchSnapshot();
  //   expect(wrapper.find(FormField).props().error).toBeUndefined();
  //   expect(wrapper.find(Input).props().value).toBe('');
  // });

  it('should change input value on input change', () => {
    const emailValue = 'test@email.com';
    const wrapper = shallow(<RestorePasswordForm onSubmit={onSubmit} />);

    wrapper.find(Input).props().onChange(emailValue, 'email');
    expect(wrapper.find(Input).props().value).toBe(emailValue);
  });

  it('should call provided onSubmit', () => {
    const emailValue = 'test@email.com';
    const wrapper = shallow(<RestorePasswordForm onSubmit={onSubmit} />);

    wrapper.find(Input).props().onChange(emailValue, 'email');
    expect(wrapper.find(Input).props().value).toBe(emailValue);

    const eventMock = {
      preventDefault: jest.fn(),
    };

    wrapper.find('form').simulate('submit', eventMock);

    expect(eventMock.preventDefault).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledWith(emailValue);
  });

  it('should show error and not call onSubmit if submit invalid email', () => {
    const emailValue = 'invalid-email';
    const wrapper = shallow(<RestorePasswordForm onSubmit={onSubmit} />);

    wrapper.find(Input).props().onChange(emailValue, 'email');

    const eventMock = {
      preventDefault: jest.fn(),
    };

    wrapper.find('form').simulate('submit', eventMock);

    expect(eventMock.preventDefault).toHaveBeenCalled();
    expect(wrapper.find(FormField).props().error).toBe('Not a valid email');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('should hide error if error is visible and input changed', () => {
    const validEmailValue = 'test@email.com';
    const invalidEmailValue = 'test-emailValue';
    const wrapper = shallow(<RestorePasswordForm onSubmit={onSubmit} />);

    wrapper.find(Input).props().onChange(invalidEmailValue, 'email');

    const eventMock = {
      preventDefault: jest.fn(),
    };

    wrapper.find('form').simulate('submit', eventMock);

    expect(wrapper.find(FormField).props().error).toBe('Not a valid email');

    wrapper.find(Input).props().onChange(validEmailValue, 'email');
    expect(wrapper.find(FormField).props().error).toBe('');
  });
});
