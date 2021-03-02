/* eslint-disable global-require */
import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import Input from '../../../components/atoms/Input/Input';
import PasswordInput from '../../../components/molecules/PasswordInput/PasswordInput';
import {
  AUTH_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from '../../../constants/authentication';
import { AUTHENTICATE_MUTATION } from '../../../graphql/authentication';
import { IAuthenticateResponse } from '../../../interfaces/authentication';
import { TNotification } from '../../../interfaces/notification';
import { AuthViews } from '../Authentication.constants';
import Login from './Login';

const mockHistory = {
  push: jest.fn(),
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useHistory: () => mockHistory,
  useParams: jest.fn(),
}));

describe('Login', () => {
  const email = 'test@mail.com';
  const password = 'test-password';
  const redirectUrl = '/redirect-url';

  const authenticateMutationResponse: IAuthenticateResponse = {
    authenticate: {
      accessToken: 'test-access-token',
      refreshToken: 'test-refresh-token',
    },
  };

  let addAuthNotification: (
    view: AuthViews,
    notification: TNotification
  ) => void;
  let clearAuthViewNotifications: (view: AuthViews) => void;

  // Local storage mocks.
  let setItemSpy = jest
    .spyOn(Storage.prototype, 'setItem')
    .mockImplementation();
  // let getItemSpy;
  // let removeItemSpy;

  beforeEach(() => {
    setItemSpy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation();
    // getItemSpy = jest.spyOn(Storage.prototype, 'getItem').mockImplementation();
    // removeItemSpy = jest
    //   .spyOn(Storage.prototype, 'removeItem')
    //   .mockImplementation();

    addAuthNotification = jest.fn(
      (view: AuthViews, notification: TNotification) => {}
    );
    clearAuthViewNotifications = jest.fn((view: AuthViews) => {});
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should set access and request token to local storage and redirect to provided url after successful login.', async () => {
    const authenticateMutationMock = {
      request: {
        query: AUTHENTICATE_MUTATION,
        variables: {
          email,
          password,
        },
      },
      result: {
        data: authenticateMutationResponse,
      },
    };

    const wrapper = mount(
      <MemoryRouter>
        <MockedProvider mocks={[authenticateMutationMock]} addTypename={false}>
          <Login
            authRedirectUrl={redirectUrl}
            addAuthNotification={addAuthNotification}
            clearAuthViewNotifications={clearAuthViewNotifications}
          />
        </MockedProvider>
      </MemoryRouter>
    );

    act(() => {
      wrapper.find(Input).props().onChange(email, 'email');
      wrapper.find(PasswordInput).props().onChange(password, 'password');
    });

    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.find('form').simulate('submit', event);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      wrapper.update();
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      AUTH_TOKEN_STORAGE_KEY,
      authenticateMutationResponse.authenticate.accessToken
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      REFRESH_TOKEN_STORAGE_KEY,
      authenticateMutationResponse.authenticate.refreshToken
    );
    expect(mockHistory.push).toHaveBeenCalledWith(redirectUrl);
  });

  it('should set notification when provided invalid credentials', async () => {
    const authenticateMutationMock = {
      request: {
        query: AUTHENTICATE_MUTATION,
        variables: {
          email,
          password,
        },
      },
      result: {
        data: {},
      },
    };

    const wrapper = mount(
      <MemoryRouter>
        <MockedProvider mocks={[authenticateMutationMock]} addTypename={false}>
          <Login
            authRedirectUrl={redirectUrl}
            addAuthNotification={addAuthNotification}
            clearAuthViewNotifications={clearAuthViewNotifications}
          />
        </MockedProvider>
      </MemoryRouter>
    );

    act(() => {
      wrapper.find(Input).props().onChange(email, 'email');
      wrapper.find(PasswordInput).props().onChange(password, 'password');
    });

    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.find('form').simulate('submit', event);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      wrapper.update();
    });
  });
});
