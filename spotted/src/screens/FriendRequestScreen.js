import * as React from 'react';
import {useState} from 'react';
import { Button, 
         View, Text, Keyboard, TextInput, StyleSheet, Alert, TouchableWithoutFeedback,
        Image, Platform
        } from 'react-native';

// import {Auth, API, graphqlOperation} from 'aws-amplify';
// import { createEvent } from '../graphql/mutations';
import AndroidImage from '../components/AndroidImage'
import AppleImage from '../components/AppleImage'
import NavigationBar from '../components/NavigationBar';
import { Auth, API } from 'aws-amplify';
import { getByUsername } from '../graphql/queries';


const FriendRequestScreen = ({ navigation }) => {
  const [ search, setSearch]    = useState('');
  
  // TODO this users list should be populated with friends who aren't friended
  const [users, setUsers] = useState(
    [
    ]
  )

  // used to pause runtime
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const handlePress = async () => {
    Auth.ge

    /* 
    TODO
    This entire logic is for a local list. 
    The for loop will need to be removed 
    
    To make it with 
    AWS we will need to do the following 
    1. make a GRAPHQL query(search)
    2. checks as follows 
       a. if user does not exists
          i. alert user
       b. if user exists and already friends
          1. alert user that friend exists
       c. if user exists and not friends
          send the friend request
          alert saying that Friend Request send
    */
    Auth.currentAuthenticatedUser().then(async(user) => {


      // RETRIEVING THE USERS information based their ID 
      const friendFinder = await API.graphql({ query: getByUsername, variables: {
        username: search
      }, authMode: "AMAZON_COGNITO_USER_POOLS" });  

      // console.log(Object.keys(friendFinder.data.getByUsername.items).length)
      if (friendFinder.data.getByUsername.items.length === 0) {
        alert("Not a Valid Username")
      }

      if (friendFinder.data.getByUsername.items.length === 1) {
        alert("Sent")
      }
      Promise.resolve();
      
  
    });

    Promise.resolve();

  };

  // identifying the System a user is on
  const systemName = Platform.OS;
  let deviceRender;
  if (systemName === 'android') {      
    deviceRender = < AndroidImage styleNeeded={styles.adBox} />;  
    
  } else {
    deviceRender = < AppleImage styleNeeded={styles.adBox} />;    
  }


  return (

    
    <View style={styles.container}>  
      <Text style={styles.mainTitle}>Search for Friend Below</Text>

      {/* View for the Where Text input Form */}
      <View style={{width:'70%'}}>
        <TextInput
          style={styles.input}
          onChangeText={setSearch}
          placeholder={"Ex: Username"}
        />  
      </View>

    
      <Button 
          title='Submit'
          color = '#FF9900'
          onPress={() => handlePress()}>      
      </Button>
      {/* <Text style={{textAlign: 'center', fontSize: 20}}>
          AD IN SPACE BELOW 

        </Text> */}
      <View>
        
        {/* <AndroidImage
          styleNeeded={styles.adBox}
        /> */}
        {deviceRender}

      </View>
      <View style={styles.bottom}>
        <NavigationBar 
          nav={navigation}
        />
        
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
    flex: 1,
    alignItems: 'center'

  },
  textbox: {
    paddingHorizontal: 10,
    fontSize: 40
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
    // flex:1,
    marginHorizontal:5,
    width: 375,
    height: 200,
  },

  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  }

});

export default FriendRequestScreen;
  

