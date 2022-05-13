import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import {
  UserSettingsOptionsArgs,
  useUserQuery,
  useUserSettingsCreateMutation,
  useUserSettingsFindOneQuery,
  useUserSettingsUpdateMutation,
} from '../../../generated/graphql';

interface IUserSettings {
  settings: UserSettingsOptionsArgs;
  redirectTo: string;
}

const UserSettings: FC<IUserSettings> = ({ settings, redirectTo }) => {
  const user = useUserQuery();
  const history = useHistory();
  const userId = user.data?.User.id as number;
  const UserSettingsFindOneResponse = useUserSettingsFindOneQuery({
    variables: {
      userId: user.data?.User.id,
    },
  });

  const [UserSettingsCreate] = useUserSettingsCreateMutation({
    onCompleted: () => {
      history.push(redirectTo);
    },
  });

  const [UserSettingsUpdate] = useUserSettingsUpdateMutation({
    onCompleted: () => {
      history.push(redirectTo);
    },
  });

  if (UserSettingsFindOneResponse.data) {
    UserSettingsUpdate({
      variables: {
        id: UserSettingsFindOneResponse.data.UserSettingsFindOne?.id as number,
        settings,
      },
    });
  } else {
    UserSettingsCreate({
      variables: {
        userId,
        settings,
      },
    });
  }

  return null;
};

export default UserSettings;
