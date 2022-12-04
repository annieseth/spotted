import React from 'react'
import { Button, View, Text, Switch, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';

export default function NavigationBar({ nav }) {
  
  return (
    <View style={styles.row}>
        <Button 
            title="Home"
            color="white"
            onPress={() => nav.navigate("Home")}
        />
        <Button
            title="Invites"
            color="white"
            onPress={() => nav.navigate("Invites")}
        />
        <Button
            title="Events"
            color="white"
            onPress={() => nav.navigate("Events")}
        />
        <Button
            title="Friends"
            color="white"
            onPress={() => nav.navigate("Friends")}
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
      marginBottom: 20
      
  },
  row: {
      width: '100%',
      height: 80,
      display: 'flex',
      padding: 20,
      margin: 20,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: '#FF9900',
      borderRadius: 10
  },

  text: {
    fontSize: 12
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
