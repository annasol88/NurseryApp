import { useState } from 'react';
import { View, TextInput, Pressable, Text, Image } from 'react-native';
import { GlobalStyles, LoginStyles } from '../../../styles/shared.styles';
import { auth } from '../../firebase/main'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { createUser } from '../../services/user.service'

export default function SignUpScreen({navigation}) {
  const [email, emailChange] = useState('');
  const [password, passwordChange] = useState('');
  const [password2, password2Change] = useState('');
  const [validationMessage, validationMessageChange] = useState('');

  const [emailInvalid, emailInvalidChange] = useState(false);
  const [passwordInvalid, passwordInvalidChange] = useState(false);
  const [password2Invalid, password2InvalidChange] = useState(false);

  signUp = () => {
    if(validateSignUp()) {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        createUser(email)
      })
      .catch((error) => {
        switch(error.code) {
          case 'auth/invalid-email': 
            validationMessageChange('Invalid email format.')
            emailInvalidChange(true)
            break;
          case 'auth/weak-password': 
            validationMessageChange('Password must be at least 6 characters long.')
            passwordInvalidChange(true)
            break;
          case 'email-already-in-use':
            validationMessageChange('An account with this email already exists.')
            emailInvalidChange(true)
            break;
          default: 
            validationMessageChange('Something went wrong when trying to sign you up. Please try again later.')
            console.error(error)
            break;
        }
      });
    }
  }

  validateSignUp = () => {
    emailInvalidChange(false)
    passwordInvalidChange(false)
    password2InvalidChange(false)

    if(email == '') {
      validationMessageChange('Email not provided')
      emailInvalidChange(true)
      return false
    } else if(password == '') {
      validationMessageChange('Password not provided.')
      passwordInvalidChange(true)
      return false
    } else if(password != password2) {
      validationMessageChange('Passwords entered do not match.')
      passwordInvalidChange(true)
      password2InvalidChange(true)
      return false
    }
    return true
  }

  goToLogin = () => {
    navigation.goBack()
  }
  
  return (
    <View style={LoginStyles.screen}>
      <Image
        style={LoginStyles.logo}
        source={require('../../../assets/rainbow.png')}
      /> 
      <TextInput
        style={[GlobalStyles.input, LoginStyles.input, emailInvalid && GlobalStyles.inputInvalid]}
        onChangeText={emailChange}
        placeholder="Enter a valid Email Address"
        inputMode="email-address"
      />
      <TextInput
        style={[GlobalStyles.input, LoginStyles.input, passwordInvalid && GlobalStyles.inputInvalid]}
        onChangeText={passwordChange}
        placeholder="Create Password"
        inputMode="default"
        secureTextEntry={true}
      />
      <TextInput
        style={[GlobalStyles.input, LoginStyles.input, password2Invalid && GlobalStyles.inputInvalid]}
        onChangeText={password2Change}
        placeholder="Re-enter Password"
        inputMode="default"
        secureTextEntry={true}
      />

      { validationMessage && 
        <Text style={[GlobalStyles.invalidText, LoginStyles.invalidText]}>{validationMessage}</Text>
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
  );
}