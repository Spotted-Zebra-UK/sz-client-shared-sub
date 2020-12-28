import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import PrivacyPolicyCheckboxField from './PrivacyPolicyCheckboxField';

describe('PrivacyPolicyCheckboxField', () => {
  it('should render correctly', () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <PrivacyPolicyCheckboxField
        value={true}
        onChange={onChange}
        name="test-name"
        id="test-id"
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
