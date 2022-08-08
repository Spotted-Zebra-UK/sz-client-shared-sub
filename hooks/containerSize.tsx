import debounce from 'lodash/debounce';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TSize } from '../interfaces/size';

const useContainerSize = (): [
  TSize,
  React.MutableRefObject<HTMLDivElement | null>
] => {
  const [size, setSize] = useState<TSize>({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleResize = useCallback(() => {
    if (containerRef.current) {
      setSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedResize = useCallback(debounce(handleResize, 250), []);

  useEffect(() => {
    window.addEventListener('resize', debouncedResize);
    handleResize();

    return () => window.removeEventListener('resize', debouncedResize);
  }, [debouncedResize, handleResize]);

  return [size, containerRef];
};

export const useWindowSize = (): [TSize] => {
  const [windowSize, setWindowSize] = useState<TSize>({ width: 0, height: 0 });

  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedResize = useCallback(debounce(handleResize, 250), []);

  useEffect(() => {
    window.addEventListener('resize', debouncedResize);
    handleResize();

    return () => window.removeEventListener('resize', debouncedResize);
  }, [debouncedResize, handleResize]);

  return [windowSize];
};

export default useContainerSize;
