/* eslint-disable global-require */
import { mount } from 'enzyme';
import { GraphQLError } from 'graphql';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import Error from '../../../enums/error';
import { REQUEST_PASSWORD_RECOVERY_MUTATION } from '../../../graphql/authentication';
import { TNotification } from '../../../interfaces/notification';
import { AuthViews } from '../Authentication.constants';
import RestorePassword from './RestorePassword';

describe('RestorePassword', () => {
  let addAuthNotification: (
    view: AuthViews,
    notification: TNotification
  ) => void;

  beforeEach(() => {
    addAuthNotification = jest.fn(
      (view: AuthViews, notification: TNotification) => {}
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should show notification on password recovery request', async () => {
    const email = 'test@mail.com';
    let isRequestPasswordRecoveryMutationCalled = false;
    const requestPasswordRecoveryMutationMock = {
      request: {
        query: REQUEST_PASSWORD_RECOVERY_MUTATION,
        variables: { email },
      },
      result: () => {
        isRequestPasswordRecoveryMutationCalled = true;
        return {};
      },
    };

    const wrapper = mount(
      <MemoryRouter>
        <MockedProvider
          mocks={[requestPasswordRecoveryMutationMock]}
          addTypename={false}
        >
          <RestorePassword addAuthNotification={addAuthNotification} />
        </MockedProvider>
      </MemoryRouter>
    );
    wrapper.find('input').simulate('change', { target: { value: email } });
    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      wrapper.update();
    });

    expect(addAuthNotification).toHaveBeenCalledWith(
      AuthViews.RESTORE_PASSWORD,
      {
        icon: 'Mail',
        color: 'Blue',
        message: 'We will send you an email with a link for reset password',
      }
    );
    expect(isRequestPasswordRecoveryMutationCalled).toBe(true);
  });

  it('should handle api error', async () => {
    const email = 'test@mail.com';
    const requestPasswordRecoveryMutationMock = {
      request: {
        query: REQUEST_PASSWORD_RECOVERY_MUTATION,
        variables: { email },
      },
      result: {
        errors: [new GraphQLError(Error.EMAIL_NOT_FOUND)],
      },
    };

    const wrapper = mount(
      <MemoryRouter>
        <MockedProvider
          mocks={[requestPasswordRecoveryMutationMock]}
          addTypename={false}
        >
          <RestorePassword addAuthNotification={addAuthNotification} />
        </MockedProvider>
      </MemoryRouter>
    );

    wrapper.find('input').simulate('change', { target: { value: email } });
    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      wrapper.update();
    });

    expect(addAuthNotification).toHaveBeenCalledWith(
      AuthViews.RESTORE_PASSWORD,
      {
        icon: 'Claps',
        color: 'Purple',
        message: 'Email does not exist',
      }
    );
  });
});
