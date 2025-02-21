import React from 'react';
import { SafeAreaView, View } from 'react-native';
import TodoList from './src/components/TodoList';
import { styles } from './src/components/styles'; // Importation du fichier styles.js

const App = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.innerContainer}>
        <TodoList />
      </SafeAreaView>
      {/* Bouton flottant */}
      <View style={styles.plusButton}>
        <View style={{ width: 24, height: 24, backgroundColor: 'white', borderRadius: 12 }} />
      </View>
    </View>
  );
};

export default App;