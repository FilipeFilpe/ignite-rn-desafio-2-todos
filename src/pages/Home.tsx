import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (tasks.some(task => task.title === newTaskTitle)) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
      return
    }
    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks([...tasks, newTask])
  }

  function handleEditTask(id: number, taskNewTitle: string) {
    const newTasks: Task[] = tasks.map(task => ({
      ...task,
      title: task.id === id ? taskNewTitle : task.title
    }))
    setTasks(newTasks)
  }

  function handleToggleTaskDone(id: number) {
    const newTasks: Task[] = tasks.map(task => ({
      ...task,
      done: task.id === id ? !task.done : task.done
    }))
    setTasks(newTasks)
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [
      {
        text: 'Não',
        style: "cancel",
      },
      {
        text: 'Sim',
        onPress: () => {
          const newTasks: Task[] = tasks.filter(task => task.id !== id)
          setTasks(newTasks)
        },
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})