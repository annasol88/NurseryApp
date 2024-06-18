import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChildActivityScreen from '../features/child-activity/ChildActivityScreen';
import ChildInformationScreen from '../features/child-activity/ChildInformationScreen';
import ReportAbsenceScreen from '../features/child-activity/ReportAbsenceScreen'

export default function ChildActivityNavigator() {
    const Stack = createNativeStackNavigator();
  
    return (
      <Stack.Navigator>
        <Stack.Screen name="My Child" component={ChildActivityScreen} />
        <Stack.Screen name="Report Absence" component={ReportAbsenceScreen} />
        <Stack.Screen name="Child Information" component={ChildInformationScreen} />
      </Stack.Navigator>
    )
  }