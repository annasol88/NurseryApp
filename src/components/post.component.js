import { Text, StyleSheet, View, Image, Pressable } from 'react-native';
import { formatDistance } from 'date-fns';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EventRegister } from 'react-native-event-listeners'

import { GlobalStyles } from '../../styles/shared.styles';
import { updatePost } from '../services/news-feed.service'
import { useUserContext } from '../contexts/user.context';

export default function Post({postData}) {
  let {currentUser} = useUserContext()

  elapsedTime = () => {
    return formatDistance(new Date(postData.timestamp), new Date(), { addSuffix: true });
  }
  
  isLiked = () => {
    return postData.likes.includes(currentUser.email)
  }

  likeClicked = () => {
    const p = Object.assign({}, postData)
    if(postData.likes.includes(currentUser.email)) {
      p.likes = p.likes.filter((l)=> l != currentUser.email)
    } else {
      p.likes.push(currentUser.email)
    }

    updatePost(postData.id, p).then().catch(e => {console.error(e)})
    EventRegister.emit('postUpdated', p)
  }

  commentsClicked = () => {
    console.log(`post: ${postData.id} comments clicked`)
  }

  return (
    <View style={[GlobalStyles.container, GlobalStyles.mb]}>
      <View style={styles.header}>
        <Image
          style={styles.headerAvatar}
          source={{uri: postData.userAvatar}}
        /> 
        <Text style={styles.headerText}>{postData.userName}</Text>
        <Text style={styles.headerTimestamp}>{elapsedTime()}</Text>
      </View>

      <View style={styles.content}>
        <Text>{postData.content}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Pressable onPress={likeClicked} style={({pressed}) => [styles.footerButton, pressed ? styles.footerButtonPressed: '']}>
            <MaterialCommunityIcons 
              name={ isLiked() ? "cards-heart" : "cards-heart-outline" } 
              size={25}
              color={'#F85A3E'}
            />
          </Pressable>
          <Text>{postData.likes.length} likes</Text>
        </View>

        <View style={styles.footerItem}>
          <Pressable onPress={commentsClicked} style={({pressed}) => [styles.footerButton, pressed ? styles.footerButtonPressed: '']}>
            <MaterialCommunityIcons 
              name="comment-outline"
              size={25}
              color={'#F85A3E'}
            />
          </Pressable>
          <Text>{postData.comments.length} comments</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  headerAvatar: {
    width: 30,
    height: 30,
    borderRadius: '50%',
  },

  headerText: {
  
  },

  headerTimestamp: {
    marginLeft: 'auto',
    color: '#6A6A6A',
    fontSize: 12,
  },

  content: {
    overflowWrap: 'anywhere',
  },

  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  footerItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%'
  },

  footerButton: {
    width: '100%',
    alignItems: 'center',
    padding: 8,
    borderBottomColor: '#F85A3E',
    borderBottomWidth: 1,
    marginBottom: 2
  },

  footerButtonPressed: {
    backgroundColor: '#EFEFEF'
  }
})