import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalNavigator from './src/navigators/_GlobalNavigator';
import GlobalStyles from './src/styles/shared.styles'

export default function App() { 
  return (
    <SafeAreaView style={GlobalStyles.main}>
      <NavigationContainer>
        <GlobalNavigator />
      </NavigationContainer>
    </SafeAreaView>
  )
}