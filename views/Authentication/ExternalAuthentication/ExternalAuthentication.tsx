import { useMutation } from '@apollo/client';
import React, { FC, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Loader from '../../../components/atoms/Loader/Loader';
import {
  AUTH_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from '../../../constants/authentication';
import { AUTHENITCATE_EXTERNAL_MUTATION } from '../../../graphql/authentication';
import {
  ExternalAuthenticationActions,
  getExternalAuthenticationUrlParams,
} from '../../../helpers/externalAuthentication';
import {
  IAuthenticateExternalInput,
  IAuthenticateExternalResponse,
} from '../../../interfaces/authentication';

interface IExternalAuthentication {}

const ExternalAuthentication: FC<IExternalAuthentication> = () => {
  const location = useLocation();
  const history = useHistory();
  const {
    firstName,
    lastName,
    action,
    site,
    stageId,
    projectId,
    reportId,
    token,
  } = getExternalAuthenticationUrlParams(location.search);

  const [externalAuthenticateMutation] = useMutation<
    IAuthenticateExternalResponse,
    IAuthenticateExternalInput
  >(AUTHENITCATE_EXTERNAL_MUTATION, {
    onError: () => {
      history.push('/auth/login');
    },
    onCompleted: data => {
      if (data) {
        localStorage.setItem(
          AUTH_TOKEN_STORAGE_KEY,
          data.authenticateExternal.accessToken
        );
        localStorage.setItem(
          REFRESH_TOKEN_STORAGE_KEY,
          data.authenticateExternal.refreshToken
        );

        if (action === ExternalAuthenticationActions.INVITE) {
          const indirectInvitationUrl = `/inv?stageId=${stageId}&projectId=${projectId}`;
          history.push(indirectInvitationUrl);
        }

        if (action === ExternalAuthenticationActions.REPORT) {
          const reportUrl = `/candidate-report/${reportId}`;
          history.push(reportUrl);
        }
      }
    },
  });

  useEffect(() => {
    console.log({
      firstName: firstName || '',
      lastName: lastName || '',
      site,
      token,
    });

    externalAuthenticateMutation({
      variables: {
        firstName: firstName || '',
        lastName: lastName || '',
        site,
        token,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Loader isOverlay />;
};

export default ExternalAuthentication;
