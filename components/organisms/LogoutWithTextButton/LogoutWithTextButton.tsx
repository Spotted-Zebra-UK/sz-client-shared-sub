import './LogoutWithTextButton.scss';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import {
  AUTH_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from '../../../constants/authentication';
import { DEAUTHENTICATE_MUTATION } from '../../../graphql/authentication';
import IC_EXIT from '../../../icons/ic_logout.svg';
import { IDeauthenticateInput } from '../../../interfaces/authentication';
import { authenticationRoutes } from '../../../navigation/AuthNavigation/authNavigation.constants';
import IconButton from '../../atoms/IconButton/IconButton';

interface ILogoutButton {}

const LogoutButton: FC<ILogoutButton> = () => {
  const accessToken = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  const history = useHistory();
  const [deauthenticate] = useMutation<{}, IDeauthenticateInput>(
    DEAUTHENTICATE_MUTATION,
    {
      onCompleted: () => {
        localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
        localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
        history.push(authenticationRoutes.login);
        window.location.reload();
      },
      onError: () => {},
    }
  );

  const handleLogout = () => {
    if (accessToken) {
      deauthenticate({
        variables: {
          accessToken,
        },
      });
    }
  };

  return (
    <div className="profile-menu-item" onClick={handleLogout}>
      <IconButton className="LogoutButton">
        <img src={IC_EXIT} className="icon-exit" alt="exit-icon" />
      </IconButton>

      <label
        style={{
          marginLeft: '10px',
          cursor: 'pointer',
          color: '#656565',
          fontSize: 15,
        }}
      >
        Log out
      </label>
    </div>
  );
};

export default LogoutButton;
