USERS
- email
- avatar
- role
- children [name, name]

CHILREN 
...info
activities []


stuff::
PRESSABLE:
<Pressable onPress={login} style={({pressed}) =>[
GlobalStyles.buttonPrimary, 
pressed && GlobalStyles.buttonPrimaryPressed
]}>
<Text style={GlobalStyles.buttonPrimaryContent}>Login</Text>
</Pressable>