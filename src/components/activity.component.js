import { Text, StyleSheet, View } from 'react-native';

import { GlobalStyles } from '../../styles/shared.styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Activity({activityData}) {

  formatTime = (time) => {
    return time.toLocaleTimeString()
  }

  if(activityData.type == 'ABSENCE') {
    return  (
      <View style={[GlobalStyles.container, GlobalStyles.mb, styles.absentCard]}>
        <View style={styles.header}>
          <Text style={styles.headerDate}>{activityData.date}</Text>
          <Text style={styles.absentStatus}>ABSENT</Text>
        </View>
        
        <View style={styles.content}>
          <Text style={[styles.contentText, styles.contentAbsent]}>
            Reason:{' '}{activityData.reason}
          </Text>
        </View>
      </View>
    )
  }

  if(activityData.type == 'PRESENCE') {
    return (
      <View style={[GlobalStyles.container, GlobalStyles.mb, styles.presentCard]}>
        <View style={styles.header}>
          <Text style={styles.headerDate}>{activityData.date}</Text>
          <Text style={styles.presentStatus}>PRESENT</Text>
        </View>
        <View style={styles.content}>
            <Text style={[styles.contentText, styles.contentPresent]}>
              <MaterialCommunityIcons name="keyboard-tab" size={18} />
              Sign In:{' '}{activityData.signIn}
            </Text>
            <Text style={[styles.contentText, styles.contentPresent]}>
              <MaterialCommunityIcons name="food-apple-outline" size={18} />
              Meals:{' '}{activityData.meals}
            </Text>
            <Text style={[styles.contentText, styles.contentPresent]}>
              <MaterialCommunityIcons name="keyboard-tab-reverse" size={18} />
              Sign Out:{' '}{activityData.signOut}
            </Text>
        </View>
      </View>
    )
   } 
}

const styles = StyleSheet.create({
  presentCard: {
    backgroundColor: '#E7FEE6'
  },

  absentCard: {
    backgroundColor: '#F9E6E6'
  },

  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  absentStatus:{
    fontWeight: 600,
    fontSize: 18,
    color: '#C20202',
  },

  presentStatus: {
    fontWeight: 600,
    fontSize: 18,
    color: '#37872A',
  },

  headerDate: {
    fontSize: 20,
    color: '#6A6A6A'
  },

  content: {
    display: 'flex',
    gap: 4
  },

  contentText: {
    display: 'flex',
    flexDirection:'row',
    alignItems: 'center',
    color: '#909090',
    fontSize: 16,
    gap: 8
  },

  contentAbsent:{
    color: '#C20202',
  },

  contentPresent: {
    color: '#37872A',
  },
})