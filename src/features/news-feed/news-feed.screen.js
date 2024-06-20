import { useState, useEffect } from 'react'
import { FlatList, Text, View, Pressable, ScrollView, StyleSheet } from 'react-native';
import { EventRegister } from 'react-native-event-listeners'

import Post from '../../components/post.component';
import { GlobalStyles } from '../../../styles/shared.styles'
import { getPosts } from '../../services/news-feed.service';
import { useUserContext } from '../../contexts/user.context';

export default function NewsFeedScreen({navigation}) {
  let {currentUser} = useUserContext()

  let [isLoading, changeLoading] = useState(true);
  let [posts, changePosts] = useState([]);
  let [error, changeError] = useState(false);

  useEffect(() => {
    loadPosts()
    // listeners to update post in state so to avoid excessive API fetches
    // TODO consider perhaps redux is more appropriate here
    let updatePostListener = EventRegister.addEventListener('postUpdated', updatePosts)
    let newPostListener = EventRegister.addEventListener('postCreated', addNewPost)
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

  updatePosts = (updatedPost) => {
    changePosts(prev => {
      return prev.map(p => {
        if(p.id === updatedPost.id) {return updatedPost}
        return p
      });
    })
  }

  addNewPost = (newPost) => {
    changePosts(prev => {
      return [newPost, ...prev]
    })
  }

  if(isLoading) {
    return <Text style={GlobalStyles.center}>Loading...</Text>
  } else if(error) {
    return (
      <View style={[GlobalStyles.container, GlobalStyles.empty]}>
        <Text style={GlobalStyles.emptyText}>Something went wrong fetching posts. Please try again later</Text>
      </View>
    )
  } else {
    return (
      <>
      { posts?.length > 0 ? (
         <View style={GlobalStyles.screen}>
          { currentUser.role == 'ADMIN' && 
            <Pressable onPress={newPostPageClicked} style={GlobalStyles.buttonPrimary}>
              <Text style={GlobalStyles.buttonPrimaryContent}>+ Create New Post</Text>
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
              <Text style={GlobalStyles.buttonPrimaryContent}>+ Create New Post</Text>
            </Pressable>
          }
        </View>
      )}
      </>
    )
  }
}

const styles = StyleSheet.create({

})

