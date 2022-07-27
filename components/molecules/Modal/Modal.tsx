import './Modal.scss';
import React, { FC, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import ReactModal from 'react-modal';

interface IModal {
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
}

const Modal: FC<IModal> = ({ children, onClose, className }) => {
  const parsedClassName = `Modal${
    isMobile ? ' Modal--Mobile' : ' Modal--Desktop'
  }${className ? ` ${className}` : ''}`;

  useEffect(() => {
    document.body.style.position = 'fixed';
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };
  }, []);

  return (
    <ReactModal
      ariaHideApp={false}
      className={parsedClassName}
      isOpen
      onRequestClose={onClose}
      overlayClassName="ModalOverlay"
      shouldCloseOnOverlayClick
    >
      <>{children}</>
    </ReactModal>
  );
};

export default Modal;
