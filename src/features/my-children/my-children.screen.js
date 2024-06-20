import { View, Text, Pressable, FlatList } from 'react-native';

import { useUserContext } from '../../contexts/user.context';
import { GlobalStyles } from '../../../styles/shared.styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MyChildrenScreen({navigation}) {
  let {currentUser} = useUserContext()

  childClicked = (childUserName) => {
    navigation.navigate('Child Activity', {childUserName: childUserName})
  }

  addChildInfoClicked = () => {
    navigation.navigate('Edit Child Profile', {child: undefined})
  }
  if(currentUser.children?.length > 0) {
    if (currentUser.children.length == 1) {
      return ( <Text>TODO </Text>)
    } else {
      return (
        <FlatList
          data={currentUser.children}
          renderItem={({item}) => {return (
            <Pressable onPress={() => childClicked(item)} style={[GlobalStyles.listItem, (pressed) => {pressed && GlobalStyles.pressed}]}>
              <Text>{item}</Text>
              <MaterialCommunityIcons name="chevron-right" size={24}/>
            </Pressable>
          )}}
        />
      )
    }
  } else {
    return (
      <View style={[GlobalStyles.container, GlobalStyles.empty]}>
        <Text style={GlobalStyles.emptyText}>No children saved</Text>
        <Pressable onPress={addChildInfoClicked} style={({pressed}) =>[
          GlobalStyles.buttonPrimary, 
          pressed && GlobalStyles.buttonPrimaryPressed
        ]}>
          <Text style={GlobalStyles.buttonPrimaryContent}>Add child information</Text>
        </Pressable>
      </View>
    )
  }
}
