import { StyleSheet } from 'react-native';

export const GlobalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 12,
    gap: 12,
  },

  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 4,
    gap: 12
  },

  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    color: '#909090',
    fontSize: 24,
    textAlign: 'center',
  },

  heading: {
    color: '#F85A3E',
    fontSize: 20,
    fontWeight: 600,
  },

  buttonPrimary: {
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F85A3E',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },

  buttonPrimaryContent: {
    color: '#fff',
    textAlign: 'center'
  },

  buttonPrimaryPressed: {
    backgroundColor: '#E85A3E'
  },

  buttonSecondary: {
    borderRadius: 4,
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#E85A3E',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#E85A3E',
  },

  buttonSecondaryPressed: {
    backgroundColor: '#EFEFEF'
  },

  buttonSecondaryContent: {
    color: '#E85A3E',
    textAlign: 'center',
  },

  link: {
    color: '#F85A3E',
    fontWeight: 600
  },

  label: {
    marginBottom: -8,
    textTransform: 'upperCase',
    fontWeight: '600',
    color: '#909090'
  },

  input: {
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#EFEFEF',
  },

  inputFocused: {
    borderColor: '#F85A3E',
  },

  inputInvalid: {
    borderColor: '#C20202',
  },

  invalidText: {
    color: '#C20202',
    flexWrap: 'wrap'
  },

  successText: {
    color: '#37872A',
    flexWrap: 'wrap'
  },

  list: {
    backgroundColor: '#fff'
  },

  listItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  pressed: {
    backgroundColor: '#EFEFEF'
  },

  mb: {
    marginBottom: 12
  },

  center: {
    margin: 'auto',
  },

  indent: {
    marginLeft: 4
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
    width:'70%'
  },

  invalidText: {
    width: '70%'
  }
})