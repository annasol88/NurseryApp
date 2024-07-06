import { useState } from 'react'
import { View, Text, Image, Pressable, TextInput, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EventRegister } from 'react-native-event-listeners';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { LogBox } from 'react-native';

import { useUserContext } from '../../contexts/user.context';
import { GlobalStyles } from '../../../styles/shared.styles';
import { generateUserName, newChild, setChild, setAvatar, removeChild } from '../../services/child.service';
import { setUser } from '../../services/user.service'

export default function ChildProfileScreen({route, navigation}) {
  const {child} = route.params;
  const {currentUser} = useUserContext()

  let [childName, changeChildName] = useState(child?.name ?? '')
  let [avatarUrl, changeAvatar] = useState(child?.avatarUrl ?? '')
  let [dob, changeDob] = useState(child?.dob ? new Date(child.dob) : new Date())
  let [address, changeAddress] = useState(child?.address ?? '')
  let [allergies, changeAllergies] = useState(child?.allergies ?? '')
  let [diet, changeDiet] = useState(child?.diet ?? '')
  let [doctor, changeDoctor] = useState(child?.doctor ?? '')

  let [childNameValidation, changeChildNameValidation] = useState('')
  let [addressValidation, changeAddressValidation] = useState('')

  let [isLoading, changeLoading] = useState(false);
  let [error, changeError] = useState(false);

  displayAvatar = () => {
    return avatarUrl ? {uri: avatarUrl} : require('../../../assets/empty-avatar.png')
  }

  // can safely ignore warning because deep link and state persistence is not used
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  takeImageClicked = () => {
    navigation.navigate('Take Profile Image', {
      imageSelected: (pic) => changeAvatar(pic)
    });
  }

  uploadImageClicked = async () => {
    // No permissions request is necessary for launching the image library
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      changeAvatar(result.assets[0].uri);
    }
  }

  saveDetailsClicked = async () => {
    if(!validateDetails()) return 

    changeLoading(true)

    try {
      if(!child) {
        await uploadNewChild()
      } else {
        await updateChildInfo()
      }
    } catch(e) {
      changeError(true)
      console.error(e)
    } finally { 
      changeLoading(false) 
    }
  }

  updateChildInfo = async () => {
    // check what properties have changed
    let avatarChange = avatarUrl != '' && avatarUrl != child?.avatarUrl
    let dobChange = dob != child?.dob
    let nameChange = childName != child?.name

    // assign properties to changed values
    let usernameToSave = nameChange ? generateUserName(currentUser.email, childName) : child.userName
    let avatarUrlToSave = avatarChange ? await setAvatar(usernameToSave, avatarUrl) : avatarUrl
    let dobToSave = dobChange ? dob.toDateString() : dob

    // child to save
    childData = newChild(usernameToSave, childName, avatarUrlToSave, dobToSave, address, allergies, diet, doctor, child.activities)
    await setChild(childData)

    if(nameChange) {
      await setUser(currentUser.email, { child: usernameToSave })
      await removeChild(child.userName)
      EventRegister.emit('userUpdate', currentUser.email)
    }

    EventRegister.emit('childUpdate', childData)
    navigation.goBack();
  }

  uploadNewChild = async () => {
    let childUserName = generateUserName(currentUser.email, childName)
    let storedAvatarUrl = avatarUrl ? await setAvatar(childUserName, avatarUrl) : ''
    let childData = newChild(childUserName, childName, storedAvatarUrl, dob.toDateString(), address, allergies, diet, doctor, [])

    let setChildComplete = setChild(childData)
    let updateUserComplete = setUser(currentUser.email, { child: childUserName })

    // promise all is used to complete tasks in parallel since they do not depend on each other
    Promise.all([setChildComplete, updateUserComplete]).then(() => {
      EventRegister.emit('childUpdate', childData)
      EventRegister.emit('userUpdate', currentUser.email)
      navigation.goBack();
    })
  }

  validateDetails = () => {
    changeChildNameValidation('')
    changeAddressValidation('')

    let isValid = true

    if(childName == ''){
      changeChildNameValidation(`You must enter your child's name.`)
      isValid = false
    } 
    if (address == '') {
      changeAddressValidation('You must enter your address.')
      isValid = false
    } 
    return isValid
  }

  if(isLoading) {
    return <ActivityIndicator style={GlobalStyles.center} size="large" color="#F85A3E" />
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
            <Image
              style={styles.avatar}
              source={displayAvatar()}
            /> 
            <View style={styles.profilePicButtons}>
              <Pressable onPress={takeImageClicked} 
                style={({pressed}) =>[
                  GlobalStyles.buttonSecondary, 
                  GlobalStyles.mb,
                  pressed && GlobalStyles.buttonSecondaryPressed
              ]}
              >
                <MaterialCommunityIcons name="camera" size={16} color={'#F85A3E'}/>
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
                <MaterialCommunityIcons name="upload" size={16} color={'#F85A3E'}/>
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
    width: 120,
    height: 120,
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