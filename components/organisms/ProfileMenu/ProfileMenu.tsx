import './ProfileMenu.scss';
import React, { FC } from 'react';
import { User } from '../../../../../generated/graphql';
import Avatar from '../../atoms/Avatar/Avatar';
import LogoutWithTextButton from '../LogoutWithTextButton/LogoutWithTextButton';

interface IProfileMenu {
  user: User;
}

const ProfileMenu: FC<IProfileMenu> = ({ user }) => {
  return (
    <div className="profile-menu-container">
      <div className="profile-name-container">
        <Avatar
          user={{
            imageUrl: user.avatarUrl as string,
            name: {
              firstName: user.firstName,
              lastName: user.lastName,
            },
            grade: 'D',
          }}
          className="Avatar--Small"
          rounded={true}
        />

        <label className="profile-name-label">
          {`${user.firstName} ${user.lastName}`}
        </label>
      </div>
      <div>
        <LogoutWithTextButton />
      </div>
    </div>
  );
};

export default ProfileMenu;
