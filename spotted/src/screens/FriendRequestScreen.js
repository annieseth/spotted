import * as React from 'react';
import {useState} from 'react';
import { Button, 
         View, Text, Keyboard, TextInput, StyleSheet, Alert, TouchableWithoutFeedback } from 'react-native';
import {Auth, API, graphqlOperation} from 'aws-amplify';
import { createEvent } from '../graphql/mutations';
  
const FriendRequestScreen = ({ navigation }) => {
  const [ search, setSearch]    = useState('');
  
  // TODO this users list should be populated with friends who aren't friended
  const [users, setUsers] = useState(
    [
      {
        name: 'John Smith',
        activeSince: '1:53pM',
        username: 'User1',
        friend: true,
      },
      {
        name: 'Granny Jones',
        activeSince: '2:22PM',
        username: 'User2',
        friend: false,
      },
      {
        name: 'Jack Hungry',
        activeSince: '2:53PM',
        username: 'User3',
        friend: false,
      },
      {
        name: 'Kindle Salt',
        activeSince: '1:34PM',
        username: 'User4',
        friend: true,
      },
    ]
  )

  // used to pause runtime
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const handlePress = async () => {

    for (let i = 0; i < users.length; i++) {
      if (users[i].username === search && users[i].friend) {
        Alert.alert("Already Friends")
      }
      else if (users[i].username === search && !users[i].friend) {
        users[i].friend = true;
        Alert.alert("Friend Exists")
      }
    } 

  };

  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View styles={styles.container} >  
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

        <View style={{padding: 50}}>
         
        </View>
        <Text style={{textAlign: 'center', fontSize: 20}}>
            AD IN SPACE BELOW 

          </Text>
        <View style={styles.adBox}>
          
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    padding: 20,
    flexDirection: 'column'
  },
  textbox: {
    paddingHorizontal: 10,
    fontSize: 40
  },
  mainTitle: {
    fontSize:25,
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
  },
  buttonFont: {
    color: '#FF9900',
  },
  adBox: {
    flex:1,
    backgroundColor: '#d3d3d3',
    padding: 100,
  }

});

export default FriendRequestScreen;
  

