import { useState, useEffect } from 'react'
import { FlatList, Text, View} from 'react-native';

import Post from '../../components/PostComponent';
import { GlobalStyles } from '../../../styles/shared.styles'
import { getPosts } from '../../services/NewsFeedService';
import { useAuthValue } from '../../contexts/AuthContext';

export default function HomeScreen({navigation}) {
  let {currentUser} = useAuthValue()
  let [isLoading, changeLoading] = useState(true);
  let [posts, changePosts] = useState([]);
  let [error, changeError] = useState(false);

  useEffect(() => {
    getPosts().then((p) => {
      changeLoading(false)
      changePosts(p)
      console.log(p)
    }).catch((e) => {
      console.error(e)
      changeLoading(false)
      changeError(true)
    })
  }, [])

  return (
    <View style={GlobalStyles.screen}>
    {isLoading && 
      <Text>Loading...</Text>
    }

    {!isLoading && posts.length == 0 && 
      <Text>No Posts</Text>
    }

    {error && 
      <Text>Something went wrong fetching posts. Please try again later</Text>
    }

    {posts.length > 0 && 
      <FlatList
        data={posts}
        renderItem={({item}) => Post(currentUser, item)}
      />
    }
    </View>
  );
}

