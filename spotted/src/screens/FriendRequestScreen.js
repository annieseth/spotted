import * as React from 'react';
import {useState} from 'react';
import { Button, View, Text, Switch, TextInput, StyleSheet, Alert } from 'react-native';
import {Auth, API, graphqlOperation} from 'aws-amplify';
import { createEvent } from '../graphql/mutations';
  
const FriendRequestScreen = ({ navigation }) => {
  const [ search, setSearch]    = useState('');
  
  // TODO this users list should be populated with friends who aren't friended
  const [users, setUsers] = useState(
    [
      {
        id: 0,
        name: 'John Smith',
        activeSince: '1:53pM',
        username: 'User1'
      },
      {
        id: 1,
        name: 'Granny Jones',
        activeSince: '2:22PM',
        username: 'User2'

      },
      {
        id: 0,
        name: 'Jack Hungry',
        activeSince: '2:53PM',
        username: 'User3'
      },
      {
        id: 0,
        name: 'Kindle Salt',
        activeSince: '1:34PM',
        username: 'User4',
      },
    ]
  )

  // used to pause runtime
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const handlePress = async () => {

    for (let i = 0; i < users.length; i++) {
      if (users[i].username === search) {
        console.log("Friend Exists")
      }
    } 

  };

  return (

    
    <View>  
    <Text style={styles.mainTitle}>Search for Friend Below</Text>

      {/* View for the Where Text input Form */}
      <View style={{padding:20}}>
        <TextInput
          style={styles.input}
          onChangeText={setSearch}
          placeholder={"Ex: Username"}
        />  
      </View>

     
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
    borderRadius: 25
  },
  container:{
 
    justifycontent: 'center',
    alignItems: 'center',
    padding: 20
  },
  textbox: {
    paddingHorizontal: 10,
    fontSize: 40
  },
  mainTitle: {
    fontSize:25,
    alignItems: 'center',
    textAlign: 'center',
    padding: 10
  },
  buttonFont: {
    color: '#FF9900',
  }

});

export default FriendRequestScreen;
  

