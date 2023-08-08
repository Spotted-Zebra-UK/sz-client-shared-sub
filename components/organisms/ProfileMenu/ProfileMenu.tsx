import './ProfileMenu.scss';
import React, { FC } from 'react';
import { User } from '../../../../../generated/graphql';
import LogoutWithTextButton from '../LogoutWithTextButton/LogoutWithTextButton';
import { Avatar } from '@spotted-zebra-uk/sz-ui-shared.ui.avatar';

interface IProfileMenu {
  user: User;
}

const ProfileMenu: FC<IProfileMenu> = ({ user }) => {
  return (
    <div className="profile-menu-container">
      <div className="profile-name-container">
        <Avatar
          user={{
            firstName: user.firstName,
            lastName: user.lastName,
            imageUrl: user.avatarUrl as string,
          }}
          isInteractive={false}
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
