import './DirectInvitation.scss';
import React, { FC } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
/* eslint-disable @typescript-eslint/indent */
import { useQuery } from '@apollo/client';
import Loader from '../../../components/atoms/Loader/Loader';
import { GET_INVITATION_STATUS_QUERY } from '../../../graphql/directInvitation';
import { parseInvitationToken } from '../../../helpers/invitations';
import {
  IGetInvitationStatusQueryInput,
  IGetInvitationStatusQueryResponse,
} from '../../../interfaces/invitation';
import { TNotification } from '../../../interfaces/notification';
import { authenticationRoutes } from '../../../navigation/AuthNavigation/authNavigation.constants';
import { AuthViews } from '../Authentication.constants';
import InvitationExpiredView from './InvitationExpiredView/InvitationExpiredView';

interface IDirectInvitation {
  addAuthNotification: (view: AuthViews, notification: TNotification) => void;
  setAuthPrepopulatedValues: (fullName: string, email: string) => void;
  setDirectInvitationToken: (token: string | undefined) => void;
}

const DirectInvitation: FC<IDirectInvitation> = ({
  addAuthNotification,
  setAuthPrepopulatedValues,
  setDirectInvitationToken,
}) => {
  const location = useLocation();
  const invitationData = parseInvitationToken(location.search);
  const getInvitationStatusQueryResponse = useQuery<
    IGetInvitationStatusQueryResponse,
    IGetInvitationStatusQueryInput
  >(GET_INVITATION_STATUS_QUERY, {
    variables: {
      invitationToken: invitationData?.token || '',
    },
    onError: () => {},
  });

  if (getInvitationStatusQueryResponse.loading) {
    return (
      <div className="DirectInvitation__LoaderWrapper">
        <Loader />
      </div>
    );
  }

  if (getInvitationStatusQueryResponse.data) {
    const {
      isCompleted,
      isExpired,
    } = getInvitationStatusQueryResponse.data.getInvitationStatus;
    if (isExpired) {
      // If invitation is expired and user should be notified.
      return (
        <InvitationExpiredView
          fullName={invitationData?.candidateData.fullName}
        />
      );
    }

    if (isCompleted) {
      // If invitation is completed, user should be redirected to login view and
      // form should be prepopulated.
      if (invitationData) {
        setAuthPrepopulatedValues(
          invitationData.candidateData.fullName,
          invitationData.candidateData.email
        );
      }
      addAuthNotification(AuthViews.LOGIN, {
        icon: 'Idea',
        color: 'Green',
        message: 'Your account has already been created',
      });
      return <Redirect to={authenticationRoutes.login} />;
    }

    // If invitation is not completed user should be redirected to sign up view and
    // form should be prepopulated.
    if (invitationData) {
      setAuthPrepopulatedValues(
        invitationData.candidateData.fullName,
        invitationData.candidateData.email
      );
      setDirectInvitationToken(invitationData.token);
    }
    addAuthNotification(AuthViews.SIGN_UP, {
      color: 'Blue',
      icon: 'Claps',
      message:
        'Thank you for accepting the invitation, please create your account below',
    });
    return <Redirect to={authenticationRoutes.signUp} />;
  }

  return <Redirect to={authenticationRoutes.signUp} />;
};

export default DirectInvitation;
