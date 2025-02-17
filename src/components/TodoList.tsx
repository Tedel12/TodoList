import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState('');


  // Charger les tâches au démarrage
  useEffect(() => {
    const loadTasks = async () => {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    };
    loadTasks();
  }, []);

  // Sauvegarder les tâches à chaque mise à jour
  useEffect(() => {
    AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);


  const addTask = () => {
    if (taskTitle.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), title: taskTitle, completed: false }]);
      setTaskTitle('');
    }
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={task => task.id}
        renderItem={({ item }) => (
          <View style={[styles.taskItem, item.completed && styles.completedTask]}>
            <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
              <Icon name={item.completed ? 'check-circle' : 'circle'} size={24} color="#4CAF50" />
            </TouchableOpacity>
            <Text style={[styles.taskText, item.completed && styles.taskTextCompleted]}>
              {item.title}
            </Text>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Icon name="trash-2" size={20} color="#F44336" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Bouton flottant "+" */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nouvelle tâche..."
          value={taskTitle}
          onChangeText={setTaskTitle}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Icon name="plus" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    marginTop:20
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completedTask: {
    opacity: 0.5,
  },
  taskText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  inputContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 20,
    elevation: 5,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#1565C0',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    elevation: 3,
  },
});

export default TodoList;