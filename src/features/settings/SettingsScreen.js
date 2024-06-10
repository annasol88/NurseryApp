import { Pressable } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PersonalDetailsScreen from './PersonalDetailsScreen';
import ChangePasswordScreen from './ChangePasswordScreen';


export default function SettingsScreen() {
  const Stack = createNativeStackNavigator();

  return (
    <>
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="Personal Details" component={PersonalDetailsScreen} />
      <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
    </Stack.Navigator>

    <Pressable onPress={navigation.navigate('Personal Details')}> Update personal details </Pressable>
    <Pressable onPress={navigation.navigate('Change Password')}> Update password </Pressable>
    </>
  );
}