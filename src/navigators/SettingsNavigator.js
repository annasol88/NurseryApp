import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PersonalDetailsScreen from '../features/settings/PersonalDetailsScreen';
import ChangePasswordScreen from '../features/settings/ChangePasswordScreen';
import SettingsScreen from '../features/settings/SettingsScreen';


export default function SettingsNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Personal Details" component={PersonalDetailsScreen} />
      <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
}