import './Modal.scss';
import React, { FC } from 'react';
import ReactModal from 'react-modal';

interface IModal {
  onClose: () => void;
  className?: string;
}

const Modal: FC<IModal> = ({ children, onClose, className }) => {
  return (
    <ReactModal
      ariaHideApp={false}
      className={`Modal${className ? ` ${className}` : ''}`}
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
