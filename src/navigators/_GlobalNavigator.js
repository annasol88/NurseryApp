
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabNavigator from "./_MainTabNavigator"
import LoginScreen from './src/features/login/LoginScreen';

export default function GlobalNavigator() {
  const Stack = createNativeStackNavigator();
  const isLoggedIn = true; // get from user service

  return (
    <Stack.Navigator>
      {!isLoggedIn ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <Stack.Screen name="App" component={MainTabNavigator} />
      )}
    </Stack.Navigator>
  )
}