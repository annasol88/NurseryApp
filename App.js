import { NavigationContainer } from '@react-navigation/native';
import GlobalNavigator from './src/navigators/_GlobalNavigator';
import { useState, useEffect } from 'react'
import { auth } from './src/firebase/main'
import { onAuthStateChanged } from 'firebase/auth'
import { AuthProvider } from './src/contexts/AuthContext'

export default function App() { 
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
     })
  }, [])

  return (
    <AuthProvider value={{currentUser}}>
      <NavigationContainer>
        <GlobalNavigator />
      </NavigationContainer>
    </AuthProvider>
  )
}