import React from 'react'
import { Button, View, Text, Switch, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import {Auth} from 'aws-amplify';


export default function FriendItem({ nav, name, index, activeSince, avail }) {
  //for testing purposes
  // isAnnie = false
  // Auth.currentAuthenticatedUser().then(async(user) => {
  //   if (user.attributes.sub === "f651cb4b-b212-41c7-b33b-49d0f97be119") 
  //   isAnnie =
  // })
  return (
    <View style={styles.row}>      
      <Button
        title={name}
        onPress={() => nav.navigate("Event Request")}
        color = {!avail ? "#FF0000" : "#03AC13"}
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
