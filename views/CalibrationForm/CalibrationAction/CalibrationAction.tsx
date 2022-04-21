import React, { FC } from 'react';
import { ResultAccessAllowedActions } from '../../../../../generated/graphql';
import SquareButton from '../../../components/molecules/SquareButton/SquareButton';

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
              <SquareButton key={key} onClick={onCreateVersion}>
                {'Save & Apply'}
              </SquareButton>
            );
          else if (action === 'SIGN_OFF')
            return (
              <SquareButton key={key} onClick={onUpdateStatus}>
                {`Confirm ${currentUser}`}
              </SquareButton>
            );
          else
            return (
              <SquareButton key={key} color="White">
                {"I'll Make decision later"}
              </SquareButton>
            );
        })
      ) : (
        <SquareButton color="White" onClick={onCloseHandler}>
          {'Close'}
        </SquareButton>
      )}
    </React.Fragment>
  );
};

export default CalibrationAction;
