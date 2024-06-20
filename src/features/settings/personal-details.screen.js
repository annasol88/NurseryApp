import { View, Text, Image } from 'react-native';

import { GlobalStyles } from '../../../styles/shared.styles';
import { useUserContext } from '../../contexts/user.context';

export default function PersonalDetailsScreen() {
  const {currentUser} = useUserContext()

  return (
    <View style={GlobalStyles.screen}>
      <View style={GlobalStyles.container}>
        <View>
          <Image></Image>
        </View>
      </View>
    </View>
  )
}