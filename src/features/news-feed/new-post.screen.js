import { useState } from "react";
import { TextInput, Pressable, Text, View, StyleSheet } from "react-native";
import { EventRegister } from 'react-native-event-listeners'

import { GlobalStyles } from "../../../styles/shared.styles";
import { createPost, newPost } from "../../services/news-feed.service";
import { useUserContext } from "../../contexts/user.context";


export default function NewPostScreen({navigation}) {
  let {currentUser} = useUserContext()

  let [text, changeText] = useState('')
  let [validationMessage, changeValidationMessage] = useState('')
  let [error, changeError] = useState(false)

  postClicked = () => {
    if(validateText()) {
      let post = newPost(text, [], currentUser.email, 'https://avataaars.io/?avatarStyle=Circle')
      createPost(post)
      .then(() => {
        EventRegister.emit('postCreated', post)
        navigation.navigate('News Feed')
      }).catch(e => {
        console.error(e)
        changeError(true)
      })
    }
  }

  validateText = () => {
    if(text.length < 5) {
      changeValidationMessage('Post must be at least 5 characters long.')
      return false;
    }
    return true;
  }

  return (
    <View style={GlobalStyles.screen}>
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

      <Pressable style={GlobalStyles.buttonPrimary} onPress={postClicked}>
        <Text style={GlobalStyles.buttonPrimaryContent}>Post</Text>
      </Pressable>

      { error && 
        <Text>Something went wrong when trying to create a new post, please try again later</Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({

})