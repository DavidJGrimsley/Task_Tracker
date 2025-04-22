import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { useSQLiteContext } from 'expo-sqlite'
import { useEffect, useState } from 'react'
import { Alert, Image, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Task } from '@/types/interfaces'
import * as ImagePicker from 'expo-image-picker'
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})
    

const Page = () => {
  const { id: locationId, taskId } = useLocalSearchParams()

  const router = useRouter()
  const db = useSQLiteContext()

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [isUrgent, setIsUrgent] = useState<boolean>(false)
  const [imageUri, setImageUri] = useState<string | null>(null)
  const [locationName, setLocationName] = useState<string>('')

  useEffect(() => {
    loadLocation()
    if (taskId) {
      loadTaskData()
    } 
    Notifications.requestPermissionsAsync();
  }, [taskId])
    
    const loadLocation = async () => {
      const location = await db.getFirstAsync<{ name: string }>(`SELECT name FROM locations WHERE id = ?`, [Number(locationId)])
      setLocationName(location?.name || '')
    }

    const loadTaskData = async () => {
      const task = await db.getFirstAsync<Task>(`SELECT * FROM tasks WHERE id = ?`, [Number(taskId)])
      if (task) {
        setTitle(task.title)
        setDescription(task.description)
        setIsUrgent(task.isUrgent === true)
        setImageUri(task.imageUri || null)
        // Load location name
      }
    }

    const handleSaveTask = async () => {
      let newTaskId = Number(taskId);
      if (taskId) {
        // Update existing task
        await db.runAsync(`UPDATE tasks SET title = ?, description = ?, isUrgent = ?,  imageUri = ? WHERE id = ?`, [
          title, 
          description, 
          isUrgent ? 1 : 0,  
          imageUri,
          Number(taskId)])
      } else {
        // insert new task
        const result = await db.runAsync(`INSERT INTO tasks (title, description, isUrgent, locationId, imageUri) VALUES (?, ?, ?, ?, ?)`, [
          title, 
          description, 
          isUrgent ? 1 : 0, 
          Number(locationId), 
          imageUri])
        newTaskId = result.lastInsertRowId
      }

      if (isUrgent) {
        scheduleNotification(newTaskId, title)
      }

      router.back()
    }

    const handleFinishTask = async () => {
      Alert.alert('Finish Task', 'Are you sure you want to finish this task? (It will be removed from the database)', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Finish!', onPress: async () => {
          await db.runAsync(`DELETE FROM tasks WHERE id = ?`, [Number(taskId)])
          router.back()
          },
        },]
      )
    }
    
    const pickImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images', 'videos'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })
      if (!result.canceled) {
        setImageUri(result.assets[0].uri)
      }
    }
    
    const scheduleNotification = async (taskId: Number, title: String) => {
      Notifications.scheduleNotificationAsync({
        content: {
          title: `Task ${title} is due!`,
          body: 'You have a task due soon.',
          data: { taskId, locationId },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 5, // Schedule for 5 seconds from now
          repeats: false, // Ensure the notification does not repeat
        },
      });
    }

    return (
      <ScrollView style={styles.container}>
        <Stack.Screen options={
          taskId ? {title: title + ' at ' + locationName || 'Tasks', headerBackTitle: 'Back', headerTintColor: '#aaa', headerStyle: { backgroundColor: '#8f17ff' } }
          : {title: 'New Task at ' + locationName || 'Tasks', headerBackTitle: 'Back', headerTintColor: '#aaa', headerStyle: { backgroundColor: '#8f17ff' } }
          } />
        <TextInput style={styles.input} placeholder='Title' value={title} onChangeText={setTitle} />
        <TextInput style={[styles.input, styles.multiLineInput]} placeholder='Description' value={description} onChangeText={setDescription} multiline />
        <View style={styles.row}>
          <Text style={styles.text}>Urgent</Text>
          <Switch 
            value={isUrgent} onValueChange={setIsUrgent} 
            trackColor={{false: "#8f17ff", true: "#f2a310"}}
            thumbColor={isUrgent ? "#8f17ff" : "#f2a310"}
          />
        </View>

        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
          />
        )}

        <TouchableOpacity style={[styles.button, styles.imageButton]} onPress={pickImage}>
          <Text style={styles.buttonText}>{imageUri ? 'Change image' : 'Add image'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSaveTask}>
          <Text style={styles.buttonText}>{taskId ? 'Update Task' : 'Create Task'}</Text>
        </TouchableOpacity>

        {taskId && (
          <TouchableOpacity style={[styles.button, styles.finishButton]} onPress={handleFinishTask}>
            <Text style={styles.buttonText}>Mark task complete</Text>
          </TouchableOpacity>
        )}

      </ScrollView>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  multiLineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  text: {
    fontSize: 24,
    color: '#333',
  },
  button: {
    backgroundColor: '#8f17ff',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginVertical: 8,
  },
  imageButton: {
    backgroundColor: '#666',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  finishButton: {
    backgroundColor: '#f2a310',
  },
  image: { 
    // width: '100%', 
    height: 200, 
    marginBottom: 16, 
    resizeMode: 'contain',
  },
})