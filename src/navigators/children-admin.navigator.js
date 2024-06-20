import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChildrenAdminScreen from '../features/children-admin/children-admin.screen';

export default function ChildrenAdminNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="My Children" component={ChildrenAdminScreen} />
    </Stack.Navigator>
  )
}