import { useState, useEffect } from 'react'
import { Text, StyleSheet, Pressable, View, Image } from 'react-native';

import { useUserContext } from '../../contexts/user.context';
import { GlobalStyles } from '../../../styles/shared.styles'

export default function ChildActivityScreen({route, navigation}) {
  const {childUserName} = route.params;

  let [isLoading, changeLoading] = useState(true);
  let [childData, changeChildData] = useState([]);
  let [error, changeError] = useState(false);

  useEffect(() => {
    getChild(childUserName).then((d) => {
      changeChildData(d)
    }).catch((e) => {
      console.error(e)
      changeError(true)
    }).finally(() => {
      changeLoading(false)
    })
  })

  reportAbsenceClicked = () => {
    navigation.navigate('Report Absence')
  }

  viewChildInfoClicked = () => {
    navigation.navigate('Child Profile', {child: childData})
  }

  return (
    <View style={GlobalStyles.screen}>
      <View style={GlobalStyles.container}>
        <View style={styles.header}>
            <Image
              style={styles.headerAvatar}
              source={{uri: childData.avatar}}
            /> 
            <Text>{childData.fullName}</Text>
        </View>
      </View>

      <View>
        <Pressable onPress={reportAbsenceClicked} styles={GlobalStyles.buttonPrimary}> 
          <Text styles={GlobalStyles.buttonPrimaryContent}>Report absence or sickness</Text>
        </Pressable>

        <Pressable onPress={viewChildInfoClicked} > 
          <Text>View Child Information</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    alignItems: 'center', 
  },

  headerAvatar: {
    width: 100,
    height: 100,
    borderRadius: '50%',
  }
})