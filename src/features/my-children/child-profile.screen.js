import { Text } from 'react-native';

export default function ChildProfileScreen({navigation, child}) {
  updateProfileClicked = () => {
    navigation.navigate('Update Child Profile', {child: childData})
  }

  return (
    <Text>Child profile</Text>
  )
}