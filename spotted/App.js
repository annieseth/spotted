import * as React from 'react';
import { Component } from 'react';
import { Button, View, Text, Switch, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {HomeScreen} from './src/screens/HomeScreen'
import {EventRequestScreen} from './src/screens/EventReq';
import Icon from 'react-native-vector-icons/FontAwesome'

import { withAuthenticator } from 'aws-amplify-react-native'
import {Auth} from 'aws-amplify';



import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';



Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
});

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },   logOutBtn: {
    marginLeft: 10,
  },
});






const Stack = createNativeStackNavigator();

class App extends Component {
  render() {
    
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        
        <Stack.Screen name="Event Request" component={EventRequestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  }
}

export default withAuthenticator(App);
