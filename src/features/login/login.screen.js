import { useState } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import { GlobalStyles, LoginStyles } from '../../../styles/shared.styles';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/main'

export default function LoginScreen({navigation}) {
  const [email, emailChange] = useState('');
  const [password, passwordChange] = useState('');
  const [validationMessage, validationMessageChange] = useState('');
  const [emailInvalid, emailInvalidChange] = useState(false)
  const [passwordInvalid, passwordInvalidChange] = useState(false)

  login = () => {
    if(validateLogin()) {
      signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        switch(error.code) {
          case 'auth/invalid-email': 
            validationMessageChange('Invalid email format.')
            emailInvalidChange(true)
            break;
          case 'auth/user-not-found':
            validationMessageChange('Email entered does not match any existing account.')
            emailInvalidChange(true);
            break;
          case 'auth/invalid-credential':
            validationMessageChange('Incorrect Password entered.')
            passwordInvalidChange(true);
            break;
          default: 
            validationMessageChange('Something went wrong when trying to sign you up. Please try again later.')
            console.error(error)
            break;
        }
      });
    }
  }

  goToSignUp = () => {
    navigation.navigate('Sign Up')
  }

  validateLogin = () => {
    emailInvalidChange(false)
    passwordInvalidChange(false)
    
    if(email == '') {
      emailInvalidChange(true)
      validationMessageChange('Email not provided.')
      return false
    } 
    if(password == '') {
      passwordInvalidChange(true)
      validationMessageChange('Password not provided.')
      return false
    } 
    return true
  }
  
  return (
    <View style={LoginStyles.screen}>
      <TextInput
        style={[
          GlobalStyles.input, 
          LoginStyles.input, 
          emailInvalid && GlobalStyles.inputInvalid
        ]}
        onChangeText={emailChange}
        placeholder="Enter Email Address"
        inputMode="email-address"
      />
      <TextInput
        style={[
          GlobalStyles.input, 
          LoginStyles.input, 
          passwordInvalid && GlobalStyles.inputInvalid    
        ]}
        onChangeText={passwordChange}
        placeholder="Enter Password"
        inputMode="default"
        secureTextEntry={true}
      />

      { validationMessage && 
        <Text style={[GlobalStyles.invalidText, LoginStyles.invalidText]}>{validationMessage}</Text>
      }

      <Pressable onPress={login} style={({pressed}) =>[
        GlobalStyles.buttonPrimary, 
        pressed && GlobalStyles.buttonPrimaryPressed
      ]}>
        <Text style={GlobalStyles.buttonPrimaryContent}>Login</Text>
      </Pressable>


      <Text>Don't have an account? 
        <Pressable onPress={goToSignUp} style={GlobalStyles.indent}>
          <Text style={GlobalStyles.link}>register here</Text>
        </Pressable>
      </Text>
    </View>
  );
}