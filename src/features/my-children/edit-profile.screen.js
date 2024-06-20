import { useState } from 'react'
import { View, Text, Image, Pressable, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useUserContext } from '../../contexts/user.context';
import { GlobalStyles } from '../../../styles/shared.styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function EditChildProfileScreen({route, navigation}) {
  const {child} = route.params;
  const {currentUser} = useUserContext()

  let [childName, changeChildName] = useState(child?.name ?? '')
  let [avatar, changeAvatar] = useState(child?.avatar ?? '')
  let [dob, changeDob] = useState(child?.dob ?? '')
  let [address, changeAddress] = useState(child?.address ?? '')
  let [allergies, changeAllergies] = useState(child?.allergies ?? '')
  let [diet, changeDiet] = useState(child?.diet ?? '')
  let [doctor, changeDoctor] = useState(child?.doctor ?? '')

  let [childNameInvalid, changeChildNameInvalid] = useState(false)
  let [addressInvalid, changeAddressInvalid] = useState(false)

  takeImageClicked = () => {
    console.log('open camera')
    // open camera
  }

  uploadImageClicked = () => {
    console.log('upload image')
    // open camera
  }

  return (
    <ScrollView>
    <View style={GlobalStyles.screen}>
      <View style={GlobalStyles.container}>
        <Text style={GlobalStyles.heading}>Profile Image</Text>
        {avatar && 
          <Image
            style={styles.avatar}
            source={{uri: avatar}}
          /> 
        }
        <View>
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

        <Text style={styles.label}>dietary requirements:</Text>
        <TextInput
          style={[GlobalStyles.input]}
          multiline={true}
          numberOfLines={6}
          onChangeText={changeDiet}
          value={diet}
          placeholder="Enter any dietry requirements that your child has"
        />

        <Text style={styles.label}>doctor's contact:</Text>
        <TextInput
          style={[GlobalStyles.input]}
          multiline={true}
          numberOfLines={6}
          onChangeText={changeDoctor}
          value={doctor}
          placeholder="Enter the best way to get in touch with your child's GP"
        />
      </View>
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    gap: 8,
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
  }
})