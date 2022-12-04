import React from 'react'
import { Button, View, Text, Switch, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import {Auth, API, graphqlOperation} from 'aws-amplify';
import { updateFriendRequest } from '../graphql/mutations';

export default function FriendReq({ nav, name, handleRemove, index }) {
  
  
//to accept friend request and send to dynadb
  const acceptReq = () => {
    console.log("Request accepted")


    //handle setting response

    const updateResponse = API.graphql({query: updateFriendRequest, variables: {input : {id: index, toUserResponse: true}}, authMode: "AMAZON_COGNITO_USER_POOLS"});
    Promise.resolve();


    // Auth.currentAuthenticatedUser().then(async(user) => {
      
    //   // RETRIEVING THE USERS information based their ID 
    //   const getUserResponse = await API.graphql({ query: getUser, variables: {
    //     id: user.attributes.sub
    //   }, authMode: "AMAZON_COGNITO_USER_POOLS" });  
  
    //   // Setting their three freinds user_names,uniqueID,availability  into a List
   
  
    //     //3 api query calls getting current users friends 1,2,3
    //     const ifFriend1 = await API.graphql({ query: getIfF1, variables: {
    //       friend1: user.username
    //     }, authMode: "AMAZON_COGNITO_USER_POOLS" });  
  
    //     const ifFriend2 = await API.graphql({ query: getIfF2, variables: {
    //       friend2: user.username
    //     }, authMode: "AMAZON_COGNITO_USER_POOLS" });  
  
    //     const ifFriend3 = await API.graphql({ query: getIfF3, variables: {
    //       friend3: user.username
    //     }, authMode: "AMAZON_COGNITO_USER_POOLS" });  
  
  
        
    //     if (ifFriend1 == null && ifFriend1.data.getIfF1.items[0].friend1 == user.username) {
    //       //update friendavail1
    //       const updateFriend = await API.graphql({ query: updateUser, variables: {
    //         input : {
    //           id: ifFriend1.data.getIfF1.items[0].id,
    //           friend1avil : !isEnabled
    //         }
    //       }, authMode: "AMAZON_COGNITO_USER_POOLS" });  
          
    //       Promise.resolve();
         
    //     } 
  
    //     if (ifFriend2 != null && ifFriend2.data.getIfF2.items[0].friend2 == user.username) {
    //     //MUTATION update friendavail2 using friend2.id
    //       const updateFriend = await API.graphql({ query: updateUser, variables: {
    //         input : {
    //           id: ifFriend2.data.getIfF2.items[0].id,
    //           friend2avil : !isEnabled
    //         }
    //       }, authMode: "AMAZON_COGNITO_USER_POOLS" });  
  
    //       Promise.resolve();
    //     } 
  
    //     if (ifFriend3 != null && ifFriend3.data.getIfF3.items[0].friend3 == user.username) {
    //     //update friendavail3
    //       const updateFriend = await API.graphql({ query: updateUser, variables: {
    //         input : {
    //           id: ifFriend3.data.getIfF3.items[0].id,
    //           friend3avil : !isEnabled
    //         }
    //       }, authMode: "AMAZON_COGNITO_USER_POOLS" });  
  
    //       Promise.resolve();
    //     }
  
    //     Promise.resolve();
    //     Promise.resolve();
    //     Promise.resolve();
  
  
    //   // for (var fren in friends) {
    //   //   const getUserNameResponse = await API.graphql({ query: getByUsername, variables: {
    //   //     id: fren
    //   //   }, authMode: "AMAZON_COGNITO_USER_POOLS" });  
    //   //   console.log(getUserNameResponse)
    //   // }
      
  
    // });
     

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
