import { useState, useEffect } from 'react'
import { Text, StyleSheet, Pressable, View, Image, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EventRegister } from 'react-native-event-listeners';

import { useUserContext } from '../../contexts/user.context';
import { GlobalStyles } from '../../../styles/shared.styles'
import { getChild } from '../../services/child.service'

export default function ChildActivityScreen({navigation}) {
  let {currentUser} = useUserContext()

  let [childData, changeChildData] = useState(undefined);
  let [isLoading, changeLoading] = useState(true);
  let [error, changeError] = useState(false);

  useEffect(() => {
    if(currentUser.child) {
      fetchChild(currentUser.child);
    }
    let childChangeListener = EventRegister.addEventListener('childUpdate', (c) => fetchChild(c.userName))
    let childAbsenceListener = EventRegister.addEventListener('childAbsenceAdded', () => fetchChild(currentUser.child))
    return () => {
      EventRegister.removeEventListener(childChangeListener)
      EventRegister.removeEventListener(childAbsenceListener)
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
          <Text style={GlobalStyles.buttonSecondaryContent}>Add child</Text>
        </Pressable>
      </View>
    )
  }

  reportAbsenceClicked = () => {
    navigation.navigate('Report Absence')
  }

  viewChildInfoClicked = () => {
    navigation.navigate('Child Profile', {child: childData})
  }

  if(isLoading) {
    return <ActivityIndicator style={GlobalStyles.center} size="large" color="#F85A3E" />
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
      <View style={[GlobalStyles.container, styles.header]}>
          <Image
            style={styles.headerAvatar}
            source={{uri: childData.avatarUrl}}
          /> 
          <Text style={styles.headerName}>{childData.name}</Text>
          <View style={styles.headerItems}>
            <View style={styles.headerItem}>
              <MaterialCommunityIcons name="calendar" color={'#F85A3E'} size={20}/>
              <Text>{childData.dob}</Text>
            </View>
            <View style={styles.headerItem}>
              <MaterialCommunityIcons name="home" color={'#F85A3E'} size={20}/>
              <Text>{childData.address}</Text>
            </View>
          </View>
      </View>

      <View style={styles.tab}>
        <Pressable 
          onPress={reportAbsenceClicked} style={({pressed}) => [
            styles.tabButton, 
            pressed && GlobalStyles.buttonSecondaryPressed]}
        > 
          <Text style={GlobalStyles.buttonSecondaryContent}>Report Absence</Text>
        </Pressable>

        <Pressable 
          onPress={viewChildInfoClicked} style={({pressed}) => [
            styles.tabButton, 
            pressed && GlobalStyles.buttonSecondaryPressed]}
        > 
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

  headerName: {
    fontWeight: '600',
    color: '#909090',
    fontSize: 24,
  },

  headerItems: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  headerItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },

  label: {
    color: '#F85A3E',
    fontWeight: 600
  },

  tab: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },

  tabButton: {
    borderRadius: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8
  }
})