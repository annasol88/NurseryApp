import { StyleSheet } from 'react-native';

export const GlobalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    margin: 12,
  },

  container: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 22,
    borderRadius: 4
  },

  buttonPrimary: {
    borderRadius: 25,
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: '#F85A3E',
    textAlign: 'center',
  },

  buttonPrimaryContent: {
    color: '#fff',
  },

  buttonSecondary: {
    borderRadius: 25,
    paddingHorizontal: 24,
    paddingVertical: 8,
    color: '#F85A3E',
    backgroundColor: '#fff',
  },

  link: {
    color: '#F85A3E',
    fontWeight: 600
  },

  input: {
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff'
  },

  inputFocused: {
    borderColor: '#F85A3E',
  }
});

export const LoginStyles = StyleSheet.create({
  screen: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },

  input: {
    width:'40%'
  }
})