import { shallow } from 'enzyme';
import { TTextFromFieldValue } from '../../../interfaces/form';
import Input from './Input';

describe('Checkbox', () => {
  let onChange: (value: TTextFromFieldValue, id?: string) => void;

  const name = 'checkbox-name';
  const value = 'value';

  beforeEach(() => {
    onChange = jest.fn();
  });

  it('should render correctly with required props', () => {
    const wrapper = shallow(
      <Input value={value} name={name} onChange={onChange} />
    );

    expect(wrapper.hasClass('Input'));
    expect(wrapper.props().value).toEqual(value);
    expect(wrapper.props().type).toEqual('text');
    expect(wrapper.props().disabled).toBe(false);
  });

  it('should call onChange with provided name and newValue on change', () => {
    const newValue = 'new value';
    const wrapper = shallow(
      <Input value={value} name={name} onChange={onChange} />
    );

    wrapper.find('input').simulate('change', { target: { value: newValue } });

    expect(onChange).toBeCalledWith(newValue, name);
  });

  it('should call onChange with provided name and newValue on blur', () => {
    const newValue = 'new value';
    const wrapper = shallow(
      <Input value={value} name={name} onChange={onChange} />
    );

    wrapper.find('input').simulate('blur', { target: { value: newValue } });

    expect(onChange).toBeCalledWith(newValue, name);
  });

  it('should add class name to input', () => {
    const className = 'TestClassName';
    const wrapper = shallow(
      <Input
        value={value}
        name={name}
        onChange={onChange}
        className={className}
      />
    );

    expect(wrapper.hasClass('Input'));
    expect(wrapper.hasClass(className));
  });

  it('should disable input', () => {
    const wrapper = shallow(
      <Input value={value} name={name} onChange={onChange} isDisabled />
    );

    expect(wrapper.props().disabled).toBe(true);
  });

  it('should render correctly when type is password', () => {
    const wrapper = shallow(
      <Input value={value} name={name} onChange={onChange} type="password" />
    );

    expect(wrapper.props().type).toEqual('password');
  });
});
