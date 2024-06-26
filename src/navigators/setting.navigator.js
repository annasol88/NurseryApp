import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PersonalDetailsScreen from '../features/settings/personal-details.screen';
import ChangeEmailScreen from '../features/settings/change-email.screen'
import ChangePasswordScreen from '../features/settings/change-password.screen';
import SettingsScreen from '../features/settings/settings.screen';


export default function SettingsNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Personal Details" component={PersonalDetailsScreen} />
      <Stack.Screen name="Change Email" component={ChangeEmailScreen} />
      <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
}