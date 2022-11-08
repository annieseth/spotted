import React from 'react'
import { Button, View, Text, Switch, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';

export default function Invitation({ nav, name, handleRemove, index }) {
  
  const acceptInvitation = () => {
    alert("Invitation accepted!")
    nav.navigate("Home");
  }

  const removeInvitation = i => {
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
        onPress={() => removeInvitation(index)}
      />
      <Button
        title="Accept"
        onPress={acceptInvitation}
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
