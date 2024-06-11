import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './src/features/home/HomeScreen';
import ChildActivityAdminScreen from'./src/features/child-activity-admin/ChildActivityAdminScreen'
import ChildActivityScreen from './src/features/child-activity/ChildActivityScreen';
import SettingsScreen from './src/features/settings/SettingsScreen';

export default function MainTabNavigator() {
    const Tab = createBottomTabNavigator();
  
    const isParent = true; //TODO refactor to user service

    return (
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
        {!isParent ? (
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
        ) : (
          <Tab.Screen 
            name="Child Activities" 
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
    )
}