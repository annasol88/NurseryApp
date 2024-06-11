export default function SettingsScreen({navigation}) {
  return (
    <View>
      <Pressable onPress={navigation.navigate('Personal Details')}> Update personal details </Pressable>
      <Pressable onPress={navigation.navigate('Change Password')}> Update password </Pressable>
    </View>
  )
}