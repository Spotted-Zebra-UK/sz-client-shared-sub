import { FC, useEffect, useState } from 'react';
import { useCompanyIdByProjectLazyQuery } from '../../../../../../generated/graphql';
import { findProjectIdIndirectInvitationUrl } from '../../../../helpers/invitations';
import { TNotification } from '../../../../interfaces/notification';
import { AuthViews } from '../../Authentication.constants';
import SignUp from '../SignUp';

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
  const [getCompanyId] = useCompanyIdByProjectLazyQuery({
    onCompleted: data => {
      console.log('query completed');
      setCompanyId(data.getCompanyId.companyId);
    },
    onError: error => {
      console.log('query failed');
    },
  });

  useEffect(() => {
    const { projectId, companyId } =
      findProjectIdIndirectInvitationUrl(authRedirectUrl);

    if (projectId) {
      getCompanyId({ variables: { id: projectId } });
      return;
    } else {
      console.log('project id not found');
    }

    setCompanyId(companyId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log('companyId', companyId);
  if (companyId || !directInvitationToken) {
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
