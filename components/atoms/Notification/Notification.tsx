import './Notification.scss';
import React, { FC } from 'react';
import { ReactComponent as ClapsIcon } from '../../../icons/Claps.svg';
import { ReactComponent as IdeaIcon } from '../../../icons/Idea.svg';
import { ReactComponent as MailIcon } from '../../../icons/Mail.svg';
import { ReactComponent as WarningIcon } from '../../../icons/Warning.svg';
import { TNotification } from '../../../interfaces/notification';

export interface INotification {
  notification: TNotification;
}

export const IconsObject = {
  Mail: MailIcon,
  Idea: IdeaIcon,
  Claps: ClapsIcon,
  Warning: WarningIcon,
};

const Notification: FC<INotification> = ({
  notification: { icon, color, message },
}) => {
  const Icon = IconsObject[icon];
  const className = `Notification Notification--${
    color || 'Green'
  } Notification--${icon}`;
  return (
    <div className={className}>
      <Icon className="Notification__Icon" />
      <div className="Notification__Message">{message}</div>
    </div>
  );
};

export default Notification;
