
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabNavigator from './_MainTabNavigator'
import LoginNavigator from './LoginNavigator'
import { useAuthValue } from '../contexts/AuthContext'

export default function GlobalNavigator() {
  const Stack = createNativeStackNavigator();

  const {currentUser} = useAuthValue()
  console.log(currentUser)

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!currentUser ? (
        <Stack.Screen name="LoginNav" component={LoginNavigator} />
      ) : (
        <Stack.Screen name="Root" component={MainTabNavigator} />
      )}
    </Stack.Navigator>
  )
}