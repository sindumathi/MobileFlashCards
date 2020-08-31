import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middleware from './middleware';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Constants from 'expo-constants';
import { yellow, brown, white } from './utils/colors';
import Ionicons from '@expo/vector-icons/Ionicons';

import DeckIndex from './components/DeckIndex';
import AddCard from './components/AddCard';
import Deck from './components/Deck';
import AddDeck from './components/AddDeck';
import DeckView from './components/DeckView';
import Quiz from './components/Quiz';
import EmptyCard from './components/EmptyCard';
import Results from './components/Results';

const Stack = createStackNavigator();

function DeckStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}
const Home = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'DeckIndex') {
            iconName = focused ? 'md-list-box' : 'md-list';
          } else if (route.name === 'AddDeck') {
            iconName = focused ? 'md-add-circle' : 'md-add-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: yellow,
        inactiveTintColor: brown,
      }}
    >
      <Tab.Screen name='DeckIndex' component={DeckIndex} />
      <Tab.Screen name='AddDeck' component={AddDeck} />
    </Tab.Navigator>
  );
};

class App extends Component {
  store = createStore(reducer, middleware);
  render() {
    return (
      <NavigationContainer>
        <Provider store={this.store}>
          <DeckStatusBar backgroundColor={brown} barStyle='light-content' />
          <Stack.Navigator>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Deck' component={Deck} />
            <Stack.Screen name='DeckView' component={DeckView} />
            <Stack.Screen name='AddCard' component={AddCard} />
            <Stack.Screen name='Quiz' component={Quiz} />
            <Stack.Screen name='Results' component={Results} />
            <Stack.Screen name='EmptyCard' component={EmptyCard} />
          </Stack.Navigator>
        </Provider>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    minWidth: 320,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabcontainer: {
    color: yellow,
    fontSize: 20,
  },
});
export default App;
