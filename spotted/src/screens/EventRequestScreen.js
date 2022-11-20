import * as React from 'react';
import { useRef } from 'react';
import { Component } from 'react';
import {useState} from 'react';
import { Button, View, Text, Switch, TextInput, StyleSheet, Alert } from 'react-native';

import PhoneInput from "react-native-phone-number-input";
import {Picker} from '@react-native-picker/picker';
import {Auth, API, graphqlOperation} from 'aws-amplify';
import { createEvent } from '../graphql/mutations';
import { shadow } from 'react-native-paper';
  
const EventRequestScreen = ({ navigation }) => {
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [notes, setNotes] = useState("");



  // const phoneInput = useRef<PhoneInput>(null);

  // used to pause runtime
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const handlePress = async () => {

    // const user = await Auth.currentAuthenticatedUser();

    // Promise.resolve();
    // await API.graphql({ query: createEvent, variables: {input: {
    //   inviteeUsername: "Dummy Name",
    //   location: location,
    //   meetTime: time,
    // }}, authMode: "AMAZON_COGNITO_USER_POOLS" });

    console.log("Locations IS " + location);
    console.log("time IS " + time);
    console.log("number is" + phoneNumber)
    console.log("Notes are" + notes)

    /* This block is used for phones */

    // Alert.alert(
    //   "Request submitted!",
    //   [
    //     { text: "OK", onPress: () => console.log("OK Pressed") }
    //   ]
    // )
    

    
    /* Use this to mock an popup 
    // This part was used on mock up. 
    // TODO does this need to be removed?
    */
    // wait 5 seconds
    // await sleep(2 * 1000); 
    // Alert.alert(
    //   "Daniel has invited you to meet up!",
    //   [
    //     { text: "View", onPress: () =>navigation.navigate("Invites") },
    //     { text: "OK", onPress: () => console.log("OK Pressed") }
    //   ]
    // )



    /* This block is used for web development */
    // alert("Request submitted!")
    navigation.navigate("Home")

  };

  return (
    <View >  
      <Text style={styles.mainTitle}>Fill out the Information below to send the Invite</Text>

      {/* View for the When Text input Form */}
      <View >
        <Text style = {styles.textbox}>
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
          placeholder={"Ex: 15 minutes"}
        />
      </View>

      {/* View for the Where Text input Form */}
      <View >
        <Text style = {styles.textbox}>
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
          placeholder={"Ex: Starbucks"}
        />   
        


      </View>
      
      {/* View for the PhoneNumber Text input Form */}
      <Text style = {styles.textbox}>
          Phone Number: 
      </Text>
  
      <View style ={styles.container}>
        
        <PhoneInput
            // style={styles.container}
            defaultValue={phoneNumber}
            defaultCode="US"
            onChangeFormattedText={(text) => {
              setPhoneNumber(text);
            }}
            withDarkTheme
            withShadow
            autoFocus
          />       

            
      
      </View>

      {/* View for the Notes Text input Form */}
      <View >
        <Text style = {styles.textbox}>
          Notes: 
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setNotes}
          placeholder={"Ex: Meeting for grading"}
        />   
        


      </View>

      <Button 
          title='Submit'
          color = '#FF9900'
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
    borderRadius: 25
  },
  container:{
 
    justifycontent: 'center',
    alignItems: 'center',
    padding: 10
  },
  textbox: {
    paddingHorizontal: 10,
    fontSize: 20
  },
  mainTitle: {
    fontSize:25,
    alignItems: 'center',
    textAlign: 'center',
    padding: 10
  },
  buttonFont: {
    color: '#FF9900',
  }

  
});

export default EventRequestScreen;
  

