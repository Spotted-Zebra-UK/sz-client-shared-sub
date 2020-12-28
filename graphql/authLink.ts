import { ApolloLink } from '@apollo/client';
import { AUTH_TOKEN_STORAGE_KEY } from '../constants/authentication';

export const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  operation.setContext({
    headers: {
      Authorization: token && `Bearer ${token}`,
    },
  });

  return forward(operation);
});
