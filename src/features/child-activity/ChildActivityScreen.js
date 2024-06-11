import { Text, StyleSheet, Pressable, SafeAreaView, View, Image } from 'react-native';
import { GlobalStyles } from '../../styles/shared.styles'

const ACTIVITY_DATA = [
    {
        type: 'ABSENT',
        date: new Date(),
        reason: 'fever'
    },
    {
        type: 'PRESENT',
        date: new Date(),
        signIn: new Date(),
        signOut: new Date(),
        meals: ['pesto pasta', 'oat cakes']
    },
    {
        type: 'PRESENT',
        date: new Date(),
        signIn: new Date(),
        signOut: new Date(),
        meals: ['pesto pasta', 'oat cakes']
    }
]

const CHILD_DATA = {
    fullName: 'Anna Solek',
    avatar: 'https://avataaars.io/?avatarStyle=Circle',
    dob: new Date(23, 4, 2003),
    addess: {
        line1: '1 blah bla road',
        line2: '',
        city: 'Glasgow',
        country: 'United Kingdom',
        postCode: 'ABC 123'
    },
    allergies: ['strawberries'],
    diet: 'lots of brocolli',
    doctor: {
        name: 'Dr getbetter',
        phone: '12345678910',
        email: 'drgetbetter@hospital.com'
    }
  }

export default function ChildActivityScreen({navigation}) {
  return (
    <View style={GlobalStyles.main}>
      <View style={GlobalStyles.container}>
        <View style={styles.header}>
            <Image
              style={styles.headerAvatar}
              source={{uri: CHILD_DATA.avatar}}
            /> 
            <Text>{CHILD_DATA.fullName}</Text>
        </View>
      </View>

      <View>
        <Pressable onPress={navigation.navigate('Report Absence')}> 
          Report absence or sickness
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