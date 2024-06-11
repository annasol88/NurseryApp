import { Text, TextInput } from 'react-native';

export default function LoginScreen() {
  const [username, usernameChange] = React.useState('');
  const [password, passwordChange] = React.useState('');

  login = () => {
    console.log(`login: ${username} - ${password}`)
  }
  
  return (
    <View>
      <Text>My Nursery App</Text>
      <TextInput
        onChangeText={usernameChange}
        value={number}
        placeholder="Enter Username"
        keyboardType="default"
      />
      <TextInput
        onChangeText={passwordChange}
        value={number}
        placeholder="Enter Password"
        keyboardType="default"
      />

      <Pressable onPress={login}>
        Login
      </Pressable>
    </View>
  );
}