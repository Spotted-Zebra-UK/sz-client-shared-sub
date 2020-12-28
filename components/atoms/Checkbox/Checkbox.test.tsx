import { shallow } from 'enzyme';
import React from 'react';
import { TCheckboxFormFieldValue } from '../../../interfaces/form';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  let onChange: (value: TCheckboxFormFieldValue, id?: string) => void;

  beforeEach(() => {
    onChange = jest.fn();
  });

  it('should call onChange with provided name and false value on change when checkbox is checked', () => {
    const name = 'checkbox-name';
    const wrapper = shallow(
      <Checkbox value={true} name={name} onChange={onChange} />
    );

    wrapper.find('input').simulate('change');

    expect(onChange).toBeCalledWith(false, name);
  });

  it('should call onChange with provided name and true value on change when checkbox is not checked', () => {
    const name = 'checkbox-name';
    const wrapper = shallow(
      <Checkbox value={false} name={name} onChange={onChange} />
    );

    wrapper.find('input').simulate('change');

    expect(onChange).toBeCalledWith(true, name);
  });
});
