import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyChildrenScreen from '../features/my-children/my-children.screen' 
import ChildActivityScreen from '../features/my-children/child-activity.screen';
import ChildProfileScreen from '../features/my-children/child-profile.screen';
import ReportAbsenceScreen from '../features/my-children/report-absence.screen'
import EditChildProfileScreen from '../features/my-children/edit-profile.screen'

export default function ChildActivityNavigator() {
    const Stack = createNativeStackNavigator();
  
    return (
      <Stack.Navigator>
        <Stack.Screen name="My Children" component={MyChildrenScreen} />
        <Stack.Screen name="Child Activity" component={ChildActivityScreen} />
        <Stack.Screen name="Report Absence" component={ReportAbsenceScreen} />
        <Stack.Screen name="Child Profile" component={ChildProfileScreen} />
        <Stack.Screen name="Update Child Profile" component={EditChildProfileScreen} />
      </Stack.Navigator>
    )
  }