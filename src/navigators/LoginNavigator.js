import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../features/login/LoginScreen';
import SignUpScreen from '../features/login/SignUpScreen'

export default function LoginNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
    </Stack.Navigator>
  );
}