import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { useSQLiteContext } from 'expo-sqlite';
import { DrawerContentScrollView, DrawerItem, DrawerItemList, useDrawerStatus } from '@react-navigation/drawer';
import { Image, View, StyleSheet, Text } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { Location } from '@/types/interfaces';
import Logo from '@/assets/images/logo.png';


// const db = SQLite.openDatabaseSync('reports.db');

const LOGO_IMAGE = Image.resolveAssetSource(Logo).uri

const CustomDrawerContent = (props:any) => {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();
  const db = useSQLiteContext();
  const [locations, setLocations] = useState<Location[]>([]);
  const isDrawerOpen = useDrawerStatus() === 'open';
  const pathName = usePathname();

  useEffect(() => {
    if (isDrawerOpen) {
      console.log('useEffect started')
      loadLocations()
    }
  }, [isDrawerOpen]);

  const loadLocations = async () => {
    const newLocations = await db.getAllAsync<Location>(`SELECT * FROM locations`);
    setLocations(newLocations);
    console.log('🚀 ~ loadLocations ~ locations:', newLocations);
  };

  return ( 
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView>
        <Image source={{ uri:LOGO_IMAGE}} style={styles.image}/>
        <View style={styles.locationsContainer}>
          <DrawerItemList {...props} /> 
          <Text style={styles.title}>Locations</Text>
          {locations.map((location) => {
            const isActive = pathName === `/location/${location.id}`;   
            return (
            <DrawerItem 
              key={location.id}
              label={location.name}
              onPress={() => router.navigate(`/location/${location.id}`)}
              focused={isActive}
              activeTintColor='#f2a310'
              inactiveTintColor = '#000'
            />
            )})}
        </View>
      </DrawerContentScrollView>
      <View style={{ 
          paddingBottom: 16 + bottom,
          paddingLeft: 16,
          padding: 8,
          borderTopWidth: 1,
          borderTopColor: '#ccc',
          backgroundColor: '#f5f5f5',
        }}>
        <Text>Copyright Grimsley 2024</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  locationsContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 16,
    paddingTop: 24,
    color: '#11aaaa',
  },
  footer: {
    paddingBottom: 20,
  }
});
// const db = useSQLiteContext();

const Layout = () => {
  return ( 
    <GestureHandlerRootView>
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          drawerActiveTintColor: '#f2a310',
          headerTintColor: '#aaa',
          headerStyle: {
            backgroundColor: '#f5f5f5',
          },
        }}
      >
          <Drawer.Screen name="index" options={{ 
            title: 'Manage', 
            headerStyle: {backgroundColor: '#8f17ff', height: 56},
            // headerTitleContainerStyle: { paddingTop: 20 }, // Adjusted padding for the title container
            headerShown: true,
            }} />
          <Drawer.Screen name="location" options={{ headerShown: false, drawerItemStyle: { display: 'none'} }} />
      </Drawer>
    </GestureHandlerRootView>
  )
}
export default Layout;