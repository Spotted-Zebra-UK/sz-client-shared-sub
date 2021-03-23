/* eslint-disable global-require */
import { mount } from 'enzyme';
import { GraphQLError } from 'graphql';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import Checkbox from '../../../components/atoms/Checkbox/Checkbox';
import Input from '../../../components/atoms/Input/Input';
import PasswordInput from '../../../components/molecules/PasswordInput/PasswordInput';
import {
  AUTH_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from '../../../constants/authentication';
import Error from '../../../enums/error';
import {
  AUTHENTICATE_MUTATION,
  REGISTER_ACCOUNT,
} from '../../../graphql/authentication';
import { IRegisterAccountResponse } from '../../../interfaces/authentication';
import { TNotification } from '../../../interfaces/notification';
import { AuthViews } from '../Authentication.constants';
import SignUp from './SignUp';

const mockHistory = {
  push: jest.fn(),
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useHistory: () => mockHistory,
  useParams: jest.fn(),
}));

describe('SignUp', () => {
  const email = 'test@mail.com';
  const password = 'test-password';
  const fullName = 'Test Fullname';
  const firstName = 'Test';
  const lastName = 'Fullname';
  const invitationToken = 'test-invitation-token';
  const redirectUrl = '/redirect-url';

  const registerAccountMutationResponse: IRegisterAccountResponse = {
    registerAccount: {
      accessToken: 'test-access-token',
      refreshToken: 'test-refresh-token',
    },
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

  it('should set access and request token to local storage and redirect to provided url after successful sign up.', async () => {
    const setItemSpy = jest
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation();

    const registerAccountMutationMock = {
      request: {
        query: REGISTER_ACCOUNT,
        variables: {
          firstName,
          lastName,
          email,
          password,
          invitationToken,
        },
      },
      result: {
        data: registerAccountMutationResponse,
      },
    };

    const wrapper = mount(
      <MemoryRouter>
        <MockedProvider
          mocks={[registerAccountMutationMock]}
          addTypename={false}
        >
          <SignUp
            authRedirectUrl={redirectUrl}
            directInvitationToken={invitationToken}
            addAuthNotification={addAuthNotification}
          />
        </MockedProvider>
      </MemoryRouter>
    );

    act(() => {
      wrapper.find(Input).at(0).props().onChange(fullName, 'fullName');
      wrapper.find(Input).at(0).props().onChange(email, 'email');
      wrapper.find(PasswordInput).props().onChange(password, 'password');
      wrapper.find(Checkbox).props().onChange(true, 'isPrivacyPolicyChecked');
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
      registerAccountMutationResponse.registerAccount.accessToken
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      REFRESH_TOKEN_STORAGE_KEY,
      registerAccountMutationResponse.registerAccount.refreshToken
    );
    expect(mockHistory.push).toHaveBeenCalledWith(redirectUrl);
  });

  it('should redirect to login page and show error notification if account with provided email already exists.', async () => {
    const registerAccountMutationMock = {
      request: {
        query: REGISTER_ACCOUNT,
        variables: {
          firstName,
          lastName,
          email,
          password,
          invitationToken,
        },
      },
      result: {
        errors: [new GraphQLError(Error.EXISTING_ACCOUNT)],
      },
    };

    const wrapper = mount(
      <MemoryRouter>
        <MockedProvider
          mocks={[registerAccountMutationMock]}
          addTypename={false}
        >
          <SignUp
            authRedirectUrl={redirectUrl}
            directInvitationToken={invitationToken}
            addAuthNotification={addAuthNotification}
          />
        </MockedProvider>
      </MemoryRouter>
    );

    act(() => {
      wrapper.find(Input).at(0).props().onChange(fullName, 'fullName');
      wrapper.find(Input).at(0).props().onChange(email, 'email');
      wrapper.find(PasswordInput).props().onChange(password, 'password');
      wrapper.find(Checkbox).props().onChange(true, 'isPrivacyPolicyChecked');
    });

    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.find('form').simulate('submit', event);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      wrapper.update();
    });

    expect(addAuthNotification).toHaveBeenCalledWith(AuthViews.LOGIN, {
      color: 'Purple',
      icon: 'Idea',
      message: 'Your account has already been created',
    });
  });
});
