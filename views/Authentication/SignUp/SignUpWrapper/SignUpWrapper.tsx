import { FC, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import SignUp from '../SignUp';
import {
  IGetCompanyIdInput,
  IGetCompanyIdResponse,
} from '../../../../interfaces/authentication';
import { GET_COMPANY_ID_BY_PROJECT } from '../../../../graphql/authentication';
import { AuthViews } from '../../Authentication.constants';
import { TNotification } from '../../../../interfaces/notification';
import { findProjectIdIndirectInvitationUrl } from '../../../../helpers/invitations';

export interface ISignUpWrapper {
  authPrepopulatedValues?: {
    email?: string;
    fullName?: string;
  };
  authRedirectUrl: string;
  directInvitationToken: string | undefined;
  signUpNotification?: TNotification | undefined;
  addAuthNotification: (view: AuthViews, notification: TNotification) => void;
}

const SignUpWrapper: FC<ISignUpWrapper> = ({
  authPrepopulatedValues = {},
  authRedirectUrl,
  directInvitationToken,
  signUpNotification,
  addAuthNotification,
}) => {
  const [companyId, setCompanyId] = useState<number>();
  const [getCompanyId, getCompanyIdResponse] = useLazyQuery<
    IGetCompanyIdResponse,
    IGetCompanyIdInput
  >(GET_COMPANY_ID_BY_PROJECT, {
    onCompleted(data) {
      setCompanyId(data.getCompanyId.companyId);
    },
    onError(error) {},
  });

  useEffect(() => {
    const { projectId, companyId } =
      findProjectIdIndirectInvitationUrl(authRedirectUrl);

    if (projectId) {
      getCompanyId({ variables: { id: projectId } });
      return;
    }

    setCompanyId(companyId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (companyId) {
    return (
      <SignUp
        authPrepopulatedValues={authPrepopulatedValues}
        authRedirectUrl={authRedirectUrl}
        directInvitationToken={directInvitationToken}
        signUpNotification={signUpNotification}
        addAuthNotification={addAuthNotification}
        companyId={companyId}
      />
    );
  }

  return null;
};

export default SignUpWrapper;
