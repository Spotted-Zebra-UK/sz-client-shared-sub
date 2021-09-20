import React, { FC } from 'react';
import BubblesBackground from '../../../../components/atoms/BubblesBackground/BubblesBackground';
import Notification from '../../../../components/atoms/Notification/Notification';

interface IInvitationExpiredView {
  fullName?: string;
}

const InvitationExpiredView: FC<IInvitationExpiredView> = ({ fullName }) => {
  return (
    <div>
      <BubblesBackground className="SignUp__Top__Title">
        <p className="SignUp__Top__Title__Row">Welcome</p>
        <p className="SignUp__Top__Title__Row">{fullName}!</p>
      </BubblesBackground>
      <Notification
        notification={{
          icon: 'Warning',
          color: 'Purple',
          message: 'Your invitation has been expired',
        }}
      />
    </div>
  );
};

export default InvitationExpiredView;
