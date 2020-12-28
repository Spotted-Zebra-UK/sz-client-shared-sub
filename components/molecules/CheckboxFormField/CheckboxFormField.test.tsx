import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { ReactComponent as CheckboxCheckedIcon } from '../../../icons/CheckboxChecked.svg';
import { ReactComponent as CheckboxEmptyIcon } from '../../../icons/CheckboxEmpty.svg';
import { TCheckboxFormFieldValue } from '../../../interfaces/form';
import CheckboxFormField from './CheckboxFormField';

describe('CheckboxFormField', () => {
  let onChange: (value: TCheckboxFormFieldValue, name: string) => void;
  const name = 'test-name';
  const id = 'test-id';

  beforeEach(() => {
    onChange = jest.fn();
  });

  it('should render correct with required props when value if false', () => {
    const wrapper = shallow(
      <CheckboxFormField
        onChange={onChange}
        name={name}
        id={id}
        value={false}
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find(CheckboxEmptyIcon)).toHaveLength(1);
    expect(wrapper.find(CheckboxCheckedIcon)).toHaveLength(0);
  });

  it('should render correct when value is true', () => {
    const wrapper = shallow(
      <CheckboxFormField onChange={onChange} name={name} id={id} value />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find(CheckboxEmptyIcon)).toHaveLength(0);
    expect(wrapper.find(CheckboxCheckedIcon)).toHaveLength(1);
  });

  it('should render correctly when label provided', () => {
    const label = 'test-label';
    const wrapper = shallow(
      <CheckboxFormField
        label={label}
        onChange={onChange}
        name={name}
        id={id}
        value
      />
    );

    expect(wrapper.find('.CheckboxFormField__Label__Top__Input')).toHaveLength(
      1
    );
    expect(
      wrapper.find('.CheckboxFormField__Label__Top__Input').text()
    ).toEqual(label);
  });

  it('should render correctly when className provided', () => {
    const className = 'test-className';
    const wrapper = shallow(
      <CheckboxFormField
        className={className}
        onChange={onChange}
        name={name}
        id={id}
        value
      />
    );

    expect(wrapper.hasClass('CheckboxFormField'));
    expect(wrapper.hasClass(className)).toBe(true);
  });

  it('should render correctly when error provided', () => {
    const error = 'test-error';
    const wrapper = shallow(
      <CheckboxFormField
        error={error}
        onChange={onChange}
        name={name}
        id={id}
        value
      />
    );

    expect(wrapper.find('.CheckboxFormField__Label__Error').text()).toEqual(
      error
    );
  });

  it('should call onChange on input change', () => {
    const wrapper = mount(
      <CheckboxFormField onChange={onChange} name={name} id={id} value />
    );

    wrapper.find('input').simulate('change');

    expect(onChange).toHaveBeenCalledWith(false, name);
  });
});
