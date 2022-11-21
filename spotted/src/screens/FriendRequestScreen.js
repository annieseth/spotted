import * as React from 'react';
import { Component } from 'react';
import {useState} from 'react';
import { Button, View, Text, Switch, TextInput, StyleSheet, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Auth, API, graphqlOperation} from 'aws-amplify';
import { createEvent } from '../graphql/mutations';
  
const FriendRequestScreen = ({ navigation }) => {
  const [time, setTime] = useState("15 minutes");
  const [location, setLocation] = useState("Scheller");

  // used to pause runtime
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const handlePress = async () => {
    console.log(time);
    console.log(location);

    const user = await Auth.currentAuthenticatedUser();

    Promise.resolve();
    await API.graphql({ query: createEvent, variables: {input: {
      inviteeUsername: "Dummy Name",
      location: location,
      meetTime: time,
    }}, authMode: "AMAZON_COGNITO_USER_POOLS" });

    console.log("Locations IS " + location);
    console.log("time IS " + time);

    /* This block is used for phones */

    Alert.alert(
      "Request submitted!",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    )
    
    /* Use this to mock an popup */
    // wait 5 seconds
    await sleep(2 * 1000); 
    Alert.alert(
      "Daniel has invited you to meet up!",
      [
        { text: "View", onPress: () =>navigation.navigate("Invites") },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    )
    /* This block is used for web development */
    // alert("Request submitted!")
    navigation.navigate("Home")

  };

  return (
    <View >  
    <Text>Fill out the Information below to send the Invite</Text>
      {/* View for the When Text input Form */}
      <View >
        <Text>
          When: 
        </Text>
        {/* scroll wheel */}
        {/* <Picker
          selectedValue={time}
          onValueChange={(itemValue, itemIndex) =>
            setTime(itemValue)
          }>
          <Picker.Item label="15 minutes" value="15 minutes" />
          <Picker.Item label="30 minutes" value="30 minutes" />
        </Picker>  */}
        <TextInput
          style={styles.input}
          onChangeText={setTime}
          value={time}
        />
      </View>

      {/* View for the Where Text input Form */}
      <View >
        <Text
        >
          Where: 
        </Text>
        {/* <Picker
          selectedValue={location}
          onValueChange={(itemValue, itemIndex) =>
            setLocation(itemValue)
          }>
          <Picker.Item label="Scheller" value="Scheller" />
          <Picker.Item label="CULC" value="CULC" />
          <Picker.Item label="Exhibition Hall" value="Exhibition Hall" />
          <Picker.Item label="Tech Square" value="Tech Square" />
          <Picker.Item label="Tech Green" value="Tech Green" />
        </Picker>  */}
        <TextInput
          style={styles.input}
          onChangeText={setLocation}
          value={location}
        />       
      </View>

      <Button 
          title='Submit'
          onPress={() => handlePress()}>      
      </Button>
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
});

export default FriendRequestScreen;
  

