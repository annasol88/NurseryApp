import { useState } from 'react';
import { View, TextInput, Pressable, Text, Image } from 'react-native';
import { GlobalStyles, LoginStyles } from '../../../styles/shared.styles';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/main'

export default function LoginScreen({navigation}) {
  let [email, changeEmail] = useState('')
  let [password, changePassword] = useState('')
  
  let [emailInvalid, changeEmailInvalid] = useState('')
  let [passwordInvalid, changePasswordInvalid] = useState('')

  let [errorMessage, changeErrorMessage] = useState('')
  
  goToSignUp = () => {
    navigation.navigate('Sign Up')
  }

  login = () => {
    if(!validateLogin()) return
    // sign in user through firebase auth
    signInWithEmailAndPassword(auth, email, password).catch((e) => {
      switch(e.code) {
        // handle errors from firebase auth for invalid credentials
        case 'auth/invalid-email': 
          changeEmailInvalid('Invalid email format.')
          break;
        case 'auth/user-not-found':
          changeEmailInvalid('Email entered does not match any existing account.');
          break;
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
          changePasswordInvalid('Incorrect Password entered.');
          break;
        default: 
          changeErrorMessage('Something went wrong when trying to log you in. Please try again later.')
          console.error(error)
          break;
      }
    })
  }

  validateLogin = () => {
    changeEmailInvalid('')
    changePasswordInvalid('')
    changeErrorMessage('')

    let isValid = true
    
    if(email == '') {
      changeEmailInvalid('Email not provided.')
      isValid = false
    } 
    if(password == '') {
      changePasswordInvalid('Password not provided.')
      isValid = false
    } 
    return isValid
  }
  
  return (
    <View style={LoginStyles.screen}>
      <Image
        style={LoginStyles.logo}
        source={require('../../../assets/rainbow.png')}
      /> 
      <Text style={[GlobalStyles.heading, LoginStyles.heading]}>
        Nursery Login
      </Text>

      <TextInput
        style={[
          GlobalStyles.input, 
          LoginStyles.input, 
          emailInvalid && GlobalStyles.inputInvalid
        ]}
        onChangeText={changeEmail}
        placeholder="Enter Email Address"
        inputMode="email-address"
      />

      { emailInvalid && 
        <Text style={[GlobalStyles.invalidText, LoginStyles.invalidText]}>
          {emailInvalid}
        </Text>
      }
      
      <TextInput
        style={[
          GlobalStyles.input, 
          LoginStyles.input, 
          passwordInvalid && GlobalStyles.inputInvalid    
        ]}
        onChangeText={changePassword}
        placeholder="Enter Password"
        inputMode="default"
        secureTextEntry={true}
      />

      { passwordInvalid && 
        <Text style={[GlobalStyles.invalidText, LoginStyles.invalidText]}>
          {passwordInvalid}
        </Text>
      }

      { errorMessage && 
        <Text style={[GlobalStyles.invalidText, LoginStyles.invalidText]}>
          {errorMessage}
        </Text>
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
  )
}