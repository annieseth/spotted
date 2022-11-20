import React from 'react'
import { Button, View, Text, Switch, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';

export default function ActiveButtons({ nav, name, index, activeSince, active}) {
  return (
    <View style={styles.row}>     
      <Text> {name } </Text> 
      
      <Button
        title= "Invite"
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
      maxWidth: '90%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
  },

});
