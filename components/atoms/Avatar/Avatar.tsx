import './Avatar.scss';
import React, { FC } from 'react';
import { IUser } from '../../../interfaces/User';

interface IAvatar {
  user: IUser;
  className: string;
}

const Avatar: FC<IAvatar> = props => {
  const { user, className } = props;
  const { name, imageUrl, grade } = user;

  return imageUrl ? (
    <img src={imageUrl} alt="user.png" className={`Avatar ${className}`} />
  ) : (
    <div
      className={`Avatar ${className} Avatar--Initials ${
        grade
          ? `Avatar--Initials--${grade.charAt(0)}`
          : 'Avatar--Initials--Grey'
      }`}
    >
      <span className="AbsolutelyCentered">
        {`${name.firstName.charAt(0)}${name.lastName.charAt(0)}`}
      </span>
    </div>
  );
};

export default Avatar;
