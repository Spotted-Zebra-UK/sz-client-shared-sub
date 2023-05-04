import { shallow } from 'enzyme';
import Modal from './Modal';

describe('Modal', () => {
  let onClose: () => void;

  beforeEach(() => {
    onClose = jest.fn();
  });

  it('should call onClose on modal close', () => {
    const wrapper = shallow(<Modal onClose={onClose} />);

    wrapper.props().onRequestClose();

    expect(onClose).toHaveBeenCalled();
  });

  // it('should render correctly by default', () => {
  //   const wrapper = shallow(
  //     <Modal onClose={onClose}>
  //       <span>Test children</span>
  //     </Modal>
  //   );

  //   expect(toJson(wrapper)).toMatchSnapshot();
  // });

  it('should add className', () => {
    const className = 'test-className';
    const wrapper = shallow(<Modal className={className} onClose={onClose} />);

    expect(wrapper.hasClass(className));
  });
});
