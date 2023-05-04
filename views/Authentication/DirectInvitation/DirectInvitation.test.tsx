/* eslint-disable global-require */
import { mount } from 'enzyme';
import { GraphQLError } from 'graphql';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Redirect } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import Loader from '../../../components/atoms/Loader/Loader';
import Error from '../../../enums/error';
import { GET_INVITATION_STATUS_QUERY } from '../../../graphql/directInvitation';
import { TNotification } from '../../../interfaces/notification';
import { authenticationRoutes } from '../../../navigation/AuthNavigation/authNavigation.constants';
import { AuthViews } from '../Authentication.constants';
import DirectInvitation from './DirectInvitation';
import InvitationExpiredView from './InvitationExpiredView/InvitationExpiredView';

const mockHistory = {
  push: jest.fn(),
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useHistory: () => mockHistory,
  Redirect: () => <div>Redirect</div>,
}));

describe('DirectInvitation', () => {
  const invitationToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnZpdGF0aW9uRGF0YSI6eyJmaXJzdE5hbWUiOiJNYXJrbyIsImxhc3ROYW1lIjoiTGp1YmljIiwiZW1haWwiOiJtYXJrby5sanViaWNAc3BvdHRlZHplYnJhLmNvLnVrIn0sImlhdCI6MTYwMTkzMDA3Mn0.siJi95iSrtFPowW0X9Y3wdwt1FLCo8RoLpTdWDNb9Jo';
  const search = `?inv=${invitationToken}`;

  let addAuthNotification: (
    view: AuthViews,
    notification: TNotification
  ) => void;
  let setAuthPrepopulatedValues: (fullName: string, email: string) => void;
  let setDirectInvitationToken: (token: string | undefined) => void;

  beforeEach(() => {
    addAuthNotification = jest.fn(
      (view: AuthViews, notification: TNotification) => {}
    );
    setAuthPrepopulatedValues = jest.fn(
      (fullName: string, email: string) => {}
    );
    setDirectInvitationToken = jest.fn((token: string | undefined) => {});
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render expired view if invitation expired', async () => {
    const { useLocation } = require('react-router-dom');
    useLocation.mockImplementation(() => ({
      search,
    }));

    const getInvitationStatusMock = {
      request: {
        query: GET_INVITATION_STATUS_QUERY,
        variables: { invitationToken },
      },
      result: {
        data: {
          getInvitationStatus: {
            isCompleted: false,
            isExpired: true,
          },
        },
      },
    };

    const wrapper = mount(
      <MockedProvider mocks={[getInvitationStatusMock]} addTypename={false}>
        <DirectInvitation
          addAuthNotification={addAuthNotification}
          setAuthPrepopulatedValues={setAuthPrepopulatedValues}
          setDirectInvitationToken={setDirectInvitationToken}
        />
      </MockedProvider>
    );

    expect(wrapper.find(Loader)).toHaveLength(1);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      wrapper.update();
    });

    expect(wrapper.find(InvitationExpiredView)).toHaveLength(1);
  });

  it('should redirect to login if invitation completed', async () => {
    const { useLocation } = require('react-router-dom');
    useLocation.mockImplementation(() => ({
      search,
    }));

    const getInvitationStatusMock = {
      request: {
        query: GET_INVITATION_STATUS_QUERY,
        variables: { invitationToken },
      },
      result: {
        data: {
          getInvitationStatus: {
            isCompleted: true,
            isExpired: false,
          },
        },
      },
    };

    const wrapper = mount(
      <MockedProvider mocks={[getInvitationStatusMock]} addTypename={false}>
        <DirectInvitation
          addAuthNotification={addAuthNotification}
          setAuthPrepopulatedValues={setAuthPrepopulatedValues}
          setDirectInvitationToken={setDirectInvitationToken}
        />
      </MockedProvider>
    );

    expect(wrapper.find(Loader)).toHaveLength(1);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      wrapper.update();
    });
    expect(wrapper.find(Loader)).toHaveLength(0);
    expect(wrapper.find(Redirect)).toHaveLength(1);
    expect(wrapper.find(Redirect).props().to).toEqual(
      authenticationRoutes.login
    );
    expect(setAuthPrepopulatedValues).toHaveBeenCalled();
    expect(addAuthNotification).toHaveBeenCalledWith(AuthViews.LOGIN, {
      icon: 'Idea',
      color: 'Green',
      message: 'Your account has already been created',
    });
  });

  it('should redirect to sign up view and provide invitation data', async () => {
    const { useLocation } = require('react-router-dom');
    useLocation.mockImplementation(() => ({
      search,
    }));

    const getInvitationStatusMock = {
      request: {
        query: GET_INVITATION_STATUS_QUERY,
        variables: { invitationToken },
      },
      result: {
        data: {
          getInvitationStatus: {
            isCompleted: false,
            isExpired: false,
          },
        },
      },
    };

    const wrapper = mount(
      <MemoryRouter>
        <MockedProvider mocks={[getInvitationStatusMock]} addTypename={false}>
          <DirectInvitation
            addAuthNotification={addAuthNotification}
            setAuthPrepopulatedValues={setAuthPrepopulatedValues}
            setDirectInvitationToken={setDirectInvitationToken}
          />
        </MockedProvider>
      </MemoryRouter>
    );

    expect(wrapper.find(Loader)).toHaveLength(1);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      wrapper.update();
    });
    expect(wrapper.find(Loader)).toHaveLength(0);
    expect(wrapper.find(Redirect)).toHaveLength(1);
    expect(wrapper.find(Redirect).props().to).toEqual(
      authenticationRoutes.signUp
    );
    expect(setAuthPrepopulatedValues).toHaveBeenCalled();
    expect(addAuthNotification).toHaveBeenCalledWith(AuthViews.SIGN_UP, {
      color: 'Blue',
      icon: 'Claps',
      message:
        'Thank you for accepting the invitation, please create your account below',
    });
    expect(setDirectInvitationToken).toHaveBeenCalledWith(invitationToken);
  });

  it('should redirect to sign up view on error', async () => {
    const { useLocation } = require('react-router-dom');
    useLocation.mockImplementation(() => ({
      search,
    }));

    const getInvitationStatusMock = {
      request: {
        query: GET_INVITATION_STATUS_QUERY,
        variables: { invitationToken },
      },
      result: {
        errors: [new GraphQLError('Error')],
      },
    };

    const wrapper = mount(
      <MemoryRouter>
        <MockedProvider mocks={[getInvitationStatusMock]} addTypename={false}>
          <DirectInvitation
            addAuthNotification={addAuthNotification}
            setAuthPrepopulatedValues={setAuthPrepopulatedValues}
            setDirectInvitationToken={setDirectInvitationToken}
          />
        </MockedProvider>
      </MemoryRouter>
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      wrapper.update();
    });

    expect(wrapper.find(Redirect)).toHaveLength(1);
    expect(wrapper.find(Redirect).props().to).toEqual(
      authenticationRoutes.signUp
    );
  });
});
