import * as React from 'react';
import { Component } from 'react';
import {useState} from 'react';
import { Button, View, Text, Switch, TextInput, StyleSheet, Alert } from 'react-native';
import {Auth, API, graphqlOperation} from 'aws-amplify';
import { createEvent } from '../graphql/mutations';
  
const FriendRequestScreen = ({ navigation }) => {
  const [ search, setSearch]    = useState('');
  
  const [friends, setFriends] = useState(
    [
      {
        id: 0,
        name: 'John Smith',
        activeSince: '1:53pM'
      },
      {
        id: 1,
        name: 'Granny Jones',
        activeSince: '2:22PM'
      },
      {
        id: 0,
        name: 'Jack Hungry',
        activeSince: '2:53PM'
      },
      {
        id: 0,
        name: 'Kindle Salt',
        activeSince: '1:34PM'
      },
    ]
  )

  // used to pause runtime
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const handlePress = async () => {

    

  };

  return (

    
    <View style={{padding:20}}>  
    <Text>Search for Friend Below</Text>

     
      <Button 
          title='Submit'
          onPress={() => handlePress()}>      
      </Button>
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
});

export default FriendRequestScreen;
  

