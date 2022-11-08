import { Button, View, Text, Switch, TextInput, StyleSheet } from 'react-native';
import { Component, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import FriendItem from '../components/FriendItem';
import defaultIcon from 'react-native-paper/lib/typescript/components/MaterialCommunityIcon';

import {Auth, API, graphqlOperation} from 'aws-amplify';


const HomeScreen = ({ navigation }) => {

  const [friends, setFriends] = useState(
    [
      {
        id: 0,
        name: 'John Smith',
        activeSince: '1:53pM'
      },
      {
        id: 1,
        name: 'Granny Jones',
        activeSince: '2:22PM'
      },
      {
        id: 0,
        name: 'Jack Hungry',
        activeSince: '2:53PM'
      },
      {
        id: 0,
        name: 'Kindle Salt',
        activeSince: '1:34PM'
      },
    ]
  )

  return (
    <View style={styles.container}>
      {/* View for Status Bar */}
      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
        <Text>Availability</Text>
        <Switch />        
      </View>

      
      <Text>Friends</Text>
      {
        friends.map((item, index) => (
          <FriendItem
            key={index}
            nav={navigation}
            name={item.name}
            activeSince={item.activeSince}
            index={item.id}
          />
        ))
      }
      <View style={styles.bottom}>
        <View style={styles.row}>
          <Button 
            title="Home" style={styles.navButton}
            onPress={() => navigation.navigate("Home")}></Button>
          <Button 
            title="Invites" style={styles.navButton}
            onPress={() => navigation.navigate("Invites")}></Button>
          <Button 
            title="Sign Out" style={styles.navButton}
            onPress={() => {Auth.signOut();}}></Button>
        </View>
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
    maxWidth: 200,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  
});

export default HomeScreen;
