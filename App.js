import { useState, useEffect } from 'react'
import { ActivityIndicator, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { EventRegister } from 'react-native-event-listeners'

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './src/firebase/main'

import AppNavigator from './src/navigators/app.navigator'
import { UserProvider } from './src/contexts/user.context'
import { getUser } from './src/services/user.service'
import { GlobalStyles } from './styles/shared.styles'

export default function App() { 
  let [currentUser, changeCurrentUser] = useState(undefined)
  let [isLoading, changeIsLoading] = useState(false)
  let [error, changeError] = useState('');

  useEffect(() => {
    // to update current user in context if email/child/profile changes in app
    let userChangeListener = EventRegister.addEventListener(
      'userUpdate', (email) => fetchUser(email)
    )

    // to update user when firebase authentication changes - recommended approach
    onAuthStateChanged(auth, (user) => {  
      if(user) {
        fetchUser(user.email)
      } else {
        // user will be undefined on signout - setting this navigates to login screen
        changeCurrentUser(undefined)
      }
    })
    return () => {
      EventRegister.removeEventListener(userChangeListener)
    }
  }, [])

  fetchUser = async (email) => {
    changeIsLoading(true)

    getUser(email).then(user => {
      changeCurrentUser(user)
    }).catch(err => {
      console.error(err)
      changeError("Something went wrong processing your request. Please try again later or contact a member of staff.")
    }).finally(() => {
      changeIsLoading(false)
    })
  }

  if(isLoading) {
    return <ActivityIndicator style={GlobalStyles.center} size="large" color="#F85A3E" />
  }
  
  if(error) {
    return (
      <View style={[GlobalStyles.container, GlobalStyles.empty]}>
        <Text style={GlobalStyles.emptyText}>{error}</Text>
      </View>
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