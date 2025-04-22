import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Task } from '@/types/interfaces'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

type TaskListItemProps = {
  task: Task
}

const TaskListItem = ({ task }: TaskListItemProps) => {
  return (
    <Link href={`/location/${task.locationId.toString()}/new-task?taskId=${task.id.toString()}`} asChild>
      <TouchableOpacity>
        <View style={styles.containter}>
          <View style={styles.iconContainter}>
            {task.isUrgent ? (
              <Ionicons name="warning-outline" size={24} color="red" style={{ marginRight: 8 }} />
            ) : (
              <Ionicons name="ellipse-outline" size={24} color="gray" style={{ marginRight: 8 }} />
            )}
          </View>
          <View style={styles.textContainter}>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.description}>{task.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  )
}

export default TaskListItem

const styles = StyleSheet.create({
  containter: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    // gap: 8,
    padding: 8,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  iconContainter: {
    // width: 24,
    // height: 24,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  textContainter: {
    flex: 1,
    // justifyContent: 'center',
  },
})