import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Task from './components/Task';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import InputTask from './components/InputTask';

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const response = await fetch('http://192.168.1.7:5000/todos/1');
    const data = await response.json();
    setTodos(data);
  }

  const clearTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) => 
        todo.id === id 
        ? {...todo, completed: todo.completed === 1 ? 0 : 1} 
        : todo
    ))
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaView style={styles.container} >
          <FlatList
            data={todos}
            keyExtractor={(todo) => todo.id}
            renderItem={({item}) => (
              <Task {...item} clearTodo={clearTodo} toggleTodo={toggleTodo} />
            )}
            ListHeaderComponent={() => <Text style={styles.title}>Todos los Días</Text>}
            contentContainerStyle={styles.contentContainerStyle}
          />
          <InputTask todos={todos} setTodos={setTodos} />
        </SafeAreaView>
        <StatusBar style="auto" />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9E9EF',
  },
  contentContainerStyle: {
    marginTop: 30,
    padding: 15
  },
  title: {
    fontWeight: '800',
    fontSize:28,
    marginBottom: 15,
    textAlign: 'center'
  }
});
