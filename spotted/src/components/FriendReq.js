import React from 'react'
import { Button, View, Text, Switch, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import {Auth, API, graphqlOperation} from 'aws-amplify';
import { updateFriendRequest, updateUser } from '../graphql/mutations';
import { getUser } from '../graphql/queries';



export default function FriendReq({ nav, name, handleRemove, index, toUserId, fromUserId }) {
  
  
//to accept friend request and send to dynadb
  const acceptReq = () => {
    backendAddFriend()
    console.log("Request accepted")


    //handle setting response

    const updateResponse = API.graphql({query: updateFriendRequest, variables: {input : {id: index, toUserResponse: true}}, authMode: "AMAZON_COGNITO_USER_POOLS"});
    Promise.resolve();
    

    alert("Request accepted!")
    nav.navigate("Home");
    //() => removeRequest(index)
  }

//to decline friend request and send to dynadb
  const declineReq = () => {
    console.log("Request declined")

    //handle setting response
    const updateResponse = API.graphql({query: updateFriendRequest, variables: {input : {id: index, toUserResponse: false}}, authMode: "AMAZON_COGNITO_USER_POOLS"});
    Promise.resolve();
    alert("Request declined!")
    nav.navigate("Home");
    //() => removeRequest(index)
  }

  const removeRequest = i => {
    handleRemove(i);
    console.log("Hello, item id is")
    console.log(i)
  }

  //acceptingId is the current user == toUserId
  //sendingId is for the user who started the request == fromUserId
  //const backendAddFriend = async(acceptingId, sendingId) => {
  const backendAddFriend = async() => {
    var acceptingId = toUserId
    var sendingId = fromUserId
    // RETRIEVING accepting user information based on their ID 
    const getAcceptingUserResponse = await API.graphql({ query: getUser, variables: {
      id: acceptingId
    }, authMode: "AMAZON_COGNITO_USER_POOLS" });  

    //getting usernames of current friends
    var acceptingf1 = getAcceptingUserResponse.data.getUser.friend1
    var acceptingf2 = getAcceptingUserResponse.data.getUser.friend2
    var acceptingf3 = getAcceptingUserResponse.data.getUser.friend3

    // RETRIEVING sending user information based their ID 
     const getSendingUserResponse = await API.graphql({ query: getUser, variables: {
      id: sendingId
    }, authMode: "AMAZON_COGNITO_USER_POOLS" });  

    //getting usernames of sender's current friends
    var sendingf1 = getSendingUserResponse.data.getUser.friend1
    var sendingf2 = getSendingUserResponse.data.getUser.friend2
    var sendingf3 = getSendingUserResponse.data.getUser.friend3


    //following if branch checks for an open spot in db and places friend there
    if (acceptingf1 == null) {
      //update friend1 position if open spot
      const updateFriend = await API.graphql({ query: updateUser, variables: {
        input : {
          id: acceptingId,
          friend1: getSendingUserResponse.data.getUser.username,
          friend1avil : getSendingUserResponse.data.getUser.availability
        }
      }, authMode: "AMAZON_COGNITO_USER_POOLS" });  
      
      Promise.resolve(); 
    } else if (acceptingf2 == null) {
      //update friend2 position if open spot
      const updateFriend = await API.graphql({ query: updateUser, variables: {
        input : {
          id: acceptingId,
          friend2: getSendingUserResponse.data.getUser.username,
          friend2avil : getSendingUserResponse.data.getUser.availability
        }
      }, authMode: "AMAZON_COGNITO_USER_POOLS" });  
      
      Promise.resolve(); 
    } else if (acceptingf3 == null) {
      //update friend1 position if open spot
      const updateFriend = await API.graphql({ query: updateUser, variables: {
        input : {
          id: acceptingId,
          friend3: getSendingUserResponse.data.getUser.username,
          friend3avil : getSendingUserResponse.data.getUser.availability
        }
      }, authMode: "AMAZON_COGNITO_USER_POOLS" });  
      
      Promise.resolve(); 
    } else {
      alert("Sorry Cant Add Anymore Friends")
      //TO DO: MUST BREAK OUT OF FUNCTION !!!!
    }


   

    if (sendingf1 == null) {
      //update friend1 position if open spot
      const updateFriend = await API.graphql({ query: updateUser, variables: {
        input : {
          id: sendingId,
          friend1: getAcceptingUserResponse.data.getUser.username,
          friend1avil : getAcceptingUserResponse.data.getUser.availability
        }
      }, authMode: "AMAZON_COGNITO_USER_POOLS" });  
      
      Promise.resolve(); 
    } else if (sendingf2 == null) {
      //update friend2 position if open spot
      const updateFriend = await API.graphql({ query: updateUser, variables: {
        input : {
          id: sendingId,
          friend2: getAcceptingUserResponse.data.getUser.username,
          friend2avil : getAcceptingUserResponse.data.getUser.availability
        }
      }, authMode: "AMAZON_COGNITO_USER_POOLS" });  
      
      Promise.resolve(); 
    } else if (sendingf3 == null) {
      //update friend1 position if open spot
      const updateFriend = await API.graphql({ query: updateUser, variables: {
        input : {
          id: sendingId,
          friend3: getAcceptingUserResponse.data.getUser.username,
          friend3avil : getAcceptingUserResponse.data.getUser.availability
        }
      }, authMode: "AMAZON_COGNITO_USER_POOLS" });  
      
      Promise.resolve(); 
    } else {
      //this case should not occur but this is a fail safe
      alert("Sorry! " + getSendingUserResponse.data.getUser.username + " has maxed out his friends list!")
    }



    Promise.resolve();
    Promise.resolve();

  }
  
  return (
    <View style={styles.row}>
      <Text>{name}</Text>
      <Button 
        title="X"
        color="red"
        onPress={declineReq}
      />
      <Button
        title="Accept"
        onPress={acceptReq}
      />
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
      maxWidth: 200,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
  },

});
