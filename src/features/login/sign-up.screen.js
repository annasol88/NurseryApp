import { useState } from 'react';
import { View, TextInput, Pressable, Text, Image } from 'react-native';
import { GlobalStyles, LoginStyles } from '../../../styles/shared.styles';
import { auth } from '../../firebase/main'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { createParentUser } from '../../services/user.service'

export default function SignUpScreen({navigation}) {
  let [email, changeEmail] = useState('');
  let [password, changePassword] = useState('');
  let [password2, changePassword2] = useState('');

  let [emailInvalid, changeEmailInvalid] = useState('');
  let [passwordInvalid, changePasswordInvalid] = useState('');
  let [password2Invalid, changePassword2Invalid] = useState('');

  let [errorMessage, changeErrorMessage] = useState('')

  goToLogin = () => {
    navigation.goBack()
  }

  signUp = () => {
    if(!validateSignUp()) return

    // create user through firebase auth
    createUserWithEmailAndPassword(auth, email, password).then(async (uc) => {
      cleanEmail = email.trim().toLowerCase()
      await createParentUser(cleanEmail)
    }).catch((e) => {
      // handle errors from firebase auth for invalid credentials
      switch(e.code) {
        case 'auth/invalid-email': 
          changeEmailInvalid('Invalid email format.')
          break;
        case 'auth/weak-password': 
          changePasswordInvalid('Password must be at least 6 characters long.')
          break;
        case 'email-already-in-use':
          changeEmailInvalid('An account with this email already exists.')
          break;
        default: 
          changeErrorMessage('Something went wrong when trying to sign you up. Please try again later.')
          console.error(error)
          break;
      }
    })
  }

  validateSignUp = () => {
    changeEmailInvalid('')
    changePasswordInvalid('')
    changePassword2Invalid('')
    changeErrorMessage('')

    let isValid = true

    if(email == '') {
      changeEmailInvalid('Email not provided')
      isValid = false
    } 
    if(password == '') {
      changePasswordInvalid('Password not provided.')
      isValid = false
    } 
    if(password != password2) {
      changePassword2Invalid('Passwords entered do not match.')
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
        Nursery Sign Up
      </Text>

      <TextInput
        style={[GlobalStyles.input, LoginStyles.input, emailInvalid && GlobalStyles.inputInvalid]}
        onChangeText={changeEmail}
        placeholder="Enter a Valid Email Address"
        inputMode="email-address"
      />

      { emailInvalid && 
        <Text style={[GlobalStyles.invalidText, LoginStyles.invalidText]}>
          {emailInvalid}
        </Text>
      }

      <TextInput
        style={[GlobalStyles.input, LoginStyles.input, passwordInvalid && GlobalStyles.inputInvalid]}
        onChangeText={changePassword}
        placeholder="Create Password"
        inputMode="default"
        secureTextEntry={true}
      />

      { passwordInvalid && 
        <Text style={[GlobalStyles.invalidText, LoginStyles.invalidText]}>
          {passwordInvalid}
        </Text>
      }

      <TextInput
        style={[GlobalStyles.input, LoginStyles.input, password2Invalid && GlobalStyles.inputInvalid]}
        onChangeText={changePassword2}
        placeholder="Re-enter Password"
        inputMode="default"
        secureTextEntry={true}
      />

      { password2Invalid && 
        <Text style={[GlobalStyles.invalidText, LoginStyles.invalidText]}>
          {password2Invalid}
        </Text>
      }

      { errorMessage && 
        <Text style={[GlobalStyles.invalidText, LoginStyles.invalidText]}>
          {errorMessage}
        </Text>
      }

      <Pressable 
        onPress={signUp} 
        style={({pressed}) =>[
          GlobalStyles.buttonPrimary, 
          pressed && GlobalStyles.buttonPrimaryPressed
        ]}
      >
        <Text style={GlobalStyles.buttonPrimaryContent}>Sign up</Text>
      </Pressable>

      <Pressable onPress={goToLogin}>
        <Text style={GlobalStyles.link}>Back to login</Text>
      </Pressable>
    </View>
  )
}