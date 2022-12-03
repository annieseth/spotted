import React from 'react'
import { Button, View, Text, Switch, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';

export default function Invitation({ nav, name, handleRemove, id }) {
  
  const acceptInvitation = () => {
    alert("Invitation accepted!")
    nav.navigate("Home");
  }

  const removeInvitation = i => {
    handleRemove(i);
  }
  
  return (
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
          onPress={acceptInvitation}
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
      width: '80%',
      height: 80,
      display: 'flex',
      padding: 20,
      margin: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#D3D3D3',
      borderRadius: 8
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
