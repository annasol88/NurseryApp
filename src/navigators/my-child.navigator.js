import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyChildrenScreen from '../features/my-child/my-children.screen' 
import ChildActivityScreen from '../features/my-child/child-activity.screen';
import ReportAbsenceScreen from '../features/my-child/report-absence.screen'
import ChildProfileScreen from '../features/my-child/child-profile.screen'
import ProfileImageCameraScreen from '../features/my-child/profile-image-camera.screen'

export default function MyChildrenNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Child Activity" component={ChildActivityScreen} />
      <Stack.Screen name="Report Absence" component={ReportAbsenceScreen} />
      <Stack.Screen name="Child Profile" component={ChildProfileScreen} />
      <Stack.Screen name="Take Profile Image" component={ProfileImageCameraScreen} />
    </Stack.Navigator>
  )
}