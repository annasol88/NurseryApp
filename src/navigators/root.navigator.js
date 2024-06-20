import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import HomeNavigator from './news-feed.navigator';
import ChildrenAdminScreen from '../features/children-admin/children-admin.screen';
import ChildActivityNavigator from './my-children.navigator'
import SettingsNavigator from './setting.navigator';
import { useUserContext } from '../contexts/user.context'

export default function RootNavigator() {
  const Tab = createBottomTabNavigator();
  const {currentUser} = useUserContext();

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="HomeNav" 
        component={HomeNavigator} 
        options={{
          tabBarLabel: 'News Feed',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      {currentUser.role === 'ADIM' ? (
        <Tab.Screen 
          name="ChildAdminNav" 
          component={ChildrenAdminScreen}
          options={{
            tabBarLabel: 'Child Admin',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="baby-face" color={color} size={size} />
            ),
          }} 
        />
      ) : (
        <Tab.Screen 
          name="ChildNav" 
          component={ChildActivityNavigator}
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