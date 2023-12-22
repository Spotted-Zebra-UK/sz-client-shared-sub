import './Notification.scss';
import { ReactComponent as ClapsIcon } from 'assets/icons/claps_notification.svg';
import { ReactComponent as IdeaIcon } from 'assets/icons/Idea.svg';
import { ReactComponent as MailIcon } from 'assets/icons/Mail.svg';
import { ReactComponent as WarningIcon } from 'assets/icons/Warning.svg';
import { FC } from 'react';
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
