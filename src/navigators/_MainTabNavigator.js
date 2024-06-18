import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import HomeNavigator from './HomeNavigator';
import ChildActivityAdminScreen from '../features/child-activity-admin/ChildAdminScreen'
import ChildActivityNavigator from './ChildActivityNavigator'
import SettingsNavigator from './SettingsNavigator';

export default function MainTabNavigator() {
    const Tab = createBottomTabNavigator();
  
    const isParent = true; //TODO refactor to user service

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
        {isParent ? (
          <Tab.Screen 
            name="ChildNav" 
            component={ChildActivityNavigator}
            options={{
              tabBarLabel: 'My Child',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="baby-face" color={color} size={size} />
              ),
            }} 
          />
        ) : (
          <Tab.Screen 
            name="ChildAdminNav" 
            component={ChildActivityAdminScreen}
            options={{
              tabBarLabel: 'Child Activities',
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