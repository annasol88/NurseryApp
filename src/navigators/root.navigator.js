import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import HomeNavigator from './news-feed.navigator';
import ChildrenAdminNavigator from './children-admin.navigator'
import MyChildrenNavigator from './my-children.navigator'
import SettingsNavigator from './setting.navigator';
import { useUserContext } from '../contexts/user.context'

export default function RootNavigator() {
  const Tab = createBottomTabNavigator();
  const {currentUser} = useUserContext();

  return (
    <Tab.Navigator initialRouteName="NewsFeedNav" screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="NewsFeedNav" 
        component={HomeNavigator} 
        options={{
          tabBarLabel: 'News Feed',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

      {currentUser.role == 'ADMIN' ? (
        <Tab.Screen 
          name="ChildrenAdminNav" 
          component={ChildrenAdminNavigator}
          options={{
            tabBarLabel: 'Children',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-group" color={color} size={size} />
            ),
          }} 
        />
      ) : (
        <Tab.Screen 
          name="MyChildrenNav" 
          component={MyChildrenNavigator}
          options={{
            tabBarLabel: 'My Children',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="baby-face" color={color} size={size} />
            ),
          }} 
        />
      )}

      <Tab.Screen 
        name="SettingsNav" 
        component={SettingsNavigator}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }} 
      />
    </Tab.Navigator>
  )
}