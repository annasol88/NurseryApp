import { useState } from 'react'
import { Text, View, TextInput, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { EventRegister } from 'react-native-event-listeners';

import { GlobalStyles } from '../../../styles/shared.styles';
import { addActivity, newAbsence } from '../../services/child.service'
import { useUserContext } from '../../contexts/user.context';

export default function ReportAbsenceScreen({route, navigation}) {
  const {currentUser} = useUserContext()

  let [date, changeDate] = useState(new Date())
  let [reason, changeReason] = useState('')

  let [validationMessage, changeValidationMessage] = useState('')
  let [reasonInvalid, changeReasonInvalid] = useState(false)

  let [isLoading, changeLoading] = useState(false);
  let [error, changeError] = useState(false);

  saveAbsenceClicked = () => {
    if(!validateAbsence()){ return }
    changeLoading(true)

    let activity = newAbsence(date.toDateString(), reason)

    addActivity(currentUser.child, activity).then(a => {
      EventRegister.emit('childAbsenceAdded', activity)
      navigation.goBack();
    }).catch(e => {
      if(e.code == 'ABSENCE_ALREADY_RECORDED') {
        changeValidationMessage('Absence or presence for this date has already been recorded. Please Verify you have selcted the correct date')
        return
      }
      changeError(true)
      console.error(e)
    }).finally(() => changeLoading(false))
  }

  validateAbsence = () => {
    changeReasonInvalid(false)

    if (reason == '') {
      changeValidationMessage('You have not entered a reason for the absence.')
      changeReasonInvalid(true)
      return false
    } 
    return true
  }

  if(isLoading) {
    return <ActivityIndicator style={GlobalStyles.center} size="large" color="#F85A3E" />
  } 
  
  if(error) {
    return (
      <View style={[GlobalStyles.container, GlobalStyles.empty]}>
        <Text style={GlobalStyles.emptyText}>Something went wrong saving child absence. Please speak to nursery staff directly</Text>
      </View>
    )
  } 

  return (
    <View style={GlobalStyles.screen}>
      <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.label}>Enter date of absence:</Text>
        <DateTimePicker
          value={date}
          mode="date"
          accentColor="#F85A3E"
          style={[styles.datePicker]}
          onChange={(event, selectedDate) => changeDate(selectedDate)}
        />

        <Text style={GlobalStyles.label}>Enter reason for absence:</Text>
        <TextInput
          style={[GlobalStyles.input, reasonInvalid && GlobalStyles.inputInvalid]}
          multiline={true}
          numberOfLines={4}
          onChangeText={changeReason}
          value={reason}
          placeholder="Enter reason for this absence."
        />

        { validationMessage && 
          <Text style={GlobalStyles.invalidText}>{validationMessage}</Text>
        }

        <Pressable 
          onPress={saveAbsenceClicked} 
          style={({pressed}) => [GlobalStyles.buttonPrimary, pressed && GlobalStyles.buttonPrimaryPressed]}
          >
            <Text style={GlobalStyles.buttonPrimaryContent}>Save Absence</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  datePicker: {
    alignSelf: 'flex-start',
  }
})