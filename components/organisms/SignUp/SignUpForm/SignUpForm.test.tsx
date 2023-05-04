import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import FormField from '../../../atoms/FormField/FormField';
import Input from '../../../atoms/Input/Input';
import PasswordInput from '../../../molecules/PasswordInput/PasswordInput';
import PrivacyPolicyCheckboxField from './PrivacyPolicyCheckboxField/PrivacyPolicyCheckboxField';
import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  let onSignUp: (
    fullName: string,
    email: string,
    password: string,
    isPrivacyPolicyChecked: boolean
  ) => void;

  const fullNameValue = 'test-firstName lastName';
  const passwordValue = 'test-passwordValue';
  const emailValue = 'test@email.com';

  beforeEach(() => {
    onSignUp = jest.fn();
  });

  it('should render correctly by default', () => {
    const wrapper = shallow(<SignUpForm onSignUp={onSignUp} />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find(Input).at(0).props().value).toBe('');
    expect(wrapper.find(FormField).at(0).props().error).toBeUndefined();
    expect(wrapper.find(Input).at(1).props().value).toBe('');
    expect(wrapper.find(FormField).at(1).props().error).toBeUndefined();
    expect(wrapper.find(PasswordInput).props().value).toBe('');
    expect(wrapper.find(FormField).at(2).props().error).toBeUndefined();
  });

  it('should change password input value on input change', () => {
    const wrapper = shallow(<SignUpForm onSignUp={onSignUp} />);

    wrapper.find(PasswordInput).props().onChange(passwordValue, 'password');
    expect(wrapper.find(PasswordInput).props().value).toBe(passwordValue);
  });

  it('should change email input value on input change', () => {
    const wrapper = shallow(<SignUpForm onSignUp={onSignUp} />);

    wrapper.find(Input).at(1).props().onChange(emailValue, 'email');
    expect(wrapper.find(Input).at(1).props().value).toBe(emailValue);
  });

  it('should change fullName input value on input change', () => {
    const wrapper = shallow(<SignUpForm onSignUp={onSignUp} />);

    wrapper.find(Input).at(0).props().onChange(fullNameValue, 'fullName');
    expect(wrapper.find(Input).at(0).props().value).toBe(fullNameValue);
  });

  it('should change privacy policy checkbox value on checkbox change', () => {
    const wrapper = shallow(<SignUpForm onSignUp={onSignUp} />);

    wrapper
      .find(PrivacyPolicyCheckboxField)
      .props()
      .onChange(true, 'isPrivacyPolicyChecked');
    expect(wrapper.find(PrivacyPolicyCheckboxField).props().value).toBe(true);
  });

  it('should call provided onSignUp', () => {
    const wrapper = shallow(<SignUpForm onSignUp={onSignUp} />);

    wrapper.find(PasswordInput).props().onChange(passwordValue, 'password');
    wrapper.find(Input).at(0).props().onChange(fullNameValue, 'fullName');
    wrapper.find(Input).at(1).props().onChange(emailValue, 'email');
    wrapper
      .find(PrivacyPolicyCheckboxField)
      .props()
      .onChange(true, 'isPrivacyPolicyChecked');

    const eventMock = {
      preventDefault: jest.fn(),
    };

    wrapper.find('form').simulate('submit', eventMock);

    expect(eventMock.preventDefault).toHaveBeenCalled();
    expect(onSignUp).toHaveBeenCalledWith(
      fullNameValue,
      emailValue,
      passwordValue,
      true
    );
  });

  it('should show error and not call onSignUp if submit single string fullName', () => {
    const wrapper = shallow(<SignUpForm onSignUp={onSignUp} />);

    const eventMock = {
      preventDefault: jest.fn(),
    };

    wrapper.find(Input).at(0).props().onChange('firstName', 'fullName');

    wrapper.find('form').simulate('submit', eventMock);

    expect(wrapper.find(FormField).at(0).props().error).toBe(
      'First name and last name must be provided.'
    );
  });

  it('should show error and not call onSignUp if submit too short password', () => {
    const wrapper = shallow(<SignUpForm onSignUp={onSignUp} />);

    wrapper.find(Input).at(0).props().onChange(fullNameValue, 'fullName');
    wrapper.find(Input).at(1).props().onChange(emailValue, 'email');
    wrapper
      .find(PrivacyPolicyCheckboxField)
      .props()
      .onChange(true, 'isPrivacyPolicyChecked');

    const eventMock = {
      preventDefault: jest.fn(),
    };

    wrapper.find('form').simulate('submit', eventMock);

    expect(eventMock.preventDefault).toHaveBeenCalled();
    expect(wrapper.find(FormField).at(2).props().error).toBe(
      'Password is too short (minimum is 5 characters)'
    );
    expect(onSignUp).not.toHaveBeenCalled();
  });

  it('should show error and not call onSignUp if submit invalid email', () => {
    const wrapper = shallow(<SignUpForm onSignUp={onSignUp} />);

    wrapper.find(PasswordInput).props().onChange(passwordValue, 'password');
    wrapper.find(Input).at(0).props().onChange(fullNameValue, 'fullName');
    wrapper.find(Input).at(1).props().onChange('invalid-emial-value', 'email');
    wrapper
      .find(PrivacyPolicyCheckboxField)
      .props()
      .onChange(true, 'isPrivacyPolicyChecked');

    const eventMock = {
      preventDefault: jest.fn(),
    };

    wrapper.find('form').simulate('submit', eventMock);

    expect(eventMock.preventDefault).toHaveBeenCalled();
    expect(wrapper.find(FormField).at(1).props().error).toBe(
      'Not a valid email.'
    );
    expect(onSignUp).not.toHaveBeenCalled();
  });

  it('should show error and not call onSignUp if submit isPrivacyPolicyChecked is not checked', () => {
    const wrapper = shallow(<SignUpForm onSignUp={onSignUp} />);

    wrapper.find(PasswordInput).props().onChange(passwordValue, 'password');
    wrapper.find(Input).at(0).props().onChange(fullNameValue, 'fullName');
    wrapper.find(Input).at(1).props().onChange(emailValue, 'email');

    const eventMock = {
      preventDefault: jest.fn(),
    };

    wrapper.find('form').simulate('submit', eventMock);

    expect(eventMock.preventDefault).toHaveBeenCalled();
    expect(wrapper.find(PrivacyPolicyCheckboxField).props().error).toBe(
      'Privacy Notice must be cheked.'
    );
    expect(onSignUp).not.toHaveBeenCalled();
  });

  it('should hide password error if error is visible and password input changed', () => {
    const wrapper = shallow(<SignUpForm onSignUp={onSignUp} />);

    const eventMock = {
      preventDefault: jest.fn(),
    };

    wrapper.find('form').simulate('submit', eventMock);

    expect(wrapper.find(FormField).at(2).props().error).toBe(
      'Password is too short (minimum is 5 characters)'
    );

    wrapper.find(PasswordInput).props().onChange(passwordValue, 'password');
    expect(wrapper.find(FormField).at(2).props().error).toBe('');
  });

  it('should hide email error if error is visible and email input changed', () => {
    const invalidEmailValue = 'test-emailValue';
    const wrapper = shallow(<SignUpForm onSignUp={onSignUp} />);

    wrapper.find(Input).at(1).props().onChange(invalidEmailValue, 'email');

    const eventMock = {
      preventDefault: jest.fn(),
    };

    wrapper.find('form').simulate('submit', eventMock);

    expect(wrapper.find(FormField).at(1).props().error).toBe(
      'Not a valid email.'
    );

    wrapper.find(Input).at(1).props().onChange(emailValue, 'email');
    expect(wrapper.find(FormField).at(1).props().error).toBe('');
  });

  it('should hide fullName error if error is visible and fullName input changed', () => {
    const wrapper = shallow(<SignUpForm onSignUp={onSignUp} />);

    const eventMock = {
      preventDefault: jest.fn(),
    };

    wrapper.find('form').simulate('submit', eventMock);

    expect(wrapper.find(FormField).at(0).props().error).toBe(
      'First name and last name must be provided.'
    );

    wrapper.find(Input).at(1).props().onChange(fullNameValue, 'fullName');
    expect(wrapper.find(FormField).at(0).props().error).toBe('');
  });

  it('should show error and not call onSignUp if submit invalid email', () => {
    const wrapper = shallow(<SignUpForm onSignUp={onSignUp} />);

    const eventMock = {
      preventDefault: jest.fn(),
    };

    wrapper.find('form').simulate('submit', eventMock);

    expect(eventMock.preventDefault).toHaveBeenCalled();
    expect(wrapper.find(PrivacyPolicyCheckboxField).props().error).toBe(
      'Privacy Notice must be cheked.'
    );
    expect(onSignUp).not.toHaveBeenCalled();

    wrapper
      .find(PrivacyPolicyCheckboxField)
      .props()
      .onChange(true, 'isPrivacyPolicyChecked');
    expect(wrapper.find(PrivacyPolicyCheckboxField).props().error).toBe('');
  });

  it('should not render fullName input when fullName provided', () => {
    const wrapper = shallow(
      <SignUpForm onSignUp={onSignUp} fullName={fullNameValue} />
    );

    expect(wrapper.find('[fieldName="fullName"]')).toHaveLength(0);
    expect(wrapper.find('[name="fullName"]')).toHaveLength(0);
    expect(wrapper.find(Input).at(0).props().name).toBe('email');
  });

  it('should call onSubmit on submit when fullName provided', () => {
    const wrapper = shallow(
      <SignUpForm onSignUp={onSignUp} fullName={fullNameValue} />
    );

    wrapper.find(PasswordInput).props().onChange(passwordValue, 'password');
    wrapper.find(Input).at(0).props().onChange(emailValue, 'email');
    wrapper
      .find(PrivacyPolicyCheckboxField)
      .props()
      .onChange(true, 'isPrivacyPolicyChecked');

    const eventMock = {
      preventDefault: jest.fn(),
    };

    wrapper.find('form').simulate('submit', eventMock);

    expect(eventMock.preventDefault).toHaveBeenCalled();
    expect(onSignUp).toHaveBeenCalledWith(
      fullNameValue,
      emailValue,
      passwordValue,
      true
    );
  });

  it('should disable email input when email provided', () => {
    const wrapper = shallow(
      <SignUpForm
        onSignUp={onSignUp}
        fullName={fullNameValue}
        email={emailValue}
      />
    );

    expect(wrapper.find('[fieldName="fullName"]')).toHaveLength(0);
    expect(wrapper.find('[name="fullName"]')).toHaveLength(0);
    expect(wrapper.find(Input).at(0).props().isDisabled).toBe(true);
    expect(wrapper.find(Input).at(0).props().name).toBe('email');
  });

  it('should call onSubmit on submit when fullName and email provided', () => {
    const wrapper = shallow(
      <SignUpForm
        onSignUp={onSignUp}
        fullName={fullNameValue}
        email={emailValue}
      />
    );

    wrapper.find(PasswordInput).props().onChange(passwordValue, 'password');
    wrapper
      .find(PrivacyPolicyCheckboxField)
      .props()
      .onChange(true, 'isPrivacyPolicyChecked');

    const eventMock = {
      preventDefault: jest.fn(),
    };

    wrapper.find('form').simulate('submit', eventMock);

    expect(eventMock.preventDefault).toHaveBeenCalled();
    expect(onSignUp).toHaveBeenCalledWith(
      fullNameValue,
      emailValue,
      passwordValue,
      true
    );
  });
});
