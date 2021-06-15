import { ReactElement } from 'react';

export type TNotification = {
  icon: 'Mail' | 'Idea' | 'Claps' | 'Warning';
  color: 'Blue' | 'Purple' | 'Green';
  message: String | ReactElement;
};
