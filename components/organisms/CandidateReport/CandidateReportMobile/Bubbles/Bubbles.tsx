import React, { FC } from 'react';
import Bubble, { IBubble } from './Bubble/Bubble';

interface IBubbles {
  set: IBubble[];
}

const Bubbles: FC<IBubbles> = props => {
  const { set } = props;

  return (
    <>
      {set.map(bubble => {
        return (
          <Bubble
            key={bubble.id}
            width={bubble.width}
            height={bubble.height}
            backgroundColor={bubble.backgroundColor}
            top={bubble.top}
            right={bubble.right}
            bottom={bubble.bottom}
            left={bubble.left}
          />
        );
      })}
    </>
  );
};

export default Bubbles;
