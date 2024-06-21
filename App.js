import { useState, useEffect } from 'react'
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './src/navigators/app.navigator';
import { auth } from './src/firebase/main'
import { onAuthStateChanged } from 'firebase/auth'
import { UserProvider } from './src/contexts/user.context'
import { getUser } from './src/services/user.service'
import { GlobalStyles } from './styles/shared.styles'
import { EventRegister } from 'react-native-event-listeners'

export default function App() { 
  const [currentUser, changeCurrentUser] = useState(undefined)
  const [isLoading, changeIsLoading] = useState(true)

  useEffect(() => {
    let userChangesListener = EventRegister.addEventListener('userUpdate', fetchUser)
    onAuthStateChanged(auth, (user) => {
      fetchUser(user)
    })
    return () => {
      EventRegister.removeEventListener(userChangesListener)
    }
  }, [])

  fetchUser = async (user) => {
    if(user) {
      let u = await getUser(user.email)
      changeCurrentUser(u)
    } else {
      changeCurrentUser(undefined)
    }
    changeIsLoading(false)
  }

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