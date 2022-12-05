import * as React from 'react';
import {useState} from 'react';
import { Button, 
         View, Text, Keyboard, TextInput, StyleSheet, Alert, TouchableWithoutFeedback,
        Image, Platform
        } from 'react-native';

import {Auth, API, graphqlOperation} from 'aws-amplify';
import { createEvent, createFriendRequest } from '../graphql/mutations';
import AndroidImage from '../components/AndroidImage'
import AppleImage from '../components/AppleImage'
import NavigationBar from '../components/NavigationBar';
import { getUser,getByUsername } from '../graphql/queries';


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

      /* 
    TODO
    This entire logic is for a local list. 
    The for loop will need to be removed 
    
    To make it with 
    AWS we will need to do the following 
    1. make a GRAPHQL query(search)
    2. checks as follows 
       a. if user does not exists
          i. alert user
       b. if user exists and already friends
          1. alert user that friend exists
       c. if user exists and not friends
          send the friend request
          alert saying that Friend Request send
    */
  const handlePress = async () => {
    console.log("pressed")
    Auth.currentAuthenticatedUser().then(async(user) => {

    if (search === user.username) {
      alert("Hey! You can't be friends with yourself")
      return;
    }


    // RETRIEVING THE USERS information based their ID 
    const friendFinder = await API.graphql({ query: getByUsername, variables: {
      username: search
    }, authMode: "AMAZON_COGNITO_USER_POOLS" });  

    // console.log(Object.keys(friendFinder.data.getByUsername.items).length)
    if (friendFinder.data.getByUsername.items.length === 0) {
      alert("Not a Valid Username")
      return;
    }

    
    Promise.resolve();
        
    // console.log(friendFinder.data.getByUsername.items[0].username)
    // console.log("USER ID " + friendFinder.data.getByUsername.items[0].id)
    
      // sending friend req to db
      const createResponse = await API.graphql({ query: createFriendRequest, variables: {input: {
        fromUser: user.username,
        fromUserId: user.attributes.sub,
        toUser: friendFinder.data.getByUsername.items[0].username,
        toUserId: friendFinder.data.getByUsername.items[0].id
      }}, authMode: "AMAZON_COGNITO_USER_POOLS" });

      // console.log(createResponse)
  
      Promise.resolve();
      
      // RETRIEVING THE USERS information based their ID 
      const getUserResponse = await API.graphql({ query: getUser, variables: {
        id: user.attributes.sub
      }, authMode: "AMAZON_COGNITO_USER_POOLS" });  

      if (getUserResponse.data.getUser.friend1 != null && getUserResponse.data.getUser.friend2 != null && getUserResponse.data.getUser.friend3 != null) {
        alert("Sorry Cant Add Anymore Friends")
      }
      
      
        Promise.resolve();
  
  
      // for (var fren in friends) {
      //   const getUserNameResponse = await API.graphql({ query: getByUsername, variables: {
      //     id: fren
      //   }, authMode: "AMAZON_COGNITO_USER_POOLS" });  
      //   console.log(getUserNameResponse)
      // }
      
  
    });
     



  };

  // identifying the System a user is on
  const systemName = Platform.OS;
  let deviceRender;
  if (systemName === 'android') {      
    deviceRender = < AndroidImage styleNeeded={styles.adBox} />;  
    
  } else {
    deviceRender = < AppleImage styleNeeded={styles.adBox} />;    
  }


  return (

    
    <View style={styles.container}>  
      <Text style={styles.mainTitle}>Search for Friend Below</Text>

      {/* View for the Where Text input Form */}
      <View style={{width:'70%'}}>
        <TextInput
          style={styles.input}
          onChangeText={setSearch}
          placeholder={"Ex: Username"}
        />  
      </View>

    
      <Button 
          title='Submit'
          color = '#FF9900'
          onPress={() => handlePress()}>      
      </Button>
      {/* <Text style={{textAlign: 'center', fontSize: 20}}>
          AD IN SPACE BELOW 

        </Text> */}
      <View>
        
        {/* <AndroidImage
          styleNeeded={styles.adBox}
        /> */}
        {deviceRender}

      </View>
      <View style={styles.bottom}>
        <NavigationBar 
          nav={navigation}
        />
        
      </View>
      
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
    flex: 1,
    alignItems: 'center'

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
    // flex:1,
    marginHorizontal:5,
    width: 375,
    height: 200,
  },

  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  }

});

export default FriendRequestScreen;
  

