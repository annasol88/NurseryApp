import { useState, useEffect } from 'react'
import { Text, StyleSheet, Pressable, View, Image } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';

import { useUserContext } from '../../contexts/user.context';
import { GlobalStyles } from '../../../styles/shared.styles'
import { getChild } from '../../services/child.service'

export default function ChildActivityScreen({navigation}) {
  let {currentUser} = useUserContext()

  addChildInfoClicked = () => {
    navigation.navigate('Child Profile', {child: undefined})
  }

  // if user has not uploaded chld information
  if (!currentUser.child) {
    return (
      <View style={[GlobalStyles.container, GlobalStyles.empty]}>
        <Text style={GlobalStyles.emptyText}>No Child Information Saved</Text>
        <Pressable onPress={addChildInfoClicked} style={({pressed}) =>[
          GlobalStyles.buttonSecondary, 
          pressed && GlobalStyles.buttonSecondaryPressed
        ]}>
          <Text style={GlobalStyles.buttonSecondaryContent}>Add child information</Text>
        </Pressable>
      </View>
    )
  }

  let [isLoading, changeLoading] = useState(true);
  let [childData, changeChildData] = useState([]);
  let [error, changeError] = useState(false);

  useEffect(() => {
    fetchChild(currentUser.child);
    let childChangeListener = EventRegister.addEventListener('childUpdate', (c) => fetchChild(c.userName))
    return () => {
      EventRegister.removeEventListener(childChangeListener)
    }
  }, [])
  
  fetchChild = (username) => {
    getChild(username).then((d) => {
      changeChildData(d)
    }).catch((e) => {
      console.error(e)
      changeError(true)
    }).finally(() => {
      changeLoading(false)
    })
  }

  reportAbsenceClicked = () => {
    navigation.navigate('Report Absence')
  }

  viewChildInfoClicked = () => {
    navigation.navigate('Child Profile', {child: childData})
  }

  if(isLoading) {
    return <Text style={GlobalStyles.center}>Loading...</Text>
  } 
  
  if(error) {
    return (
      <View style={[GlobalStyles.container, GlobalStyles.empty]}>
        <Text style={GlobalStyles.emptyText}>Something went wrong fetching your child's information. Please try again later</Text>
      </View>
    )
  } 

  if(!childData) {
    return (
      <View style={[GlobalStyles.container, GlobalStyles.empty]}>
        <Text style={GlobalStyles.emptyText}>Child data not found. Please contact nursery admins for help.</Text>
      </View>
    )
  }

  return (
    <View style={GlobalStyles.screen}>
      <View style={GlobalStyles.container}>
        <View style={styles.header}>
            <Image
              style={styles.headerAvatar}
              source={{uri: childData.avatarUrl}}
            /> 
            <Text>{childData.name}</Text>
        </View>
      </View>

      <View style={styles.tab}>
        <Pressable onPress={reportAbsenceClicked} style={[GlobalStyles.buttonSecondary, styles.tabButton]}> 
          <Text style={GlobalStyles.buttonSecondaryContent}>Report Absence</Text>
        </Pressable>

        <Pressable onPress={viewChildInfoClicked} style={[GlobalStyles.buttonSecondary, styles.tabButton]}> 
          <Text style={GlobalStyles.buttonSecondaryContent}>View Profile</Text>
        </Pressable>
      </View>

      { childData.activities?.length > 0 ? (
        <View>
          <Text>activities go here</Text>
        </View>
      ) : (
        <View style={[GlobalStyles.container, GlobalStyles.empty]}>
          <Text style={GlobalStyles.emptyText}>No Activities Reported</Text>
        </View>
      )
      }
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
  },

  tab: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },

  tabButton: {
    borderRadius: 50
  }
})