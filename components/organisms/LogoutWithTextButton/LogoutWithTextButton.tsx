import './LogoutWithTextButton.scss';
import IC_EXIT from 'assets/icons/ic_logout.svg';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { AUTH_TOKEN_STORAGE_KEY } from '../../../constants/authentication';
import { DEAUTHENTICATE_MUTATION } from '../../../graphql/authentication';
import { IDeauthenticateInput } from '../../../interfaces/authentication';
import IconButton from '../../atoms/IconButton/IconButton';
import { AUTH_LOGIN_ROUTE } from '../../../../../constants/authentication';
import { authCleanup } from 'helpers/authCleanup';
import Cookies from 'js-cookie';

interface ILogoutButton {}

const LogoutButton: FC<ILogoutButton> = () => {
  const history = useHistory();
  const [deauthenticate] = useMutation<{}, IDeauthenticateInput>(
    DEAUTHENTICATE_MUTATION,
    {
      onCompleted: () => {
        authCleanup();
        localStorage.removeItem('filters');
        let redirectFrom = localStorage.getItem('redirectFrom');
        let onCompleted = localStorage.getItem('onCompleted');
        if (redirectFrom && onCompleted) {
          localStorage.removeItem('redirectFrom');
          localStorage.removeItem('onCompleted');
          localStorage.removeItem('filters');
          window.open(`${redirectFrom}`, '_self');
        } else {
          history.push(AUTH_LOGIN_ROUTE);
          window.location.reload();
        }
      },
      onError: () => {},
    }
  );

  const handleLogout = () => {
    const accessToken = Cookies.get(AUTH_TOKEN_STORAGE_KEY);
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

      <div
        style={{
          marginLeft: '12.5px',
          cursor: 'pointer',
          color: '#656565',
          fontSize: 15,
        }}
      >
        Log out
      </div>
    </div>
  );
};

export default LogoutButton;
