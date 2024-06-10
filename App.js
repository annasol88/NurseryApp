import HomeScreen from './src/features/home/HomeScreen';
import ChildActivityScreen from './src/features/child-activity/ChildActivityScreen';
import SettingsScreen from './src/features/settings/SettingsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="News Feed">
        <Tab.Screen 
          name="News Feed" 
          component={HomeScreen} 
          options={{
            tabBarLabel: 'News Feed',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen 
          name="My Child" 
          component={ChildActivityScreen}
          options={{
            tabBarLabel: 'My Child',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="baby-face" color={color} size={size} />
            ),
          }} 
        />

        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cog" color={color} size={size} />
            ),
          }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}