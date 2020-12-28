import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import Button from '../../atoms/Button/Button';
import SubmitButton from '../../atoms/SubmitButton/SubmitButton';
import SquareButton from './SquareButton';

describe('SquareButton', () => {
  let onClick: (id?: string) => void;

  beforeEach(() => {
    onClick = jest.fn();
  });

  describe('Submit', () => {
    it('should render correctly when type is submit', () => {
      const wrapper = shallow(<SquareButton type="submit" />);

      expect(toJson(wrapper)).toMatchSnapshot();
      expect(wrapper.find(SubmitButton)).toHaveLength(1);
      expect(wrapper.hasClass('SquareButton'));
      expect(wrapper.hasClass('SquareButton--Green'));
    });
  });

  describe('Button', () => {
    it('should render correctly when type not provided', () => {
      const wrapper = shallow(<SquareButton onClick={onClick} />);

      expect(toJson(wrapper)).toMatchSnapshot();
      expect(wrapper.find(Button)).toHaveLength(1);
      expect(wrapper.hasClass('SquareButton'));
      expect(wrapper.hasClass('SquareButton--Green'));
    });

    it('should render correctly when type is button', () => {
      const wrapper = shallow(<SquareButton type="button" onClick={onClick} />);

      expect(toJson(wrapper)).toMatchSnapshot();
      expect(wrapper.find(Button)).toHaveLength(1);
    });

    it('should render correctly when color, isDisabled and className provided', () => {
      const className = 'test-className';
      const wrapper = shallow(
        <SquareButton
          color="Purple"
          isDisabled
          className={className}
          onClick={onClick}
        />
      );

      expect(wrapper.hasClass('SquareButton--Purple')).toBe(true);
      expect(wrapper.hasClass(className)).toBe(true);
    });

    it('should call onClick on button click', () => {
      const wrapper = mount(<SquareButton onClick={onClick} />);

      wrapper.find('button').simulate('click');

      expect(onClick).toBeCalled();
    });
  });
});
