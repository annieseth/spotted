import React from 'react'
import { Button, View, Text, Switch, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import {Auth, API, graphqlOperation} from 'aws-amplify';
import { updateEvent } from '../graphql/mutations';

export default function Invitation({ nav, name, handleRemove, id, handleAccept, location, time }) {
  
  const acceptInvitation = async (id) => {
    //
    const user = await Auth.currentAuthenticatedUser();
    await API.graphql({ query: updateEvent, variables: {input: {
      id: id,
      accepted: true
    }}, authMode: "AMAZON_COGNITO_USER_POOLS" });
    alert("Invitation accepted!")
    handleAccept(id);
  }

  const removeInvitation = i => {
    handleRemove(i);
  }


  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text}>{name}</Text>
        <View style={styles.buttons}>
          <Button 
            title="X"
            style={styles.closeButton}
            color="red"
            onPress={() => removeInvitation(id)}
          />
          <Button
            title="Accept"
            color="#FF9900"
            style={styles.acceptButton}
            onPress={() => acceptInvitation(id)}
          />
        </View> 
      </View>
      <Text>{location}</Text>
      <Text>{time}</Text>
    </View>
    
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    margin: 15,
  },
  container: {
      flex: 1,
      alignItems: 'center',
      width: '90%',
      backgroundColor: '#D3D3D3',
      borderRadius: 8,
      borderColor: 'black',
      borderWidth: 2,
      margin: 15
  },
  row: {
      width: '80%',
      height: 80,
      display: 'flex',
      padding: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
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
