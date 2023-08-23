import React, { FC } from 'react';
import { Button } from '@spotted-zebra-uk/sz-ui-shared.ui.button';
import { ResultAccessAllowedActions } from '../../../../../generated/graphql';

interface ICalibrateInterface {
  onCreateVersion: () => void;
  onUpdateStatus: () => void;
  actions: ResultAccessAllowedActions[] | null | undefined;
  onCloseHandler: () => void;
  currentUser: string;
  isScreenCompleted: boolean;
}

const CalibrationAction: FC<ICalibrateInterface> = ({
  onCreateVersion,
  onUpdateStatus,
  actions,
  onCloseHandler,
  currentUser,
  isScreenCompleted,
}) => {
  return (
    <React.Fragment>
      {!isScreenCompleted && actions!.length > 0 ? (
        actions?.map((action, key) => {
          if (action === 'CREATE')
            return (
              <Button key={key} onClick={onCreateVersion}>
                {'Save & Confirm'}
              </Button>
            );
          else if (action === 'SIGN_OFF')
            return (
              <Button key={key} onClick={onUpdateStatus}>
                {`Confirm ${currentUser}`}
              </Button>
            );
          else
            return (
              <Button key={key} color="White">
                {"I'll Make decision later"}
              </Button>
            );
        })
      ) : (
        <Button color="White" onClick={onCloseHandler}>
          {'Close'}
        </Button>
      )}
    </React.Fragment>
  );
};

export default CalibrationAction;
