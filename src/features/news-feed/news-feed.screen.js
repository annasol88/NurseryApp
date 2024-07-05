import { useState, useEffect } from 'react'
import { FlatList, Text, View, Pressable, ActivityIndicator } from 'react-native';
import { EventRegister } from 'react-native-event-listeners'

import Post from '../../components/post.component';
import { GlobalStyles } from '../../../styles/shared.styles'
import { getPosts } from '../../services/news-feed.service';
import { useUserContext } from '../../contexts/user.context';

export default function NewsFeedScreen({navigation}) {
  let {currentUser} = useUserContext()

  let [posts, changePosts] = useState([]);

  let [isLoading, changeLoading] = useState(true);
  let [error, changeError] = useState(false);

  useEffect(() => {
    loadPosts()
    // listeners only update posts when changed
    let updatePostListener = EventRegister.addEventListener('postUpdated', loadPosts)
    let newPostListener = EventRegister.addEventListener('postCreated', loadPosts)
    return () => {
      EventRegister.removeEventListener(updatePostListener)
      EventRegister.removeEventListener(newPostListener)
    }
  }, []);

  newPostPageClicked = () => {
    navigation.navigate('Create New Post')
  }

  loadPosts = () => {
    getPosts().then((p) => {
      changePosts(p)
    }).catch((e) => {
      console.error(e)
      changeError(true)
    }).finally(() => {
      changeLoading(false)
    })
  }

  if(isLoading) {
    return <ActivityIndicator style={GlobalStyles.center} size="large" color="#F85A3E" />
  } 
  
  if(error) {
    return (
      <View style={[GlobalStyles.container, GlobalStyles.empty]}>
        <Text style={GlobalStyles.emptyText}>Something went wrong fetching posts. Please try again later.</Text>
      </View>
    )
  } 

  return (
    <>
    { posts?.length > 0 ? (
      <View style={GlobalStyles.screen}>
        { currentUser.role == 'ADMIN' && 
          <Pressable onPress={newPostPageClicked} style={GlobalStyles.buttonPrimary}>
            <Text style={GlobalStyles.buttonPrimaryContent}>Create New Post</Text>
          </Pressable>
        }
        <FlatList
          data={posts}
          renderItem={({item}) => {return <Post postData={item} />}}
        />
      </View>
    ) : (
      <View style={[GlobalStyles.container, GlobalStyles.empty]}>
        <Text style={GlobalStyles.emptyText}>No Posts</Text>
        { currentUser.role == 'ADMIN' && 
          <Pressable onPress={newPostPageClicked} style={GlobalStyles.buttonPrimary}>
            <Text style={GlobalStyles.buttonPrimaryContent}>Create New Post</Text>
          </Pressable>
        }
      </View>
    )}
    </>
  )
}

