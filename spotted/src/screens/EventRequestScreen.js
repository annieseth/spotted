import * as React from 'react';
import { useRef } from 'react';
import { Component } from 'react';
import {useState} from 'react';
import { Button, View, Text, Switch, TextInput, StyleSheet, Image,Platform } from 'react-native';

import PhoneInput from "react-native-phone-number-input";
import {Picker} from '@react-native-picker/picker';
import {Auth, API, graphqlOperation} from 'aws-amplify';
import { createEvent } from '../graphql/mutations';
import { shadow } from 'react-native-paper';
import AndroidImage from '../components/AndroidImage'
import AppleImage from '../components/AppleImage'

const EventRequestScreen = ({ navigation }) => {
  const [time, setTime] = useState("15 minutes");
  const [location, setLocation] = useState("here");
  const [phoneNumber, setPhoneNumber] = useState("4708848884");
  const [notes, setNotes] = useState("Hello");



  // const phoneInput = useRef<PhoneInput>(null);

  // used to pause runtime
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const handlePress = async () => {

    const user = await Auth.currentAuthenticatedUser();

    console.log("user is")
    console.log(user.username)

    await API.graphql({ query: createEvent, variables: {input: {
      toUser: "test1",
      fromUser: "DanielWang",
      location: location,
      meetTime: time,
    }}, authMode: "AMAZON_COGNITO_USER_POOLS" });

    // await API.graphql(graphqlOperation(createEvent, { 
    //   toUser: "test1",
    //   fromUser: "DanielWang",
    //   location: location,
    //   meetTime: time
    // }));

    console.log("Locations IS " + location);
    console.log("time IS " + time);
    console.log("number is" + phoneNumber)
    console.log("Notes are" + notes)

    /* This block is used for phones */

//     Alert.alert(
//       "Request submitted!",
//       [
//         { text: "OK", onPress: () => console.log("OK Pressed") }
//       ]
//     )
    

    
    /* Use this to mock an popup 
    // This part was used on mock up. 
    // TODO does this need to be removed?
    */
    // wait 5 seconds
//     await sleep(2 * 1000); 
//     Alert.alert(
//       "Daniel has invited you to meet up!",
//       [
//         { text: "View", onPress: () =>navigation.navigate("Invites") },
//         { text: "OK", onPress: () => console.log("OK Pressed") }
//       ]
//     )
    /* This block is used for web development */
    // alert("Request submitted!")
    navigation.navigate("Home")

  };
  const systemName = Platform.OS;
  let deviceRender;
  if (systemName === 'android') {      
    deviceRender = <AndroidImage styleNeeded={styles.adBox}/>;  
    
  } else {
    deviceRender = <AppleImage styleNeeded={styles.adBox}/>;    
  }


  return (
    <View >  
      <Text style={styles.mainTitle}>Fill out the Information below to send the Invite</Text>

      {/* View for the When Text input Form */}
      <View >
        <Text style = {styles.textbox}>
          When: 
        </Text>
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

      <View style={{padding: 20}}/>
         
      {/* AD Space */}
      {/* <Text style={{textAlign: 'center', fontSize: 20}}>
        AD IN SPACE BELOW 

      </Text> */}
        <View >
          
          {deviceRender}
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
    borderRadius: 25
  },
  container:{
    justifycontent: 'center',
    alignItems: 'center',
    padding: 10,
    flexDirection: 'column'
  },
  textbox: {
    paddingHorizontal: 10,
    fontSize: 20
  },
  mainTitle: {
    fontSize:25,
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
  },
  buttonFont: {
    color: '#FF9900',
  },
  adBox: {
    width:375,
    height:125,
    marginHorizontal:5
  }
});

export default EventRequestScreen;
  

