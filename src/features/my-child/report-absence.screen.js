import { useState } from 'react'
import { Text, View, TextInput, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { GlobalStyles } from '../../../styles/shared.styles';

export default function ReportAbsenceScreen({route, navigation}) {
  let [date, changeDate] = useState(undefined)
  let [reason, changeReason] = useState('')

  let [validationMessage, changeValidationMessage] = useState('')
  let [reasonInvalid, changeReasonInvalid] = useState(false)

  let [isLoading, changeLoading] = useState(false);
  let [error, changeError] = useState(false);

  const onDateChange = (event, selectedDate) => {
    setDate(selectedDate);
  };

  saveAbsenceClicked = () => {
    if(!validateAbsense()){ return }

    console.log(date)
    changeLoading(true)
    //save
    changeLoading(false)
  }

  validateAbsence = () => {
    changeReasonInvalid(false)

    if(date === undefined){
      changeValidationMessage('You have not entered a date for the absence')
      return false
    } else if (reason == '') {
      changeValidationMessage('You have not entered a reason for the absence')
      changeReasonInvalid(true)
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
        <Text style={GlobalStyles.emptyText}>Something went wrong saving child absence. Please speak to nursery staff directly</Text>
      </View>
    )
  } 

  return (
    <View style={GlobalStyles.screen}>

      <DateTimePicker
        value={date}
        mode="date"
        onChange={onDateChange}
      />

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
          <Text style={GlobalStyles.buttonPrimaryContent}>Report</Text>
      </Pressable>
    </View>
  )
}