import { View, Pressable, Text } from 'react-native';

export default function SettingsScreen({navigation}) {
  viewPersonalDetails = () => {
    navigation.navigate('Personal Details')
  }

  changePassword = () => {
    navigation.navigate('Change Password')
  }

  return (
    <>
      <Pressable onPress={viewPersonalDetails}> 
        <Text>Update personal details</Text> 
      </Pressable>

      <Pressable onPress={changePassword}> 
        <Text>Update password</Text> 
      </Pressable>
    </>
  )
}