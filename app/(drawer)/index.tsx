import { StyleSheet, Text, View } from 'react-native'
import { useState, useEffect } from 'react'
import { useSQLiteContext } from 'expo-sqlite'
import { Location } from '@/types/interfaces'
import LocationForm from '@/components/LocationForm'
import { FlatList } from 'react-native-gesture-handler'
import LocationListItem from '@/components/LocationListItem'
import globalStyles from '@/assets/styles'

const index = () => {
  const db = useSQLiteContext()
  const [locations, setLocations] = useState<Location[]>([])

  useEffect(() => {
    console.log('useEffect started')
    loadLocations()
  }, []);

  const loadLocations = async () => {
    const newLocations = await db.getAllAsync<Location>(`SELECT * FROM locations`);
    setLocations(newLocations);
    console.log('🚀 ~ loadLocations ~ locations:', newLocations);
  };
  console.log('🚀 ~ outsideLocations ~ locations:', locations);

  const addLocation = async (name: string) => {
    await db.runAsync(`INSERT INTO locations (name) VALUES (?)`, name);
    loadLocations();
  };

  return (
    <View style={styles.containter}>
      <LocationForm onSubmit={addLocation}/>
      <FlatList 
        data={locations} 
        renderItem={({ item }) => <LocationListItem location={item} onDelete={loadLocations} />}
      ListEmptyComponent={<Text style={globalStyles.emptyText}>No locations added yet!</Text>} />
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  containter: {
    flex: 1
  },
  
})