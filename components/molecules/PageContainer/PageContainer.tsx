import React, { FC, ReactElement } from 'react';
import './PageContainer.scss';

interface IPageContainer {
  header?: ReactElement;
  footer?: ReactElement;
  className?: string;
}

const PageContainer: FC<IPageContainer> = ({
  children,
  header,
  footer,
  className,
}) => {
  return (
    <div className={`PageContainer${className ? ` ${className}` : ''}`}>
      {header ? (
        <header className="PageContainer__Header">{header}</header>
      ) : null}
      <div className="PageContainer__Content">{children}</div>
      {footer ? (
        <footer className="PageContainer__Footer">{footer}</footer>
      ) : null}
    </div>
  );
};

export default PageContainer;
