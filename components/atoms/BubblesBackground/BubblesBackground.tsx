import './BubblesBackground.scss';
import { ReactComponent as Bubbles0 } from 'assets/icons/bubbles/Bubbles-0.svg';
import { ReactComponent as Bubbles1 } from 'assets/icons/bubbles/Bubbles-1.svg';
import { ReactComponent as Bubbles2 } from 'assets/icons/bubbles/Bubbles-2.svg';
import { ReactComponent as Bubbles3 } from 'assets/icons/bubbles/Bubbles-3.svg';
import { ReactComponent as LeftBubblesIcon1 } from 'assets/icons/CandidateInformationBubblesLeft.svg';
import { ReactComponent as RightBubblesIcon1 } from 'assets/icons/CandidateInformationBubblesRight.svg';
import { FunctionComponent } from 'react';

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
