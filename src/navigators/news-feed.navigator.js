import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NewsFeedScreen from '../features/news-feed/news-feed.screen'
import NewPostScreen from '../features/news-feed/new-post.screen';

export default function HomeNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="News Feed" component={NewsFeedScreen} />
      <Stack.Screen name="Create New Post" component={NewPostScreen} />
    </Stack.Navigator>
  );
}