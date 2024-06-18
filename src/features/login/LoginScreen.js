import React from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { GlobalStyles, LoginStyles } from '../../../styles/shared.styles';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/main'

export default function LoginScreen({navigation}) {
  const [email, emailChange] = React.useState('');
  const [password, passwordChange] = React.useState('');
  const [validationMessage, validationMessageChange] = React.useState('');

  login = () => {
    if(validateLogin()) {
      signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        console.log(error)
      });
    }
  }

  goToSignUp = () => {
    navigation.navigate('Sign Up')
  }

  validateLogin = () => {
    if(password == '') {
      validationMessageChange('Must enter a password')
      return false
    } 
    if(email == '') {
      validationMessageChange('Must enter email')
      return false
    } 
    return true
  }
  
  return (
    <View style={LoginStyles.screen}>
      <TextInput
        style={[GlobalStyles.input, LoginStyles.input]}
        onChangeText={emailChange}
        placeholder="Enter Email Address"
        inputMode="email-address"
      />
      <TextInput
        style={[GlobalStyles.input, LoginStyles.input]}
        onChangeText={passwordChange}
        placeholder="Enter Password"
        inputMode="default"
        secureTextEntry={true}
      />

      <Pressable onPress={login} style={GlobalStyles.buttonPrimary}>
        <Text style={GlobalStyles.buttonPrimaryContent}>Login</Text>
      </Pressable>

      <Pressable onPress={goToSignUp}>
        <Text style={GlobalStyles.link}>Not signed up? register here</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  
})