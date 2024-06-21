import { View, Text, Pressable, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EventRegister } from 'react-native-event-listeners'

import { useUserContext } from '../../contexts/user.context';
import { GlobalStyles } from '../../../styles/shared.styles';

export default function MyChildrenScreen({navigation}) {
  childClicked = (childUserName) => {
    navigation.navigate('Child Activity', {childUserName: childUserName})
  }

  if(currentUser.children?.length > 0) {
    return (
      <FlatList
        data={currentUser.children}
        renderItem={({item}) => {return (
          <Pressable 
            onPress={() => childClicked(item)} 
            style={[GlobalStyles.listItem, (pressed) => {pressed && GlobalStyles.pressed}]}
          >
            <Text>{item}</Text>
            <MaterialCommunityIcons name="chevron-right" size={24}/>
          </Pressable>
        )}}
      />
    )
  }
}
