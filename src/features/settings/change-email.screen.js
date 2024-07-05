import { useState } from 'react';
import { TextInput, Pressable, Text, View, ActivityIndicator, ScrollView } from 'react-native';
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

  let [emailInvalid, changeEmailInvalid] = useState('');
  let [passwordInvalid, changePasswordInvalid] = useState('');

  saveClicked = async () => {
    if(!validate()) return 

    changeLoading(true)

    // create firebase auth credential
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    )

    try {
      // if user has not logged in for a while email update will fail
      // reauthentication will prevent this. 
      await reauthenticateWithCredential(auth.currentUser, credential)
      // update email in firebase auth
      await updateEmail(auth.currentUser, email)
      // update email in firebase DB
      cleanEmail = email.trim().toLowerCase()
      await updateUserEmail(currentUser.email, cleanEmail)

      changeSuccess(true)

      EventRegister.emit('userUpdate', cleanEmail)

      setTimeout(()=> {
        changeSuccess(false)
      }, 5000)
      
    } catch(e) {
      // handle errors from firebase auth for invalid email change
      switch(e.code) {
        // firebase throws differend error codes on change email/change password/login - all are accounted to be safe 
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
        case 'auth/invalid-password':
          changePasswordInvalid('Incorrect Password entered.')
          break;
        case 'auth/email-already-in-use':
          changeEmailInvalid('An account with this email already exists.')
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
    changeEmailInvalid('')
    changePasswordInvalid('')

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

  if(isLoading) {
    return <ActivityIndicator style={GlobalStyles.center} size='large' color='#F85A3E' />
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
            placeholder='Enter a new email address for this account.'
          />

          { emailInvalid && 
            <Text style={GlobalStyles.invalidText}>{emailInvalid}</Text>
          }

          <Text style={GlobalStyles.label}>Enter password:</Text>
          <TextInput
            style={[GlobalStyles.input, passwordInvalid && GlobalStyles.inputInvalid]}
            onChangeText={changePassword}
            placeholder='Enter password associated with this email.'
            secureTextEntry={true}
          />

          { passwordInvalid && 
            <Text style={GlobalStyles.invalidText}>{passwordInvalid}</Text>
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