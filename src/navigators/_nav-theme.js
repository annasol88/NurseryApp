import { DefaultTheme } from '@react-navigation/native';

// Theme for consistent coloured back buttons in app navigation
export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#F85A3E',
  },
};