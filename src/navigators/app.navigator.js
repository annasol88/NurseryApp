
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RootNavigator from './root.navigator'
import LoginNavigator from './login.navigator'
import { useUserContext } from '../contexts/user.context'

export default function AppNavigator() {
  const Stack = createNativeStackNavigator();
  const {currentUser} = useUserContext()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!currentUser ? (
        <Stack.Screen name="LoginNav" component={LoginNavigator} />
      ) : (
        <Stack.Screen name="Root" component={RootNavigator} />
      )}
    </Stack.Navigator>
  )
}