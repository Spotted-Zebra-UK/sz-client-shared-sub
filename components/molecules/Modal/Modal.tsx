import './Modal.scss';
import React, { FC } from 'react';
import { isMobile } from 'react-device-detect';
import ReactModal from 'react-modal';

interface IModal {
  onClose: () => void;
  className?: string;
}

const Modal: FC<IModal> = ({ children, onClose, className }) => {
  const parsedClassName = `Modal${
    isMobile ? ' Modal--Mobile' : ' Modal--Desktop'
  }${className ? ` ${className}` : ''}`;

  return (
    <ReactModal
      ariaHideApp={false}
      className={parsedClassName}
      isOpen
      onRequestClose={onClose}
      overlayClassName="ModalOverlay"
      shouldCloseOnOverlayClick
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
