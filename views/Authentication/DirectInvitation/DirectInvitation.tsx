import './DirectInvitation.scss';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, useLocation } from 'react-router-dom';
import { useGetInvitationStatusQuery } from '../../../../../generated/graphql';
import Loader from '../../../components/atoms/Loader/Loader';
import { parseInvitationToken } from '../../../helpers/invitations';
import { TNotification } from '../../../interfaces/notification';
import { authenticationRoutes } from '../../../navigation/AuthNavigation/authNavigation.constants';
import { AuthViews } from '../Authentication.constants';
import InvitationExpiredView from './InvitationExpiredView/InvitationExpiredView';
import {
  useAuthAppRedirect,
  AUTH_APP_ROUTES,
} from '../../../hooks/useAuthAppRedirect';

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
  const { t } = useTranslation();
  const location = useLocation();
  const invitationData = parseInvitationToken(location.search);
  const getInvitationStatusQueryResponse = useGetInvitationStatusQuery({
    variables: {
      invitationToken: invitationData?.token || '',
    },
    onError: () => {},
  });

  const loading = useAuthAppRedirect(AUTH_APP_ROUTES.SIGNUP, {
    'direct-inv': invitationData?.token || '',
  });

  if (getInvitationStatusQueryResponse.loading || loading) {
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
        message: t(
          'authentication.directInvitation.yourAccountHasAlreadyBeenCreated'
        ),
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
      message: t(
        'authentication.directInvitation.thankYouForAcceptingTheInvitation'
      ),
    });
    return <Redirect to={authenticationRoutes.signUp} />;
  }

  return <Redirect to={authenticationRoutes.signUp} />;
};

export default DirectInvitation;
