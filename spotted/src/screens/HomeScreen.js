import { Button, View, Text, Switch, StyleSheet, Platform,Alert } from 'react-native';
import { Component, useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import ActiveButtons from '../components/ActiveButtons';
import InactiveText from '../components/InactiveText';
//import defaultIcon from 'react-native-paper/lib/typescript/components/MaterialCommunityIcon';
import DateTime from '../components/DateTime';
import {Auth, API, graphqlOperation} from 'aws-amplify';

import { updateUser } from '../graphql/mutations';
import { getUser, getByUsername, getIfF1, getIfF2, getIfF3} from '../graphql/queries';

import * as Location from 'expo-location';
import NavigationBar from '../components/NavigationBar';

const API_KEY = '77d2cc17b9c648543c1fae370fee3226';


const HomeScreen = ({ navigation }) => {

  const [friends, setFriends] = useState(
    [ ]
  )

  const [activefriends] = useState(
    [
      
      {
        id: 1,
        name: 'Granny Jones',
        activeSince: '2:22PM',
        active: true
      },
      
      {
        id: 0,
        name: 'Kindle Salt',
        activeSince: '1:34PM',
        active: true
      }
    ]
  )
  
  // Toggle Switch Enabled Variable
  const [isEnabled, setIsEnabled] = useState(false);
 
  // Toggle Switch event handler
  const toggleSwitch = async function() {
    

    if (Platform.OS == 'android') {
      setIsEnabled(previousState => !previousState);
    } else {
      setIsEnabled(previousState => !previousState);
    }
    
    Auth.currentAuthenticatedUser().then(async(user) => {
      
    
    //  Updating the users status to be on/Off in the dynamoDB
    const UpdateUserResponse = await API.graphql({ query: updateUser, variables: {
      input : {
        id: user.attributes.sub,
        availability : !isEnabled
      }
    }, authMode: "AMAZON_COGNITO_USER_POOLS" });  

    // RETRIEVING THE USERS information based their ID 
    const getUserResponse = await API.graphql({ query: getUser, variables: {
      id: user.attributes.sub
    }, authMode: "AMAZON_COGNITO_USER_POOLS" });  

    // Setting their three freinds user_names,uniqueID,availability  into a List
    
    setFriends([
      {username: getUserResponse.data.getUser.friend1 ,
       active: getUserResponse.data.getUser.friend1avil ,
      }, 
      {username: getUserResponse.data.getUser.friend2,
        active: getUserResponse.data.getUser.friend2avil }
      , 
      {username: getUserResponse.data.getUser.friend3,
        active: getUserResponse.data.getUser.friend3avil 
      }])

      //3 api query calls
      const ifFriend1 = await API.graphql({ query: getIfF1, variables: {
        friend1: user.username
      }, authMode: "AMAZON_COGNITO_USER_POOLS" });  

      const ifFriend2 = await API.graphql({ query: getIfF2, variables: {
        friend2: user.username
      }, authMode: "AMAZON_COGNITO_USER_POOLS" });  

      const ifFriend3 = await API.graphql({ query: getIfF3, variables: {
        friend3: user.username
      }, authMode: "AMAZON_COGNITO_USER_POOLS" });  


      
      if (ifFriend1 != null && ifFriend1.data.getIfF1.items[0].friend1 == user.username) {
        //update friendavail1
        const updateFriend = await API.graphql({ query: updateUser, variables: {
          input : {
            id: ifFriend1.data.getIfF1.items[0].id,
            friend1avil : !isEnabled
          }
        }, authMode: "AMAZON_COGNITO_USER_POOLS" });  
        
        Promise.resolve();
       
      } 

      if (ifFriend2 != null && ifFriend2.data.getIfF2.items[0].friend2 == user.username) {
      //MUTATION update friendavail2 using friend2.id
        const updateFriend = await API.graphql({ query: updateUser, variables: {
          input : {
            id: ifFriend2.data.getIfF2.items[0].id,
            friend2avil : !isEnabled
          }
        }, authMode: "AMAZON_COGNITO_USER_POOLS" });  

        Promise.resolve();
      } 

      if (ifFriend3 != null && ifFriend3.data.getIfF3.items[0].friend3 == user.username) {
      //update friendavail3
        const updateFriend = await API.graphql({ query: updateUser, variables: {
          input : {
            id: ifFriend3.data.getIfF3.items[0].id,
            friend3avil : !isEnabled
          }
        }, authMode: "AMAZON_COGNITO_USER_POOLS" });  

        Promise.resolve();
      }

      Promise.resolve();
      Promise.resolve();
      Promise.resolve();


    // for (var fren in friends) {
    //   const getUserNameResponse = await API.graphql({ query: getByUsername, variables: {
    //     id: fren
    //   }, authMode: "AMAZON_COGNITO_USER_POOLS" });  
    //   console.log(getUserNameResponse)
    // }
    

  });
   
   
    Promise.resolve();
    
  }

  //when the screen is rendered, this is called
  useEffect(() => {
    toggleSwitch();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await toggleSwitch();
    setRefreshing(false);
  };


  // Conditonal Rendering based on if the switch is toggled or not 
  let friendtext,friendRender;
  if(isEnabled) {

    if (friends.length == 0){
      friendtext = <Text style={styles.text} >There are no Active Friends</Text>

    } else {

      friendtext = <Text style={styles.text} >Active Friends</Text>

      friendRender =
        friends.map((item, index) => (
          <ActiveButtons
            key={index}
            nav={navigation}
            name={item.username}
            active={item.active}
          />
        ))
     }
  }

  // Weather API 
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Auth.currentAuthenticatedUser().then(async(user) => {
          // RETRIEVING THE USERS information based their ID 
          const getUserResponse = await API.graphql({ query: getUser, variables: {
            id: user.attributes.sub
          }, authMode: "AMAZON_COGNITO_USER_POOLS" });  
          
          if (getUserResponse.data.getUser.lat == null || getUserResponse.data.getUser.long == null) {
            // default Atlanta
            alert("Location Not Available. Using deafult of Atlanta")
            fetchDataFromApi("33.7756", "84.3963")
            
          }
          // choose your old data
          else {
            alert("Location Not Available. Using prior location")
            fetchDataFromApi(getUserResponse.data.getUser.lat, getUserResponse.data.getUser.long)
          }
        })
        Promise.resolve()
        
        return;
      }
      
      let location = await Location.getCurrentPositionAsync({});

      Auth.currentAuthenticatedUser().then(async(user) => {
        // RETRIEVING THE USERS information based their ID 
        const updateFriend = await API.graphql({ query: updateUser, variables: {
          input : {
            id: user.attributes.sub,
            lat: location.coords.latitude,
            long: location.coords.longitude,
          }
        }, authMode: "AMAZON_COGNITO_USER_POOLS" });  

        Promise.resolve();
      })
      Promise.resolve()
      fetchDataFromApi(location.coords.latitude, location.coords.longitude);
    })();
  }, [])
  
  const fetchDataFromApi = (latitude, longitude) => {
    if(latitude && longitude) {
      fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${API_KEY}`).then(res => res.json()).then(weatherData => {

      // console.log(weatherData)
      setWeatherData(weatherData)
      })
    }
    
  }

  return (
    <View style={styles.container}>
      {/* View for Status Bar */}
      <View style={styles.status}>
        <Text style={styles.text}>Availability</Text>
        <Switch 
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />        
      </View>
      <View style={styles.weather}>
        <DateTime current={weatherData.current} lat={weatherData.lat} lon={weatherData.lon} rain/>
      </View>

      {friendtext}
      {friendRender}
      {/* <View style={styles.signOut}> */}
        <Button 
          title="Sign Out" 
          color = '#FF9900'
          onPress={() => {
            console.log("hello");
            // console.log(Auth)
            Auth.signOut();}} 
        />
      {/* </View> */}
      

    {/* <Text style={styles.text}>Inactive Friends</Text>
      {
        inactivefriends.map((item, index) => (
          <InactiveText
            key={index}
            nav={navigation}
            name={item.name}
            activeSince={item.activeSince}
            index={item.id}
            active={item.active}
          />
        ))
      } */}

      {/* Button Views */}
      <View style={styles.bottom}>
        <NavigationBar 
          nav={navigation}
        />
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 22
  },  
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
      alignItems: 'center',
  },
  row: {
    maxWidth: 200,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding:5 
  },
  signOut: {
    position: 'absolute',
    bottom: 120
  },

  status: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '70%',
    padding: 30
  }, 

  weather: {
    paddingBottom: 30
  }
  
});
export default HomeScreen;
