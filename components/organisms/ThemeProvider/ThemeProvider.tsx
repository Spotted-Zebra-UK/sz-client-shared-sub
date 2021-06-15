import { useQuery } from '@apollo/client';
import { FC, useEffect } from 'react';
import { GET_THEME_QUERY } from '../../../graphql/theme';
import { IThemeQuery } from '../../../interfaces/theme';

interface IThemeProvider {}

const ThemeProvider: FC<IThemeProvider> = ({ children }) => {
  const currentTheme = useQuery<IThemeQuery>(GET_THEME_QUERY);

  useEffect(() => {
    if (currentTheme.data) {
      document.body.classList.add(currentTheme.data.theme);
    }

    return () => {
      if (currentTheme.data) {
        document.body.classList.remove(currentTheme.data.theme);
      }
    };
  }, [currentTheme]);
  return null;
};

export default ThemeProvider;
