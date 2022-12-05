import { Button, View, Text, Switch, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import {useState, useEffect} from 'react';
import NavigationBar from '../components/NavigationBar';
import {Auth, API, graphqlOperation} from 'aws-amplify';
import { getEventByFromUser, getEventByToUser } from '../graphql/queries';
import Event from '../components/Event';



const UpcomingEventsScreen = ({ navigation }) => {



  const [events, setEvents] = useState([])
  const [username, setUsername] = useState("");
  useEffect(() => {
    const fetchInvites = async () => {
      const user = await Auth.currentAuthenticatedUser();
      setUsername(user.username)
      const toData = await API.graphql(graphqlOperation(getEventByToUser, { toUser: user.username }));
      const fromData = await API.graphql(graphqlOperation(getEventByFromUser, { fromUser: user.username }));
      const toInvites = toData.data.getEventByToUser.items.filter((item) => item.accepted == true)
      const fromInvites = fromData.data.getEventByFromUser.items.filter((item) => item.accepted == true)
      console.log(fromInvites)
      setEvents(toInvites.concat(fromInvites))
    }
    fetchInvites()
      .catch(console.error);
  }, [])


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your upcoming events</Text>
      {
        events.map((item, index) => (
          <Event
            key={index}
            nav={navigation}
            name={item.fromUser == username ? item.toUser : item.fromUser}
            id={item.id}
            phoneNo = {item.phoneNo}
            notes = {item.notes}
            location={item.location}
            time={item.meetTime}
          />
        ))
      }
      
      
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
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  bottom: {
      flex: 1,
      justifyContent: 'flex-end',
  },
  row: {
    maxWidth: 200,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 22,
    margin: 20
  }, 
  
});

export default UpcomingEventsScreen
