import { View, Pressable, Text } from 'react-native';
import { signOut } from "firebase/auth";
import { auth } from '../../firebase/main'

import { GlobalStyles } from '../../../styles/shared.styles';
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function SettingsScreen({navigation}) {
  viewPersonalDetailsClicked = () => {
    navigation.navigate('Personal Details')
  }

  changePasswordClicked = () => {
    navigation.navigate('Change Password')
  }

  signOutClicked = () => {
    signOut(auth).catch((e) => {
      console.error(e)
    });
  }

  return (
    <View style={GlobalStyles.list}>
      <Pressable onPress={viewPersonalDetailsClicked} style={({pressed}) => [GlobalStyles.listItem, pressed && GlobalStyles.pressed]}> 
        <Text>Update personal details</Text> 
        <MaterialCommunityIcons name="chevron-right" size={24}></MaterialCommunityIcons>
      </Pressable>

      <Pressable onPress={changePasswordClicked} style={({pressed}) => [GlobalStyles.listItem, pressed && GlobalStyles.pressed]}> 
        <Text>Update password</Text> 
        <MaterialCommunityIcons name="chevron-right" size={24}></MaterialCommunityIcons>
      </Pressable>
      <Pressable onPress={signOutClicked} style={({pressed}) => [GlobalStyles.listItem, pressed && GlobalStyles.pressed]}> 
        <Text>Sign out</Text> 
        <MaterialCommunityIcons name="chevron-right" size={24}></MaterialCommunityIcons>
      </Pressable>
    </View>
  )
}