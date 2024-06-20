import { useState, useEffect } from 'react'
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './src/navigators/app.navigator';
import { auth } from './src/firebase/main'
import { onAuthStateChanged } from 'firebase/auth'
import { UserProvider } from './src/contexts/user.context'
import { getUser } from './src/services/user.service'
import { GlobalStyles } from './styles/shared.styles'
import Camera from './src/features/news-feed/CameraTestScreen';

export default function App() { 
  const [currentUser, changeCurrentUser] = useState(undefined)
  const [isLoading, changeIsLoading] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        getUser(user.email).then((user) => {
          changeCurrentUser(user)
          changeIsLoading(false)
        })
        // setCurrentUser({
        //   email: user.email,
        //   role: 'PARENT',
        //   children: ['annasol', 'jojo']
        // })
      } else {
        changeCurrentUser(undefined)
        changeIsLoading(false)
      }
    })
  }, [])

  if(isLoading) {
    return (
      <Text style={GlobalStyles.center}>Loading...</Text>
    )
  }

  return (
    <UserProvider value={{currentUser}}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </UserProvider>
  )
}