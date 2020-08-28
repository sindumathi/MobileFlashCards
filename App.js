import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Constants from 'expo-constants';
import { yellow, brown, white } from './utils/colors';

import DeckIndex from './components/DeckIndex';
import AddCard from './components/AddCard';
import Deck from './components/Deck';
import AddDeck from './components/AddDeck';
import DeckView from './components/DeckView';
import Quiz from './components/Quiz';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

function DeckStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={createStore(reducer)}>
        <DeckStatusBar backgroundColor={brown} barStyle='light-content' />
        <Stack.Navigator>
          <Stack.Screen name='DeckIndex' component={DeckIndex} />
          <Stack.Screen name='AddDeck' component={AddDeck} />
          <Stack.Screen name='Deck' component={Deck} />
          <Stack.Screen name='DeckView' component={DeckView} />
          <Stack.Screen name='AddCard' component={AddCard} />
          <Stack.Screen name='Quiz' component={Quiz} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    minWidth: 320,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
