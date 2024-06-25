import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import HomeNavigator from './news-feed.navigator';
import ChildrenAdminNavigator from './children-admin.navigator'
import MyChildrenNavigator from './my-child.navigator'
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
          tabBarActiveTintColor:'#F85A3E',
          tabBarInactiveTintColor:'#EFEFEF',
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
            tabBarActiveTintColor:'#F85A3E',
            tabBarInactiveTintColor:'#EFEFEF',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-group" color={color} size={size} />
            ),
          }} 
        />
      ) : (
        <Tab.Screen 
          name="MyChildNav" 
          component={MyChildrenNavigator}
          options={{
            tabBarLabel: 'My Child',
            tabBarActiveTintColor:'#F85A3E',
            tabBarInactiveTintColor:'#EFEFEF',
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
          tabBarActiveTintColor:'#F85A3E',
          tabBarInactiveTintColor:'#EFEFEF',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }} 
      />
    </Tab.Navigator>
  )
}