import React from 'react'
import { Button, View, Text, Switch, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import {Auth, API, graphqlOperation} from 'aws-amplify';
import { updateEvent } from '../graphql/mutations';

export default function Event({ nav, name, id, location, time, phoneNo,notes }) {
  
  console.log(phoneNo)
  
  return (
    <View style={styles.row}>
      <Text style={styles.text}>{name}</Text>
      <Text>{location}</Text>
      <Text>{time}</Text> 
      <Text>{phoneNo}</Text>
      <Text>{notes}</Text>

    </View>
  )
}

const styles = StyleSheet.create({
  input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
  },
  container: {
      flex: 1,
      alignItems: 'center'
  },
  bottom: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 36
  },
  row: {
      width: '80%',
      height: 80,
      display: 'flex',
      padding: 20,
      margin: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#D3D3D3',
      borderRadius: 8
  },

  text: {
    fontSize: 16
  },

  closeButton: {
    height: '100%',
    color: 'red'
  },

  buttons: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%'
  }


});
