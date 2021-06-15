import './BubblesBackground.scss';
import React, { FunctionComponent } from 'react';
import { ReactComponent as Bubbles0 } from '../../../icons/bubbles/Bubbles-0.svg';
import { ReactComponent as Bubbles1 } from '../../../icons/bubbles/Bubbles-1.svg';
import { ReactComponent as Bubbles2 } from '../../../icons/bubbles/Bubbles-2.svg';
import { ReactComponent as Bubbles3 } from '../../../icons/bubbles/Bubbles-3.svg';
import { ReactComponent as LeftBubblesIcon1 } from '../../../icons/CandidateInformationBubblesLeft.svg';
import { ReactComponent as RightBubblesIcon1 } from '../../../icons/CandidateInformationBubblesRight.svg';

interface IBubblesBackground {
  className?: string;
  index?: number;
}

const BubblesBackground: FunctionComponent<IBubblesBackground> = ({
  children,
  className,
  index = 0,
}) => {
  let BubblesIcon;

  switch (index) {
    case 1:
      BubblesIcon = Bubbles1;
      break;
    case 2:
      BubblesIcon = Bubbles2;
      break;
    case 3:
      BubblesIcon = Bubbles3;
      break;
    case 4:
      BubblesIcon = ({ className }: { className: string }) => (
        <div className={className}>
          <LeftBubblesIcon1 />
          <RightBubblesIcon1 />
        </div>
      );
      break;
    default:
      BubblesIcon = Bubbles0;
  }

  return (
    <div className={`BubblesBackground${className ? ` ${className}` : ''}`}>
      <BubblesIcon className={`BubblesBackground__Bg--${index}`} />
      {children}
    </div>
  );
};

export default BubblesBackground;
