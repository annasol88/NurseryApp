import { useState } from 'react'
import { View, Text, Image, Pressable, TextInput, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EventRegister } from 'react-native-event-listeners';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useUserContext } from '../../contexts/user.context';
import { GlobalStyles } from '../../../styles/shared.styles';
import { generateUserName, newChild, setChild, setAvatar } from '../../services/child.service';
import { updateUserChild } from '../../services/user.service'

export default function ChildProfileScreen({route, navigation}) {
  const {child} = route.params;
  const {currentUser} = useUserContext()

  let [childName, changeChildName] = useState(child?.name ?? '')
  let [avatarUrl, changeAvatar] = useState(child?.avatarUrl ?? undefined)
  let [dob, changeDob] = useState(child?.dob ?? new Date())
  let [address, changeAddress] = useState(child?.address ?? '')
  let [allergies, changeAllergies] = useState(child?.allergies ?? '')
  let [diet, changeDiet] = useState(child?.diet ?? '')
  let [doctor, changeDoctor] = useState(child?.doctor ?? '')

  let [childNameValidation, changeChildNameValidation] = useState('')
  let [addressValidation, changeAddressValidation] = useState('')

  let [isLoading, changeLoading] = useState(false);
  let [error, changeError] = useState(false);

  takeImageClicked = () => {
    navigation.navigate('Take Profile Image', {
      imageSelected: (pic) => changeAvatar(pic)
    });
  }

  uploadImageClicked = () => {
    console.log('upload image')
  }

  saveDetailsClicked = async () => {
    if(!validateDetails()){ return }

    changeLoading(true)
    // to ensure valid sername is generated child name is trimmed
    let cleanChildName = childName.trim()

    // if no child data is currently stored
    if(!child) {
      let childUserName = generateUserName(currentUser.email, cleanChildName)
      storedAvatarUrl = await setAvatar(childUserName, avatarUrl)
      let childData = newChild(childUserName, childName, storedAvatarUrl, dob.toDateString(), address, allergies, diet, doctor)

      let setChildComplete = setChild(childData)
      let updateUserComplete = updateUserChild(currentUser.email, childUserName)

      Promise.all([setChildComplete, updateUserComplete]).then(() => {
        EventRegister.emit('childUpdate', childData)
        EventRegister.emit('userUpdate', currentUser)
        navigation.goBack();
      }).catch(e => {
        changeError(true)
        console.error(e)
      }).finally(() => changeLoading(false))
      return
    }

    //TODO handle username change on name change
    //let usernameChange = childName != child?.childName
    
    let avatarChange = avatarUrl != '' && avatarUrl != child?.avatarUrl
    let childData 
    if(avatarChange) {
      storedAvatarUrl = await setAvatar(child.userName, avatarUrl)
      childData = newChild(child.userName, childName, storedAvatarUrl, dob.toDateString(), address, allergies, diet, doctor)
    } else {
      // avatarUrl already contains existing link to child profile photo if not changed
      childData = newChild(child.userName, childName, avatarUrl, dob.toDateString(), address, allergies, diet, doctor)
    }

    setChild(childData).then(() => {
      EventRegister.emit('childUpdate', childData)
      navigation.goBack();
    }).catch(e => {
      changeError(true)
      console.error(e)
    }).finally(() => changeLoading(false))
  }

  validateDetails = () => {
    changeChildNameValidation('')
    changeAddressValidation('')

    if(childName === undefined){
      changeChildNameValidation(`You must enter your child's name.`)
      return false
    } else if (address == '') {
      changeAddressValidation('You must enter your address.')
      return false
    } 
    return true
  }

  if(isLoading) {
    return <Text style={GlobalStyles.center}>Loading...</Text>
  } 
  
  if(error) {
    return (
      <View style={[GlobalStyles.container, GlobalStyles.empty]}>
        <Text style={GlobalStyles.emptyText}>Something went wrong saving child information. Please stry again later</Text>
      </View>
    )
  } 

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}>
      <View style={GlobalStyles.screen}>
        <View style={GlobalStyles.container}>
          <Text style={GlobalStyles.heading}>Profile Image</Text>
          <View style={styles.profilePicSection}>
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
                <MaterialCommunityIcons name="camera" size={16} color={'#F85A3E'}></MaterialCommunityIcons>
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
                <MaterialCommunityIcons name="upload" size={16} color={'#F85A3E'}></MaterialCommunityIcons>
                <Text style={[GlobalStyles.buttonSecondaryContent, GlobalStyles.indent]}>
                    Upload Image
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={GlobalStyles.container}>
          <Text style={GlobalStyles.heading}>Personal Information</Text>

          <Text style={GlobalStyles.label}>Child's Name</Text>
          <TextInput
            style={[
              GlobalStyles.input, 
              childNameValidation && GlobalStyles.inputInvalid    
            ]}
            onChangeText={changeChildName}
            placeholder="Enter your child's name..."
            inputMode="default"
            value={childName}
          />

          { childNameValidation && 
            <Text style={GlobalStyles.invalidText}>{childNameValidation}</Text>
          }

          <Text style={GlobalStyles.label}>Date of Birth:</Text>
          <DateTimePicker
            value={dob}
            mode="date"
            accentColor="#F85A3E"
            maximumDate={new Date()}
            style={[styles.datePicker]}
            onChange={(event, selectedDate) => changeDob(selectedDate)}
          />

          <Text style={GlobalStyles.label}>Address:</Text>
          <TextInput
            style={[GlobalStyles.input, addressValidation && GlobalStyles.inputInvalid]}
            multiline={true}
            numberOfLines={6}
            onChangeText={changeAddress}
            value={address}
            placeholder="Enter Your Address..."
          />

          { addressValidation && 
            <Text style={GlobalStyles.invalidText}>{addressValidation}</Text>
          }
        </View>

        <View style={GlobalStyles.container}>
          <Text style={GlobalStyles.heading}>Medical Information</Text> 

          <Text style={GlobalStyles.label}>Allergies:</Text>
          <TextInput
            style={[GlobalStyles.input]}
            multiline={true}
            numberOfLines={6}
            onChangeText={changeAllergies}
            value={allergies}
            placeholder="Enter any allergies your child has..."
          />

          <Text style={GlobalStyles.label}>Dietary Requirements:</Text>
          <TextInput
            style={[GlobalStyles.input]}
            multiline={true}
            numberOfLines={6}
            onChangeText={changeDiet}
            value={diet}
            placeholder="Enter any dietry requirements that your child has..."
          />

          <Text style={GlobalStyles.label}>Doctor's Contact:</Text>
          <TextInput
            style={[GlobalStyles.input]}
            multiline={true}
            numberOfLines={6}
            onChangeText={changeDoctor}
            value={doctor}
            placeholder="Enter the best way to get in touch with your child's GP..."
          />
        </View>
        <Pressable 
          onPress={saveDetailsClicked} 
          style={({pressed}) => [GlobalStyles.buttonPrimary, pressed && GlobalStyles.buttonPrimaryPressed]}
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

  profilePicSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },

  profilePicButtons: {
    flex: 1,
  },

  datePicker: {
    alignSelf: 'flex-start',
  }
})