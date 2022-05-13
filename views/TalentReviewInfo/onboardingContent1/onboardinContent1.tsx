import {
  useUserQuery,
  useUserSettingsCreateMutation,
  useUserSettingsFindOneLazyQuery,
  useUserSettingsUpdateMutation,
} from 'generated/graphql';
import { FC } from 'react';
import ContainedButton from '../../../components/molecules/ContainedButton/ContainedButton';
import { ReactComponent as PerformanceIcon } from './ic_performance.svg';
import { ReactComponent as PotentialIcon } from './ic_potential.svg';
import { ReactComponent as ValueIcon } from './ic_values.svg';

interface IOnboardingContent1 {
  getPageCount: (count: number) => void;
}

const OnboardingContent1: FC<IOnboardingContent1> = ({ getPageCount }) => {
  const handleNextPage = () => {
    getPageCount(2);
  };

  const [userSettingsUpdate] = useUserSettingsUpdateMutation({
    onError: () => {},
  });

  const [userSettingsCreate] = useUserSettingsCreateMutation({
    onError: () => {},
  });

  const [userSettingQuery] = useUserSettingsFindOneLazyQuery({
    onError: () => {},
    onCompleted: data => {
      if (data.UserSettingsFindOne?.id) {
        userSettingsUpdate({
          variables: {
            id: data.UserSettingsFindOne?.id,
            settings: {
              TR_displayOnboarding: true,
              CM_lastVisitedModule: null,
            },
          },
        });
      } else {
        if (userResponse.data?.User) {
          userSettingsCreate({
            variables: {
              userId: userResponse.data?.User.id,
              settings: {
                TR_displayOnboarding: true,
                CM_lastVisitedModule: null,
              },
            },
          });
        }
      }
    },
  });

  const userResponse = useUserQuery({
    onError: () => {},
    onCompleted: data => {
      if (data?.User) {
        userSettingQuery({
          variables: {
            userId: data?.User.id,
          },
        });
      }
    },
  });

  return (
    <div className="TRInfoContent">
      <p className="intro">Talent Review Introduction</p>
      <p className="reviewBody">
        Welcome to the 2022 Entain Talent review process. This year we have
        launched a systematic approach to the way in which we evaluate our
        leaders at SLT, SLT-1 and SLT-2. We will be rating all leaders in
        relation to 3 domains:
      </p>
      <div className="listGroup">
        <div className="reviewList">
          <div className="iconContainer">
            <ValueIcon className="icon" />
          </div>
          <span>Their alignment with our Values</span>
        </div>
        <div className="reviewList">
          <div className="iconContainer">
            <PerformanceIcon className="icon" />
          </div>
          <span>Their level of performance</span>
        </div>
        <div className="reviewList">
          <div className="iconContainer">
            <PotentialIcon className="icon" />
          </div>
          <span>
            Their potential to operate at the next level within 12 months
          </span>
        </div>
      </div>
      <div className="btn-container">
        <ContainedButton className="center" onClick={handleNextPage}>
          Next
        </ContainedButton>
      </div>
    </div>
  );
};

export default OnboardingContent1;
