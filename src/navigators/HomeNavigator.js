import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../features/home/HomeScreen'
import NewPostScreen from '../features/home/NewPostScreen';

export default function HomeNavigator() {
    const Stack = createNativeStackNavigator();
  
    return (
      <Stack.Navigator>
        <Stack.Screen name="News Feed" component={HomeScreen} />
        <Stack.Screen name="Create New Post" component={NewPostScreen} />
      </Stack.Navigator>
    );
  }