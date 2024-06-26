import { useState } from "react";
import { TextInput, Pressable, Text, View, ActivityIndicator, ScrollView } from "react-native";
import { updateEmail, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { EventRegister } from 'react-native-event-listeners'

import { GlobalStyles } from '../../../styles/shared.styles';
import { auth } from '../../firebase/main'
import { useUserContext } from '../../contexts/user.context';
import { updateUserEmail } from '../../services/user.service'

export default function ChangeEmailScreen() {
  let {currentUser} = useUserContext()

  let [email, changeEmail] = useState(currentUser.email);
  let [password, changePassword] = useState('');

  let [isLoading, changeLoading] = useState(false);
  let [error, changeError] = useState(false);
  let [success, changeSuccess] = useState(false);

  let [validationMessage, changeValidationMessage] = useState('');
  let [emailInvalid, changeEmailInvalid] = useState(false);
  let [passwordInvalid, changePasswordInvalid] = useState(false);

  saveClicked = async () => {
    if(!validate()) { return }
    changeLoading(true)

    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    )

    try {
      await reauthenticateWithCredential(auth.currentUser, credential)
      await updateEmail(auth.currentUser, email)
      await updateUserEmail(currentUser.email, email)
      changeSuccess(true)
      EventRegister.emit('userUpdate', currentUser)

      setTimeout(()=> {
        changeSuccess(false)
      }, 5000)
    } catch(e) {
      switch(e.code) {
        case 'auth/invalid-credential':
          changeValidationMessage('Incorrect Password entered.')
          changePasswordInvalid(true);
          break;
        case 'email-already-in-use':
          changeValidationMessage('An account with this email already exists.')
          changeEmailInvalid(true)
          break;
        default: 
          changeError(true)
          console.error(e)
          break;
      }
    } finally {
      changeLoading(false)
    }
  }
  
  validate = () => {
    changeValidationMessage('')
    changePasswordInvalid(false)

    if(email == '') {
      changeValidationMessage('Email not provided.')
      changeEmailInvalid(true)
      return false
    } else if(password == '') {
      changeValidationMessage('Password not provided. We need this to authenticate you')
      changePasswordInvalid(true)
      return false
    }
    return true
  }

  if(isLoading) {
    return <ActivityIndicator style={GlobalStyles.center} size="large" color="#F85A3E" />
  }  
  
  if(error) {
    return (
      <View style={[GlobalStyles.container, GlobalStyles.empty]}>
        <Text style={GlobalStyles.emptyText}>Something went wrong updating your email address. Please try again later.</Text>
      </View>
    )
  } 

  if(success) {
    return (
      <View style={[GlobalStyles.container, GlobalStyles.empty]}>
        <Text style={[GlobalStyles.emptyText, GlobalStyles.successText]}>Email Updated Successfully!</Text>
      </View>
    )
  } 

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}>
      <View style={GlobalStyles.screen}>
        <View style={GlobalStyles.container}>
          <Text style={GlobalStyles.label}>Enter New Email:</Text>
          <TextInput
            style={[GlobalStyles.input, emailInvalid && GlobalStyles.inputInvalid]}
            onChangeText={changeEmail}
            value={email}
            placeholder="Enter a new email address for this account."
          />

          <Text style={GlobalStyles.label}>Enter password:</Text>
          <TextInput
            style={[GlobalStyles.input, passwordInvalid && GlobalStyles.inputInvalid]}
            onChangeText={changePassword}
            placeholder="Enter password associated with this email."
            secureTextEntry={true}
          />

          { validationMessage && 
            <Text style={GlobalStyles.invalidText}>{validationMessage}</Text>
          }

          <Pressable 
            onPress={saveClicked} 
            style={({pressed}) => [GlobalStyles.buttonPrimary, pressed && GlobalStyles.buttonPrimaryPressed]}
            >
              <Text style={GlobalStyles.buttonPrimaryContent}>Save</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  )
}