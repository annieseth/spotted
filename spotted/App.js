import * as React from 'react';
import { Component } from 'react';
import { Button, View, Text, Switch, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome'
import HomeScreen from './src/screens/HomeScreen'
import EventRequestScreen from './src/screens/EventRequestScreen';
import InvitesScreen from './src/screens/InvitesScreen';
import FriendRequestScreen from './src/screens/FriendRequestScreen';

import { withAuthenticator } from 'aws-amplify-react-native'
import {Auth, API, graphqlOperation} from 'aws-amplify';



import Amplify from 'aws-amplify';

import awsconfig from './aws-exports';
import UpcomingEventsScreen from './src/screens/UpcomingEventsScreen';


Amplify.configure({
  // // FOR RUSHI ONLY 
  // ...awsmobile,
  // FOR EVERYONE ELSE
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


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Event Request" component={EventRequestScreen} />
        <Stack.Screen name="Invites" component={InvitesScreen} />
        <Stack.Screen name="Events" component={UpcomingEventsScreen} />
        <Stack.Screen name="Friends" component={FriendRequestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default withAuthenticator(App);
// expot default App;