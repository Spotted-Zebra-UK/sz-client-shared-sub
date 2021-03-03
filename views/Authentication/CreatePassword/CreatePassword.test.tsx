/* eslint-disable global-require */
import { mount } from 'enzyme';
import { GraphQLError } from 'graphql';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import Error from '../../../enums/error';
import { UPDATE_IDENTITY_PASSWORD_MUTATION } from '../../../graphql/authentication';
import { TNotification } from '../../../interfaces/notification';
import { authenticationRoutes } from '../../../navigation/AuthNavigation/authNavigation.constants';
import { AuthViews } from '../Authentication.constants';
import CreatePassword from './CreatePassword';

const mockHistory = {
  push: jest.fn(),
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useHistory: () => mockHistory,
  Redirect: () => <div>Redirect</div>,
}));

describe('CreatePassword', () => {
  const recoveryToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmtvLmxqdWJpY0BzcG90dGVkemVicmEuY28udWsiLCJpYXQiOjE2MDMxMTgxNzQsImV4cCI6MTYwMzEyMTc3NH0.p19DO5pIaeIkaJu5mWlqNwYYfbKxwLbD5Bd0qJjsrQM';
  const search = `?token=${recoveryToken}`;
  const newPassword = 'testpassword';

  const updateIdentityPasswordMutationResponse = {
    updateIdentityPassword: true,
  };

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

  it('should redirect to login view and show notification on password update.', async () => {
    const { useLocation } = require('react-router-dom');
    useLocation.mockImplementation(() => ({ search }));

    const updateIdentityPasswordMutationMock = {
      request: {
        query: UPDATE_IDENTITY_PASSWORD_MUTATION,
        variables: {
          recoveryToken,
          newPassword,
        },
      },
      result: {
        data: updateIdentityPasswordMutationResponse,
      },
    };

    const wrapper = mount(
      <MemoryRouter>
        <MockedProvider mocks={[updateIdentityPasswordMutationMock]}>
          <CreatePassword addAuthNotification={addAuthNotification} />
        </MockedProvider>
      </MemoryRouter>
    );

    wrapper
      .find('input')
      .simulate('change', { target: { value: newPassword } });
    wrapper.find('form').simulate('submit', { event: jest.fn() });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(addAuthNotification).toHaveBeenCalledWith(AuthViews.LOGIN, {
      color: 'Blue',
      icon: 'Claps',
      message: 'Your password was successfully changed',
    });
    expect(mockHistory.push).toHaveBeenCalledWith(authenticationRoutes.login);
  });

  it('should show notification if invalid recovery token provided.', async () => {
    const { useLocation } = require('react-router-dom');
    useLocation.mockImplementation(() => ({ search }));

    const updateIdentityPasswordMutationMock = {
      request: {
        query: UPDATE_IDENTITY_PASSWORD_MUTATION,
        variables: {
          recoveryToken,
          newPassword,
        },
      },
      result: {
        errors: [new GraphQLError(Error.RECOVERY_TOKEN_EXPIRED_OR_INVALID)],
      },
    };

    const wrapper = mount(
      <MemoryRouter>
        <MockedProvider mocks={[updateIdentityPasswordMutationMock]}>
          <CreatePassword addAuthNotification={addAuthNotification} />
        </MockedProvider>
      </MemoryRouter>
    );

    wrapper
      .find('input')
      .simulate('change', { target: { value: newPassword } });
    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      wrapper.update();
    });

    expect(addAuthNotification).toHaveBeenCalledWith(
      AuthViews.CREATE_PASSWORD,
      {
        icon: 'Claps',
        color: 'Purple',
        message: 'Recovery token is invalid or has been expired',
      }
    );
    expect(mockHistory.push).not.toHaveBeenCalled();
  });
});
