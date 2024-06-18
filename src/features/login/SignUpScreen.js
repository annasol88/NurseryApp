import React from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { GlobalStyles, LoginStyles } from '../../../styles/shared.styles';
import { auth } from '../../firebase/main'
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignUpScreen({navigation}) {
  const [email, emailChange] = React.useState('');
  const [password, passwordChange] = React.useState('');
  const [password2, password2Change] = React.useState('');
  const [validationMessage, validationMessageChange] = React.useState('');

  signUp = () => {
    if(validateSignUp()) {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
      })
      .catch((error) => {
        console.log(error)
        validationMessageChange('')
      });
    }
  }

  validateSignUp = () => {
    if(password == '') {
        validationMessageChange('Password entered does not match')
        return false
    } else if(password != password2) {
        validationMessageChange('Password entered does not match re-entered password')
        return false
    }
    return true
  }

  goToLogin = () => {
    navigation.goBack()
  }
  
  return (
    <View style={LoginStyles.screen}>
      <TextInput
        style={[GlobalStyles.input, LoginStyles.input]}
        onChangeText={emailChange}
        placeholder="Enter a Valid Email Address"
        inputMode="email-address"
      />
      <TextInput
        style={[GlobalStyles.input, LoginStyles.input]}
        onChangeText={passwordChange}
        placeholder="Create Password"
        inputMode="default"
        textContentType="password"
        secureTextEntry={true}
      />
      <TextInput
        style={[GlobalStyles.input, LoginStyles.input]}
        onChangeText={password2Change}
        placeholder="Re-enter Password"
        inputMode="default"
        secureTextEntry={true}
      />

      <Pressable onPress={signUp} style={GlobalStyles.buttonPrimary}>
        <Text style={GlobalStyles.buttonPrimaryContent}>Sign up</Text>
      </Pressable>

      <Pressable onPress={goToLogin}>
        <Text style={GlobalStyles.link}>Back to login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
 
})