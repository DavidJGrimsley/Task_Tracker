import { Slot, Stack } from 'expo-router'
import { DrawerToggleButton } from '@react-navigation/drawer'
import { View } from 'react-native'

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="[id]" options={{ 
        headerLeft: () => (
          <View style={{ marginLeft: -16 }}>
            <DrawerToggleButton tintColor='#aaa'/>
          </View>
        )
      }} />
      <Stack.Screen 
        name="[id]/new-task" 
        options={{ 
          title: 'New Task',
        }} 
      />
    </Stack>
  )
}

export default Layout