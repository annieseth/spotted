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
import { Auth,API } from 'aws-amplify';
import { getUser } from '../graphql/queries';


const FriendRequestScreen = ({ navigation }) => {
  const [ search, setSearch]    = useState('');
  
  // TODO this users list should be populated with friends who aren't friended
  const [users, setUsers] = useState(
    [
      {
        name: 'John Smith',
        activeSince: '1:53pM',
        username: 'User1',
        friend: true,
      },
      {
        name: 'Granny Jones',
        activeSince: '2:22PM',
        username: 'User2',
        friend: false,
      },
      {
        name: 'Jack Hungry',
        activeSince: '2:53PM',
        username: 'User3',
        friend: false,
      },
      {
        name: 'Kindle Salt',
        activeSince: '1:34PM',
        username: 'User4',
        friend: true,
      },
    ]
  )

  // used to pause runtime
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const handlePress = async () => {
    console.log("pressed")

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
      const getUserResponse = await API.graphql({ query: getUser, variables: {
        id: user.attributes.sub
      }, authMode: "AMAZON_COGNITO_USER_POOLS" });  

      if (getUserResponse.data.getUser.friend1 != null && getUserResponse.data.getUser.friend2 != null && getUserResponse.data.getUser.friend3 != null) {
        alert("Sorry Cant Add Anymore Friends")
      }
      
      // setFriends([
      //   {username: getUserResponse.data.getUser.friend1 ,
      //    active: getUserResponse.data.getUser.friend1avil ,
      //   }, 
      //   {username: getUserResponse.data.getUser.friend2,
      //     active: getUserResponse.data.getUser.friend2avil }
      //   , 
      //   {username: getUserResponse.data.getUser.friend3,
      //     active: getUserResponse.data.getUser.friend3avil 
      //   }])
  
  
      // // Setting their three freinds user_names,uniqueID,availability  into a List
    
  
      //   //3 api query calls getting current users friends 1,2,3
      //   const ifFriend1 = await API.graphql({ query: getIfF1, variables: {
      //     friend1: user.username
      //   }, authMode: "AMAZON_COGNITO_USER_POOLS" });  
  
      //   const ifFriend2 = await API.graphql({ query: getIfF2, variables: {
      //     friend2: user.username
      //   }, authMode: "AMAZON_COGNITO_USER_POOLS" });  
  
      //   const ifFriend3 = await API.graphql({ query: getIfF3, variables: {
      //     friend3: user.username
      //   }, authMode: "AMAZON_COGNITO_USER_POOLS" });  
  
  
        
      //   if (ifFriend1 == null && ifFriend1.data.getIfF1.items[0].friend1 == user.username) {
      //     //update friendavail1
      //     const updateFriend = await API.graphql({ query: updateUser, variables: {
      //       input : {
      //         id: ifFriend1.data.getIfF1.items[0].id,
      //         friend1avil : !isEnabled
      //       }
      //     }, authMode: "AMAZON_COGNITO_USER_POOLS" });  
          
      //     Promise.resolve();
         
      //   } 
  
      //   if (ifFriend2 != null && ifFriend2.data.getIfF2.items[0].friend2 == user.username) {
      //   //MUTATION update friendavail2 using friend2.id
      //     const updateFriend = await API.graphql({ query: updateUser, variables: {
      //       input : {
      //         id: ifFriend2.data.getIfF2.items[0].id,
      //         friend2avil : !isEnabled
      //       }
      //     }, authMode: "AMAZON_COGNITO_USER_POOLS" });  
  
      //     Promise.resolve();
      //   } 
  
      //   if (ifFriend3 != null && ifFriend3.data.getIfF3.items[0].friend3 == user.username) {
      //   //update friendavail3
      //     const updateFriend = await API.graphql({ query: updateUser, variables: {
      //       input : {
      //         id: ifFriend3.data.getIfF3.items[0].id,
      //         friend3avil : !isEnabled
      //       }
      //     }, authMode: "AMAZON_COGNITO_USER_POOLS" });  
  
      //     Promise.resolve();
      //   }
  
      //   Promise.resolve();
      //   Promise.resolve();
        Promise.resolve();
  
  
      // for (var fren in friends) {
      //   const getUserNameResponse = await API.graphql({ query: getByUsername, variables: {
      //     id: fren
      //   }, authMode: "AMAZON_COGNITO_USER_POOLS" });  
      //   console.log(getUserNameResponse)
      // }
      
  
    });
     



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
  

