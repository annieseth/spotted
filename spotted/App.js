import * as React from 'react';
import { Component } from 'react';
import { Button, View, Text, Switch, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {HomeScreen} from './src/screens/HomeScreen'
import {EventRequestScreen} from './src/screens/EventReq';
import {InvitesScreen} from './src/screens/InvitesScreen';









const Stack = createNativeStackNavigator();

class App extends Component {
  render() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        
        <Stack.Screen name="Event Request" component={EventRequestScreen} />
        <Stack.Screen name="Invites" component={InvitesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  }
}

export default App;
