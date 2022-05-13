import { FC } from 'react';
import { useWindowSize } from '../../../hooks/containerSize';

interface IContainer {
  className?: string;
  vh?: number;
}

const Container: FC<IContainer> = ({ className, vh = 100, children }) => {
  const [size] = useWindowSize();

  return (
    <div
      style={{ minHeight: size.height * 0.01 * vh }}
      className={`Container${className ? ` ${className}` : ''}`}
    >
      {children}
    </div>
  );
};

export default Container;
