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
