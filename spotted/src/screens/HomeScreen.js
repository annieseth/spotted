import { Button, View, Text, Switch, TextInput, StyleSheet } from 'react-native';
import { Component, useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import ActiveButtons from '../components/ActiveButtons';
import InactiveText from '../components/InactiveText';
//import defaultIcon from 'react-native-paper/lib/typescript/components/MaterialCommunityIcon';
import DateTime from '../components/DateTime';
import {Auth, API, graphqlOperation} from 'aws-amplify';
//import{graphqlMutation} from 'aws-appsync-react'
import { updateUser, getUser } from '../graphql/mutations';
import * as Location from 'expo-location';
import NavigationBar from '../components/NavigationBar';

const API_KEY = '77d2cc17b9c648543c1fae370fee3226';

const HomeScreen = ({ navigation }) => {

  const [friends, setFriends] = useState(
    [
      {
        id: 0,
        name: 'John Smith',
        activeSince: '1:53pM',
        active: 'False'
      },
      {
        id: 1,
        name: 'Granny Jones',
        activeSince: '2:22PM',
        active: 'True'
      },
      {
        id: 0,
        name: 'Jack Hungry',
        activeSince: '2:53PM',
        active: 'False'
      },
      {
        id: 0,
        name: 'Kindle Salt',
        activeSince: '1:34PM',
        active: 'True'
      },
    ]
  )

  const [inactivefriends] = useState(
    [
      {
        id: 0,
        name: 'John Smith',
        activeSince: '1:53pM',
        active: 'False'
      },
      {
        id: 0,
        name: 'Jack Hungry',
        activeSince: '2:53PM',
        active: 'False'
      }
    ]
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
    
    setIsEnabled(!previousState);
  //   Auth.currentAuthenticatedUser().then(async(user) => {
      
    

  //   const response = await API.graphql({ query: updateUser, variables: {
  //     input : {
  //       id: user.attributes.sub,
  //       availability : !isEnabled
  //     }
  //   }, authMode: "AMAZON_COGNITO_USER_POOLS" });

    

  //   /*response = await API.graphql(graphqlOperation(updateUsers, {
  //     input : {
  //       username: "test1",
  //       availability : "false",
        
  //     }
  //   }))*/

    


  //   console.log("Something Happened")
  //   console.log(response)
  // });
    Promise.resolve();
  }
  
  // Conditonal Rendering based on if the switch is toggled or not 
  let friendtext,friendRender;
  if(isEnabled) {

    if (activefriends.length == 0){
      friendtext = <Text style={styles.text} >There are no Active Friends</Text>

    } else {

      friendtext = <Text style={styles.text} >Active Friends</Text>

      friendRender =
        activefriends.map((item, index) => (
          <ActiveButtons
            key={index}
            nav={navigation}
            name={item.name}
            activeSince={item.activeSince}
            index={item.id}
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
        fetchDataFromApi("33.7756", "84.3963")
        return;
      }
      
      let location = await Location.getCurrentPositionAsync({});
      console.log(location)
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
      <View style={styles.signOut}>
        <Button 
          title="Sign Out" 
          color = '#FF9900'
          onPress={() => {Auth.signOut();}} 
        />
      </View>
      

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
