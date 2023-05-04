import { mount } from 'enzyme';
import { ReactComponent as Icon } from '../../../icons/Eye.svg';
import IconButton from './IconButton';

describe('IconButton', () => {
  let onClick: (id?: string) => void;

  beforeEach(() => {
    onClick = jest.fn();
  });

  it('should call onClick with provided id', () => {
    const id = 'button-id';
    const wrapper = mount(
      <IconButton id={id} onClick={onClick}>
        <Icon />
      </IconButton>
    );

    expect(wrapper.hasClass('IconButton'));

    wrapper.find('button').simulate('click');

    expect(onClick).toBeCalledWith(id);
  });

  it('should call onClick', () => {
    const wrapper = mount(
      <IconButton onClick={onClick}>
        <Icon />
      </IconButton>
    );

    expect(wrapper.hasClass('IconButton'));

    wrapper.find('button').simulate('click');

    expect(onClick).toBeCalledWith();
  });
});
