import React, { FC } from 'react';

interface IExternalLink {
  href: string;
  className?: string;
}

const ExternalLink: FC<IExternalLink> = ({ href, className, children }) => {
  return (
    <a
      className={`ExternalLink${className ? ` ${className}` : ''}`}
      href={href}
      target="_blank"
      rel="noreferrer noopener"
    >
      {children}
    </a>
  );
};

export default ExternalLink;
