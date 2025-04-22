import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Link, Stack, useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router'
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react'
import { Task } from '@/types/interfaces'
import { FlatList } from 'react-native-gesture-handler';
import TaskListItem from '@/components/TaskListItem';
import globalStyles from '@/assets/styles';
import { Ionicons } from '@expo/vector-icons';

const Page = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter()
  const db = useSQLiteContext()
  const [tasks, setTasks] = useState<Task[]>([])
  const [locationName, setLocationName] = useState<string>('')

  const loadLocationData = useCallback(async () => {
    const [location] = await db.getAllAsync<{name: string}>(`SELECT * FROM locations WHERE id = ?`, [Number(id)]);
    console.log('🚀 ~ loadLocationData ~ location:', location);
    if (location) {
      setLocationName(location.name);
    }

    // Load tasks for the location
    const newTasks = await db.getAllAsync<Task>(`SELECT * FROM tasks WHERE locationId = ?`, [Number(id)]);
    setTasks(newTasks);
  },[id, db])

  useFocusEffect(
    useCallback(() => {
      loadLocationData();
    }, [loadLocationData])
  );

  return (
    <View style={{ flex: 1}}>
      <Stack.Screen options={{ title: locationName || 'Tasks', headerTintColor: '#aaa', headerStyle: { backgroundColor: '#8f17ff' } }} />
      <FlatList
        ListEmptyComponent={<Text style={globalStyles.emptyText}>No tasks left!</Text>} 
        data={tasks} 
        renderItem={({ item }) => <TaskListItem task={item} />}
      />
      <Link href={`/location/${id}/new-task`} asChild>
        <TouchableOpacity style={styles.fab} onPress={() => router.push(`/location/${id}/new-task`)} >
          <Ionicons name="add" size={24} color="#f2a310" />
        </TouchableOpacity>
      </Link>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#8f17ff',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#f2a310',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: .9,
    shadowRadius: 50,
    elevation: 5,
  },
})