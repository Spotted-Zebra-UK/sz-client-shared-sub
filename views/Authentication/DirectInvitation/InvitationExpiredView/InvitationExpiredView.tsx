/* eslint-disable @typescript-eslint/indent */
// TODO: Uncomment when project id provided id invitation.
import React, { FC } from 'react';
// import { useQuery } from '@apollo/client';
import BubblesBackground from '../../../../components/atoms/BubblesBackground/BubblesBackground';
import Notification from '../../../../components/atoms/Notification/Notification';

// import { GET_PROJECT_BY_ID_QUERY } from '../../../graphql/project';
// import {
//   IGetProjectByIdQueryInput,
//   IGetProjectByIdQueryResponse,
// } from '../../../interfaces/project';

interface IInvitationExpiredView {
  fullName?: string;
  // projectId: number;
}

const InvitationExpiredView: FC<IInvitationExpiredView> = ({
  fullName,
  // projectId,
}) => {
  // const getProjectByIdQueryResponse = useQuery<
  //   IGetProjectByIdQueryResponse,
  //   IGetProjectByIdQueryInput
  // >(GET_PROJECT_BY_ID_QUERY, {
  //   variables: {
  //     id: projectId,
  //   },
  // });

  // if (getProjectByIdQueryResponse.data) {
  //   const { project } = getProjectByIdQueryResponse.data;

  return (
    <div>
      <BubblesBackground className="SignUp__Top__Title">
        <p className="SignUp__Top__Title__Row">Welcome</p>
        <p className="SignUp__Top__Title__Row">{fullName}!</p>
      </BubblesBackground>
      <Notification
        notification={{
          icon: 'Warning',
          color: 'Purple',
          // message: `Your invitation for ${project.name} has expired. Please contact ${project.company.name} to request a new invitation`,
          message: 'Your invitation has been expired',
        }}
      />
    </div>
  );
  // }

  // return null;
};

export default InvitationExpiredView;
