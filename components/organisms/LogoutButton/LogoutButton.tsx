import './LogoutButton.scss';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useApolloClient, useMutation } from '@apollo/client';
import {
  AUTH_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from '../../../constants/authentication';
import { DEAUTHENTICATE_MUTATION } from '../../../graphql/authentication';
import { ReactComponent as ExitIcon } from '../../../icons/Exit.svg';
import { IDeauthenticateInput } from '../../../interfaces/authentication';
import IconButton from '../../atoms/IconButton/IconButton';

interface ILogoutButton {}

const LogoutButton: FC<ILogoutButton> = () => {
  const accessToken = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  const history = useHistory();
  const client = useApolloClient();
  const [deauthenticate] = useMutation<{}, IDeauthenticateInput>(
    DEAUTHENTICATE_MUTATION,
    {
      onCompleted: () => {
        localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
        localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
        history.push('/auth/login');
        client.resetStore();
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
    <IconButton className="LogoutButton" onClick={handleLogout}>
      <ExitIcon />
    </IconButton>
  );
};

export default LogoutButton;
