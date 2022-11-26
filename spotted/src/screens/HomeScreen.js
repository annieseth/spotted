import { Button, View, Text, Switch, TextInput, StyleSheet, Alert } from 'react-native';
import { Component, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import FriendItem from '../components/FriendItem';
//import defaultIcon from 'react-native-paper/lib/typescript/components/MaterialCommunityIcon';

import {Auth, API, graphqlOperation} from 'aws-amplify';
//import{graphqlMutation} from 'aws-appsync-react'
import { updateUser } from '../graphql/mutations';
import {getUser} from '../graphql/queries';


const HomeScreen = ({ navigation }) => {

  const [friends, setFriends] = useState(
    [
      {
        id: 0,
        name: 'Annie Seth',
        activeSince: '1:53PM',
        avail : true
      },
      {
        id: 1,
        name: 'Granny Jones',
        activeSince: '2:22PM',
        avail : false
      },
      {
        id: 2,
        name: 'Jack Hungry',
        activeSince: '2:53PM',
        avail : false
      },
      {
        id: 3,
        name: 'Kindle Salt',
        activeSince: '1:34PM',
        avail : false
      },
    ]
  )

  const [isEnabled, setIsEnabled] = useState(false);

  const fixHome = async function() {
    Auth.currentAuthenticatedUser().then(async(user) => {
      if (user.attributes.sub == "f651cb4b-b212-41c7-b33b-49d0f97be119") {
        setFriends(friends.filter(friend => friend.id !== 0))

        Alert.alert(
          "Spotted!",
          "@test1 wants to meet with you at Scheller in 15 min",
          [
            {
              text: "Accept",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "Decline", onPress: () => console.log("OK Pressed") }
          ]
        );
    

      }})


      
  }
  const toggleSwitch = async function() {
    setIsEnabled(previousState => !previousState);
    Auth.currentAuthenticatedUser().then(async(user) => {
      
    

    const updateUserResponse = await API.graphql({ query: updateUser, variables: {
      input : {
        id: user.attributes.sub,
        availability : !isEnabled
      }
    }, authMode: "AMAZON_COGNITO_USER_POOLS" });

    Promise.resolve();




    const changeColor = await API.graphql({ query: getUser, variables: {
      id: "f651cb4b-b212-41c7-b33b-49d0f97be119"
      
    }, authMode: "AMAZON_COGNITO_USER_POOLS" });
    Promise.resolve();
    console.log(changeColor.data.getUser.availability)

    //setFriends(friends.at(0).avail => changeColor.data.getUser.availability)
    if (user.attributes.sub !== "f651cb4b-b212-41c7-b33b-49d0f97be119") {
    friends.at(0).avail = changeColor.data.getUser.availability
    }


  
  });
    Promise.resolve();
  }
  

  return (
    <View style={styles.container}>
      {/* View for Status Bar */}
      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
        <Text>Availability</Text>
        <Switch 
        trackColor={{ false: "#FF0000", true: "#03AC13" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        />        
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
            avail={item.avail}
          />
        ))
      }
      <View style={styles.bottom}>
        <View style={styles.row}>
          <Button 
            title="Home" style={styles.navButton}
            onPress={fixHome}></Button>
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
