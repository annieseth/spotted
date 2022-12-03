import React from 'react'
import { Button, View, Text, Switch, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';

export default function ActiveButtons({ nav, name, uniqueID, activeSince, active}) {
  
  if (name == null  || !active) {
    return
  }
  return (
    <View style={styles.row}>     
      <Text style={styles.text}> {name } </Text> 
      
      <Button
        title= "Invite"
        color = '#FF9900'
        onPress={() => nav.navigate("Event Request")}
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
  bottom: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 36
  },
  text: {
    fontSize: 16
  },
  row: {
    width: '80%',
    height: 70,
    display: 'flex',
    padding: 10,
    margin: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
    borderRadius: 8
  },

});
