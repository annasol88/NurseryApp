import { useState } from "react";
import { TextInput, Pressable, Text, View, ActivityIndicator } from "react-native";
import { updatePassword, reauthenticateWithCredential } from 'firebase/auth';

import { GlobalStyles } from '../../../styles/shared.styles';
import { auth } from '../../firebase/main'

export default function ChangePasswordScreen({navigation}) {
  let [currentPassword, changeCurrentPassword] = useState('');
  let [password, changePassword] = useState('');
  let [password2, changePassword2] = useState('');

  let [isLoading, changeLoading] = useState(false);
  let [error, changeError] = useState(false);
  let [success, changeSuccess] = useState(false);

  let [validationMessage, changeValidationMessage] = useState('');
  let [currentPasswordInvalid, changeCurrentPasswordInvalid] = useState(false);
  let [passwordInvalid, changePasswordInvalid] = useState(false);
  let [password2Invalid, changePassword2Invalid] = useState(false);

  saveClicked = () => {
    if(!validate()) { return }
    changeLoading(true)

    reauthenticateWithCredential(auth.currentUser, currentPassword).then(() => {
      updatePassword(auth.currentUser, password).then(() => {
        changeLoading(false)
        changeSuccess(true)
  
        setTimeout(()=> {
          changeSuccess(false)
        }, 5000)
        
      }).catch((error) => {
        changeError(true)
        console.error(error)
      });
    }).catch((error) => {
      switch(error.code) {
        case 'auth/invalid-credential':
          changeValidationMessage('Incorrect Password entered.')
          changeCurrentPasswordInvalid(true);
          break;
        default: 
          changeValidationMessage('Something went wrong when trying to sign you up. Please try again later.')
          console.error(error)
          break;
      }
    })    
  }
  
  validate = () => {
    changeValidationMessage('')
    changePasswordInvalid(false)
    changePassword2Invalid(false)
    changeCurrentPasswordInvalid(false)

    if(currentPassword == '') {
      changeValidationMessage('Password not provided.')
      changeCurrentPasswordInvalid(true)
      return false
    } else if(password == '') {
      changeValidationMessage('New Password not provided.')
      changePasswordInvalid(true)
      return false
    } else if(password.length < 6) {
      changeValidationMessage('Weak password. Password must be at least 6 characters long.')
      changePasswordInvalid(true)
      return false
  } else if(password != password2) {
      changeValidationMessage('Passwords entered do not match.')
      changePasswordInvalid(true)
      changePassword2Invalid(true)
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
    <View style={GlobalStyles.screen}>
      <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.label}>Enter Current Password:</Text>
        <TextInput
          style={[GlobalStyles.input, currentPasswordInvalid && GlobalStyles.inputInvalid]}
          onChangeText={changeCurrentPassword}
          value={currentPassword}
          placeholder="Enter current password."
          secureTextEntry={true}
        />

        <Text style={GlobalStyles.label}>Enter New Password:</Text>
        <TextInput
          style={[GlobalStyles.input, passwordInvalid && GlobalStyles.inputInvalid]}
          onChangeText={changePassword}
          value={password}
          placeholder="Enter new password."
          secureTextEntry={true}
        />

        <TextInput
          style={[GlobalStyles.input, password2Invalid && GlobalStyles.inputInvalid]}
          onChangeText={changePassword2}
          value={password2}
          placeholder="Re-enter new password."
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
  )
}