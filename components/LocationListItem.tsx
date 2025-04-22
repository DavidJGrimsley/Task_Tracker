import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Location } from '@/types/interfaces'
import { Ionicons } from '@expo/vector-icons'
import { useSQLiteContext } from 'expo-sqlite'

type LocationListItemProps = {
  location: Location
  onDelete: () => void
}

const LocationListItem = ({ location, onDelete }: LocationListItemProps) => {
  const db = useSQLiteContext()

  const handleDelete = async () => {
    await db.runAsync(`DELETE FROM locations WHERE id = ?`, [location.id])
    onDelete();
  };

  return (
    <View style={styles.containter}>
      <Text style={styles.name}>{location.name}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  )
}

export default LocationListItem

const styles = StyleSheet.create({
  containter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    backgroundColor: '#fff',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  deleteButton: {
    padding: 8,
  },

})