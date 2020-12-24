import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import ReportFootnote from './ReportFootnote';

describe('ReportFootnote', () => {
  it('should render correctly by default', () => {
    const wrapper = shallow(
      <ReportFootnote position="test-position" reportDate="0" />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
