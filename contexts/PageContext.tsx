/* eslint-disable @typescript-eslint/indent */
import _ from 'lodash';
import React, { FC, useState } from 'react';

export const PagesContext = React.createContext<{
  pages: { [key in string]: number };
  addPage: (pageKey: string, pageNumber?: number) => void;
}>({ pages: {}, addPage: () => {} });

export const PagesContextStore: FC = ({ children }) => {
  const [pages, setPages] = useState<{ [key in string]: number }>({});

  const addPage = (pageKey: string, pageNumber?: number) => {
    setPages(prevPages => ({
      ...prevPages,
      [pageKey]: pageNumber || _.values(prevPages).length + 1,
    }));
  };

  return (
    <PagesContext.Provider value={{ pages, addPage }}>
      {children}
    </PagesContext.Provider>
  );
};
