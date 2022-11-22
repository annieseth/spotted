import { Button, View, Text, Switch, TextInput, StyleSheet } from 'react-native';
import { Component, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import FriendItem from '../components/FriendItem';
//import defaultIcon from 'react-native-paper/lib/typescript/components/MaterialCommunityIcon';

import {Auth, API, graphqlOperation} from 'aws-amplify';
//import{graphqlMutation} from 'aws-appsync-react'
import { updateUser, getUser } from '../graphql/mutations';


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
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = async function() {
    setIsEnabled(previousState => !previousState);
    Auth.currentAuthenticatedUser().then(async(user) => {
      
    

    const response = await API.graphql({ query: updateUser, variables: {
      input : {
        id: user.attributes.sub,
        availability : !isEnabled
      }
    }, authMode: "AMAZON_COGNITO_USER_POOLS" });

    

    /*response = await API.graphql(graphqlOperation(updateUsers, {
      input : {
        username: "test1",
        availability : "false",
        
      }
    }))*/

    


  //   console.log("Something Happened")
  //   console.log(response)
  });
    Promise.resolve();
  }
  

  return (
    <View style={styles.container}>
      {/* View for Status Bar */}
      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
        <Text>Availability</Text>
        <Switch 
        trackColor={{ false: "#767577", true: "#81b0ff" }}
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
            title="Friend Request" style={styles.navButton}
            onPress={() => navigation.navigate("Friends")}></Button>
          {/* <Button 
            title="Sign Out" style={styles.navButton}
            onPress={() => {Auth.signOut();}}></Button> */}
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
