import { shallow } from 'enzyme';
import React from 'react';
import { TTextFromFieldValue } from '../../../interfaces/form';
import Input from '../Input/Input';
import FormField from './FormField';

describe('FormField', () => {
  const onChange = jest.fn((value: TTextFromFieldValue, name: string) => {});
  const fieldName = 'test-id';

  it('should render correctly with required props', () => {
    const wrapper = shallow(
      <FormField fieldName={fieldName}>
        <Input onChange={onChange} name={fieldName} value="test" />
      </FormField>
    );

    expect(wrapper.find('.FormField').hasClass(`FormField--${fieldName}`)).toBe(
      true
    );
    expect(wrapper.find('.FormField__Label').props().htmlFor).toEqual(
      fieldName
    );
    expect(wrapper.find('.FormField__Label__Text')).toHaveLength(0);
    expect(
      wrapper.contains(
        <Input onChange={onChange} name={fieldName} value="test" />
      )
    ).toBe(true);
  });

  it('should render correctly when label provided', () => {
    const label = 'test-label';
    const wrapper = shallow(
      <FormField label={label} fieldName={fieldName}>
        <Input onChange={onChange} name={fieldName} value="test" />
      </FormField>
    );

    expect(wrapper.find('.FormField__Label__Text')).toHaveLength(1);
    expect(
      wrapper
        .find('.FormField__Label__Text')
        .hasClass('FormField__Label__Text--HasError')
    ).toBe(false);
  });

  it('should render correctly when error provided', () => {
    const label = 'test-label';
    const error = 'test-error';
    const wrapper = shallow(
      <FormField error={error} label={label} fieldName={fieldName}>
        <Input onChange={onChange} name={fieldName} value="test" />
      </FormField>
    );

    expect(wrapper.find('.FormField__Label__Text')).toHaveLength(1);
    expect(
      wrapper
        .find('.FormField__Label__Text')
        .hasClass('FormField__Label__Text--HasError')
    ).toBe(true);
    expect(wrapper.find('.FormField__Error').text()).toEqual(error);
  });
});
