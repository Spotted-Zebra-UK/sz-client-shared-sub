import { gql } from '@apollo/client';
import { Theme } from '../enums/theme';
import { themeVar } from '../../../graphql/client';

export const GET_THEME_QUERY = gql`
  query GetTheme {
    theme @client
  }
`;

export const setTheme = (newTheme: Theme): void => {
  themeVar(newTheme);
};
