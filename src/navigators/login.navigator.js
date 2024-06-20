import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../features/login/login.screen';
import SignUpScreen from '../features/login/sign-up.screen'

export default function LoginNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
    </Stack.Navigator>
  );
}