import { useState } from 'react'
import { View, Text, Image, Pressable, TextInput, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EventRegister } from 'react-native-event-listeners';

import { useUserContext } from '../../contexts/user.context';
import { GlobalStyles } from '../../../styles/shared.styles';
import { generateUserName, newChild, setChild, setChildAndAvatar } from '../../services/child.service';

export default function ChildProfileScreen({route, navigation}) {
  const {child} = route.params;
  const {currentUser} = useUserContext()

  let [childName, changeChildName] = useState(child?.name ?? '')
  let [avatarUrl, changeAvatar] = useState(child?.avatarUrl ?? undefined)
  let [dob, changeDob] = useState(child?.dob ?? undefined)
  let [address, changeAddress] = useState(child?.address ?? '')
  let [allergies, changeAllergies] = useState(child?.allergies ?? '')
  let [diet, changeDiet] = useState(child?.diet ?? '')
  let [doctor, changeDoctor] = useState(child?.doctor ?? '')

  let [childNameInvalid, changeChildNameInvalid] = useState(false)
  let [addressInvalid, changeAddressInvalid] = useState(false)

  takeImageClicked = () => {
    navigation.navigate('Take Profile Image', {
      imageSelected: (pic) => {
        changeAvatar(pic)},
    });
  }

  uploadImageClicked = () => {
    console.log('upload image')
  }

  saveDetailsClicked = () => {
    //TODO validation
    //TODO handle username change if name updated

    let childUserName = child?.username ?? generateUserName(currentUser.email, childName)
    let avatarChange = avatarUrl != '' && avatarUrl != child?.avatarUrl

    if(avatarChange) {
      // avatar will be set in child service
      let childData = newChild(childUserName, childName, '', new Date(), address, allergies, diet, doctor)
      setChildAndAvatar(currentUser.email, childData, avatarUrl).then(() => {
        EventRegister.emit('childUpdate', childData)
        EventRegister.emit('userUpdate', currentUser)
        navigation.goBack();
      }).catch(e => {
        //TODO show error
        console.error(e)
      })
    } else {
      // avatar already contains existing link to child profile photo or is empty
      let childData = newChild(childUserName, childName, avatarUrl, new Date(), address, allergies, diet, doctor)
      setChild(currentUser.email, childData).then(() => {
        EventRegister.emit('childUpdate', childData)
        EventRegister.emit('userUpdate', currentUser)
        navigation.goBack();
      }).catch(e => {
        //TODO show error
        console.error(e)
      })
    }
  }

  return (
    <ScrollView>
      <View style={GlobalStyles.screen}>
        <View style={GlobalStyles.container}>
          <Text style={GlobalStyles.heading}>Profile Image</Text>
          <View style={styles.profilePicSection} >
            { avatarUrl && 
              <Image
                style={styles.avatar}
                source={{uri: avatarUrl}}
              /> 
            }
            <View style={styles.profilePicButtons}>
              <Pressable onPress={takeImageClicked} 
                style={({pressed}) =>[
                  GlobalStyles.buttonSecondary, 
                  GlobalStyles.mb,
                  pressed && GlobalStyles.buttonSecondaryPressed
              ]}
              >
                <MaterialCommunityIcons name="camera" size={16} color={'#F85A3E'} style={GlobalStyles.indent}></MaterialCommunityIcons>
                <Text style={[GlobalStyles.buttonSecondaryContent, GlobalStyles.indent]}>
                  Take Image
                </Text>
              </Pressable>

              <Pressable onPress={uploadImageClicked} 
                style={({pressed}) =>[
                  GlobalStyles.buttonSecondary, 
                  pressed && GlobalStyles.buttonSecondaryPressed
              ]}
              >
                <MaterialCommunityIcons name="upload" size={16} color={'#F85A3E'} style={GlobalStyles.indent}></MaterialCommunityIcons>
                <Text style={[GlobalStyles.buttonSecondaryContent, GlobalStyles.indent]}>
                    Upload Image
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={GlobalStyles.container}>
          <Text style={GlobalStyles.heading}>Personal Information</Text>

          <Text style={styles.label}>Child's Name</Text>
          <TextInput
            style={[
              GlobalStyles.input, 
              childNameInvalid && GlobalStyles.inputInvalid    
            ]}
            onChangeText={changeChildName}
            placeholder="Enter you childs name"
            inputMode="default"
            value={childName}
          />

          {//TODO date of birth with date picker
          }

          <Text style={styles.label}>Address:</Text>
          <TextInput
            style={[GlobalStyles.input, addressInvalid && GlobalStyles.inputInvalid]}
            multiline={true}
            numberOfLines={6}
            onChangeText={changeAddress}
            value={address}
            placeholder="Enter Your Address"
          />
        </View>

        <View style={GlobalStyles.container}>
          <Text style={GlobalStyles.heading}>Medical Information</Text> 

          <Text style={styles.label}>Allergies:</Text>
          <TextInput
            style={[GlobalStyles.input]}
            multiline={true}
            numberOfLines={6}
            onChangeText={changeAllergies}
            value={allergies}
            placeholder="Enter any allergies your child has"
          />

          <Text style={styles.label}>Dietary Requirements:</Text>
          <TextInput
            style={[GlobalStyles.input]}
            multiline={true}
            numberOfLines={6}
            onChangeText={changeDiet}
            value={diet}
            placeholder="Enter any dietry requirements that your child has"
          />

          <Text style={styles.label}>Doctor's Contact:</Text>
          <TextInput
            style={[GlobalStyles.input]}
            multiline={true}
            numberOfLines={6}
            onChangeText={changeDoctor}
            value={doctor}
            placeholder="Enter the best way to get in touch with your child's GP"
          />
        </View>
        <Pressable 
          onPress={saveDetailsClicked} 
          style={(pressed) => [GlobalStyles.buttonPrimary, pressed && GlobalStyles.buttonPrimaryPressed]}
          >
            <Text style={GlobalStyles.buttonPrimaryContent}>Save {child ? 'Changes' : 'Details'}</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    gap: 12,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: '50%',
  },

  label: {
    marginBottom: -8,
    textTransform: 'upperCase',
    fontWeight: '600',
    color: '#909090'
  },

  profilePicSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },

  profilePicButtons: {
    flex: 1,
  }
})