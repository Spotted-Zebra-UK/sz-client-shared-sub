import './LogoutButton.scss';
import { ReactComponent as ExitIcon } from 'assets/icons/Exit.svg';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { AUTH_TOKEN_STORAGE_KEY } from '../../../constants/authentication';
import { DEAUTHENTICATE_MUTATION } from '../../../graphql/authentication';
import { IDeauthenticateInput } from '../../../interfaces/authentication';
import IconButton from '../../atoms/IconButton/IconButton';
import { AUTH_LOGIN_ROUTE } from '../../../../../constants/authentication';
import { authCleanup } from 'helpers/authCleanup';
import { getCookie } from 'helpers/cookies';

interface ILogoutButton {}

const LogoutButton: FC<ILogoutButton> = () => {
  const history = useHistory();
  const [deauthenticate] = useMutation<{}, IDeauthenticateInput>(
    DEAUTHENTICATE_MUTATION,
    {
      onCompleted: () => {
        authCleanup();
        history.push(AUTH_LOGIN_ROUTE);
        window.location.reload();
      },
      onError: () => {},
    }
  );

  const handleLogout = () => {
    const accessToken = getCookie(AUTH_TOKEN_STORAGE_KEY);
    if (accessToken) {
      deauthenticate({
        variables: {
          accessToken,
        },
      });
    }
  };

  return (
    <IconButton className="LogoutButton" onClick={handleLogout}>
      <ExitIcon />
    </IconButton>
  );
};

export default LogoutButton;
