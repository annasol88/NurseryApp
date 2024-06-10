import { Text, StyleSheet, View, Image, Pressable } from 'react-native';
import { formatDistance } from 'date-fns';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlobalStyles } from '../styles/shared.styles';

export default function Post(postData) {
  elapsedTime = () => {
    return formatDistance(new Date(postData.timestamp), new Date(), { addSuffix: true });
  }

  like = () => {
    console.log('like clicked')
  }

  viewComments = () => {
    console.log('comments clicked')
  }

  return (
    <View style={GlobalStyles.container}>
      <View style={styles.header}>
        <Image
          style={styles.headerAvatar}
          source={{uri: postData.userAvatar}}
        /> 
        <Text style={styles.headerText} >{postData.userName}</Text>
        <Text style={styles.headerTimestamp} >{elapsedTime(postData.timestamp)}</Text>
      </View>

      <View style={styles.content}>
        <Text>{postData.content}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Pressable onPress={like} style={({pressed}) => [styles.footerButton, pressed ? styles.footerButtonPressed: '']}>
            <MaterialCommunityIcons 
                name="cards-heart-outline" // cards-heart
                size={25}
                color={'#F85A3E'}
            />
          </Pressable>
          <Text>{postData.likes} likes</Text>
        </View>

        <View style={styles.footerItem}>
          <Pressable onPress={viewComments} style={({pressed}) => [styles.footerButton, pressed ? styles.footerButtonPressed: '']}>
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
    marginBottom: 12
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
    marginBottom: 12
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
    backgroundColor: '#FEEEEC'
  }
})