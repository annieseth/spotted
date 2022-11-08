import * as React from 'react';
import { Component } from 'react';
import {useState} from 'react';
import { Button, View, Text, Switch, TextInput, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Auth, API, graphqlOperation} from 'aws-amplify';
import { createEvent } from '../graphql/mutations';
  
const EventRequestScreen = ({ navigation }) => {
  const [time, setTime] = useState("15 minutes");
  const [location, setLocation] = useState("Scheller");

  const handlePress = async () => {
    console.log(time);
    console.log(location);

    //const user = await Auth.currentAuthenticatedUser();

    Promise.resolve();
    await API.graphql({ query: createEvent, variables: {input: {
      who: "Dummy Name",
      where: location,
      when: time,
    }}, authMode: "AMAZON_COGNITO_USER_POOLS" });

    console.log("Locations IS " + location);
    console.log("time IS " + time);
  };

  return (
    <View >  
    <Text>Fill out the Information below to send the Invite</Text>
      {/* View for the When Text input Form */}
      <View >
        <Text>
          When: 
        </Text>
        <Picker
          selectedValue={time}
          onValueChange={(itemValue, itemIndex) =>
            setTime(itemValue)
          }>
          <Picker.Item label="15 minutes" value="15 minutes" />
          <Picker.Item label="30 minutes" value="30 minutes" />
        </Picker> 
      </View>

      {/* View for the Where Text input Form */}
      <View >
        <Text
        >
          Where: 
        </Text>
        <Picker
          selectedValue={location}
          onValueChange={(itemValue, itemIndex) =>
            setLocation(itemValue)
          }>
          <Picker.Item label="Scheller" value="Scheller" />
          <Picker.Item label="CULC" value="CULC" />
          <Picker.Item label="Exhibition Hall" value="Exhibition Hall" />
          <Picker.Item label="Tech Square" value="Tech Square" />
          <Picker.Item label="Tech Green" value="Tech Green" />
        </Picker>        
      </View>

      <Button 
          title='Submit'
          onPress={() => handlePress()}>      
      </Button>
    </View>
  )
}

export default EventRequestScreen;
  

