import './Avatar.scss';
import React, { FC } from 'react';
import { IUser } from '../../../interfaces/User';

interface IAvatar {
  user: IUser;
  className: string;
  rounded?: boolean;
  boldFont?: boolean;
  lastCharacters?: string;
}

const Avatar: FC<IAvatar> = props => {
  const { user, className, rounded, boldFont, lastCharacters } = props;
  const { name, imageUrl, grade } = user;

  return imageUrl ? (
    <img src={imageUrl} alt="user.png" className={`Avatar ${className}`} />
  ) : (
    <div
      className={`Avatar ${className} Avatar--Initials ${
        grade
          ? `Avatar--Initials--${grade.charAt(0)}`
          : 'Avatar--Initials--Grey'
      } ${!rounded && 'not-rounded'}`}
    >
      <span className={`AbsolutelyCentered ${boldFont && 'bold'}`}>
        {`${name.firstName.charAt(0)}${name.lastName.charAt(0)}`}
        {lastCharacters && lastCharacters}
      </span>
    </div>
  );
};

export default Avatar;
