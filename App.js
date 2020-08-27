import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

import DeckIndex from './components/DeckIndex';
import AddCard from './components/AddCard';
import AddDeck from './components/AddDeck';

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <View style={styles.container}>
        <DeckIndex />
        <AddCard />
        <AddDeck />
        <StatusBar style='auto' />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
