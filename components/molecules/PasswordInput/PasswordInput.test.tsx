import { mount, shallow } from 'enzyme';
import { ReactComponent as EyeIcon } from '../../../icons/Eye.svg';
import { ReactComponent as EyeSolidIcon } from '../../../icons/EyeSolid.svg';
import { TTextFromFieldValue } from '../../../interfaces/form';
import PasswordInput from './PasswordInput';

describe('PasswordInput', () => {
  let onChange: (value: TTextFromFieldValue, name: string) => void;

  const value = 'test-value';
  const name = 'test-name';

  beforeEach(() => {
    onChange = jest.fn();
  });

  it('should render correctly with required props', () => {
    const wrapper = shallow(
      <PasswordInput name={name} value={value} onChange={onChange} />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find(EyeIcon)).toHaveLength(1);
    expect(wrapper.find(EyeSolidIcon)).toHaveLength(0);
    expect(wrapper.find('input').props().type).toEqual('password');
  });

  it('should change input type on visibility change button click', () => {
    const wrapper = mount(
      <PasswordInput name={name} value={value} onChange={onChange} />
    );

    wrapper.find('button').simulate('click');

    expect(wrapper.find(EyeIcon)).toHaveLength(0);
    expect(wrapper.find(EyeSolidIcon)).toHaveLength(1);
    expect(wrapper.find('input').props().type).toEqual('text');

    wrapper.find('button').simulate('click');

    expect(wrapper.find(EyeIcon)).toHaveLength(1);
    expect(wrapper.find(EyeSolidIcon)).toHaveLength(0);
    expect(wrapper.find('input').props().type).toEqual('password');
  });

  it('should call onChange on input change', () => {
    const newValue = 'test-newValue';
    const wrapper = shallow(
      <PasswordInput name={name} value={value} onChange={onChange} />
    );

    wrapper.find('input').simulate('change', { target: { value: newValue } });

    expect(onChange).toHaveBeenCalledWith(newValue, name);
  });

  it('should render correctly when placeholder provided', () => {
    const placeholder = 'test-placeholder';
    const wrapper = shallow(
      <PasswordInput
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
