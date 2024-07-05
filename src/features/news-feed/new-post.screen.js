import { useState } from "react";
import { TextInput, Pressable, Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { EventRegister } from 'react-native-event-listeners'

import { GlobalStyles } from "../../../styles/shared.styles";
import { createPost, newPost } from "../../services/news-feed.service";
import { useUserContext } from "../../contexts/user.context";


export default function NewPostScreen({navigation}) {
  let {currentUser} = useUserContext()

  let [text, changeText] = useState('')
  let [validationMessage, changeValidationMessage] = useState('')

  let [isLoading, changeLoading] = useState(false);
  let [error, changeError] = useState(false)

  postClicked = () => {
    if(!validateText()) return 

    changeLoading(true)

    // currently user profile picture is hrd coded because it is not stored
    let post = newPost(text, [], currentUser.email, 'https://firebasestorage.googleapis.com/v0/b/nurseryapp-anna.appspot.com/o/avatars%2Fuser%2Fadmin%40nursery.com.JPG?alt=media&token=82e4776e-0f05-4011-b18c-4395445aceef')
    createPost(post).then(() => {
      EventRegister.emit('postCreated', post)
      navigation.navigate('News Feed')
    }).catch(e => {
      console.error(e)
      changeError(true)
    }).finally(() => changeLoading(false))
  }

  validateText = () => {
    if(text.length < 5) {
      changeValidationMessage('Post must be at least 5 characters long.')
      return false;
    }
    return true;
  }

  if(isLoading) {
    return <ActivityIndicator style={GlobalStyles.center} size="small" color="#F85A3E" />
  } 
  
  if(error) {
    return (
      <View style={[GlobalStyles.container, GlobalStyles.empty]}>
        <Text style={GlobalStyles.emptyText}>Something went wrong when trying to create a new post, please try again later.</Text>
      </View>
    )
  } 

  return (
    <View style={GlobalStyles.screen}>
      <View style={GlobalStyles.container}>
        <Text style={GlobalStyles.label}>Post Message:</Text>
        <TextInput
          style={[GlobalStyles.input, validationMessage && GlobalStyles.inputInvalid]}
          multiline={true}
          numberOfLines={6}
          onChangeText={changeText}
          value={text}
          placeholder="Start typing your post..."
        />

        { validationMessage != '' && 
          <Text style={GlobalStyles.invalidText}>{validationMessage}</Text>
        }

        <Pressable 
          onPress={postClicked} 
          style={({pressed}) => [GlobalStyles.buttonPrimary, pressed && GlobalStyles.buttonPrimaryPressed]}
        >
          <Text style={GlobalStyles.buttonPrimaryContent}>Post</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

})