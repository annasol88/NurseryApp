import { useState } from 'react';
import { TextInput, Pressable, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

import { GlobalStyles } from '../../../styles/shared.styles';
import { auth } from '../../firebase/main'

export default function ChangePasswordScreen() {
  let [currentPassword, changeCurrentPassword] = useState('');
  let [password, changePassword] = useState('');
  let [password2, changePassword2] = useState('');

  let [isLoading, changeLoading] = useState(false);
  let [error, changeError] = useState(false);
  let [success, changeSuccess] = useState(false);

  let [currentPasswordInvalid, changeCurrentPasswordInvalid] = useState('');
  let [passwordInvalid, changePasswordInvalid] = useState('');
  let [password2Invalid, changePassword2Invalid] = useState('');

  saveClicked = async () => {
    if(!validate()) return 
    changeLoading(true)

    // create firebase auth credential
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      currentPassword
    )

    try {
      // if user has not logged in for a while password update will fail
      // reauthentication will prevent this. 
      await reauthenticateWithCredential(auth.currentUser, credential)
      await updatePassword(auth.currentUser, password)

      changeSuccess(true)

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
          changeCurrentPasswordInvalid('Incorrect Password entered.')
          break;
        default: 
          changeError(true)
          console.error(error)
          break;
      }
    } finally {
      changeLoading(false)
    }  
  }
  
  validate = () => {
    changePasswordInvalid('')
    changePassword2Invalid('')
    changeCurrentPasswordInvalid('')

    let isValid = true

    if(currentPassword == '') {
      changeCurrentPasswordInvalid('Password not provided.')
      isValid = false
    } 

    if(password == '') {
      changePasswordInvalid('New Password not provided.')
      isValid = false
    } else if(password.length < 6) {
      changePasswordInvalid('Weak password. Password must be at least 6 characters long.')
      isValid = false
    }

    if(password != password2) {
      changePassword2Invalid('Re-entered password does not match.')
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
        <Text style={GlobalStyles.emptyText}>Something went wrong updating your password. Please try again later</Text>
      </View>
    )
  } 

  if(success) {
    return (
      <View style={[GlobalStyles.container, GlobalStyles.empty]}>
        <Text style={[GlobalStyles.emptyText, GlobalStyles.successText]}>Password Updated Successfully!</Text>
      </View>
    )
  } 

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}>
      <View style={GlobalStyles.screen}>
        <View style={GlobalStyles.container}>
        <Text style={GlobalStyles.label}>Enter Current Password:</Text>
          <TextInput
            style={[GlobalStyles.input, currentPasswordInvalid && GlobalStyles.inputInvalid]}
            onChangeText={changeCurrentPassword}
            placeholder='Enter current password.'
            secureTextEntry={true}
          />

          { currentPasswordInvalid && 
            <Text style={GlobalStyles.invalidText}>{currentPasswordInvalid}</Text>
          }


          <Text style={GlobalStyles.label}>Enter New Password:</Text>
          <TextInput
            style={[GlobalStyles.input, passwordInvalid && GlobalStyles.inputInvalid]}
            onChangeText={changePassword}
            placeholder='Enter new password.'
            secureTextEntry={true}
          />

          { passwordInvalid && 
            <Text style={GlobalStyles.invalidText}>{passwordInvalid}</Text>
          }


          <TextInput
            style={[GlobalStyles.input, password2Invalid && GlobalStyles.inputInvalid]}
            onChangeText={changePassword2}
            placeholder='Re-enter new password.'
            secureTextEntry={true}
          />

          { password2Invalid && 
            <Text style={GlobalStyles.invalidText}>{password2Invalid}</Text>
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