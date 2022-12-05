import { Button, View, Text, Switch, TextInput, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import Invitation from '../components/Invitation';
import {useState, useEffect} from 'react';
import {Auth, API, graphqlOperation} from 'aws-amplify';
import { getReqByToUser, getEventByToUser } from '../graphql/queries'; 
import FriendReq from '../components/FriendReq';
import NavigationBar from '../components/NavigationBar';
import { deleteEvent } from '../graphql/mutations';



const InvitesScreen = ({ navigation }) => {

  const [invites, setInvites] = useState([])

  useEffect(() => {
    const fetchInvites = async () => {
      const user = await Auth.currentAuthenticatedUser();
      const data = await API.graphql(graphqlOperation(getEventByToUser, { toUser: user.username }));
      const invites = data.data.getEventByToUser.items.filter((item) => item.accepted !== true)
      setInvites(invites)
    }
    fetchInvites()
      .catch(console.error);
  }, [])

  //TODO: format the friendReqs onto screen!!!!!!!!
  const [friendReq, setFriendReq] = useState([])

  const fetchReq = async () => {
    const user = await Auth.currentAuthenticatedUser();
    try {
      const allReqs = await API.graphql({query: getReqByToUser, variables: {toUser: user.username}, authMode: "AMAZON_COGNITO_USER_POOLS"});
      console.log(allReqs.data.getReqByToUser.items);

      if (allReqs.data.getReqByToUser) {
        setFriendReq(allReqs.data.getReqByToUser.items);
      }
      
      Promise.resolve();

    } catch (e) {
      console.log(e.message);
    }
  };

  //when the screen is rendered, this is called
  useEffect(() => {
    fetchReq();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchReq();
    setRefreshing(false);
  };



  const handleRemove = (id) => {
    console.log(id)
    removeFromDB(id)
    const newInvites = invites.filter((item) => item.id !== id);
    setInvites(newInvites);
  }

  const handleAccept = (id) => {
    const newInvites = invites.filter((item) => item.id !== id);
    setInvites(newInvites);
  }

  const removeFromDB = async (eventId) => {
    const user = await Auth.currentAuthenticatedUser();
    await API.graphql({ query: deleteEvent, variables: {input: {
      id: eventId,
    }}, authMode: "AMAZON_COGNITO_USER_POOLS" });

  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Event Invites</Text>
      {
        invites.map((item, index) => (
          <Invitation
            key={index}
            nav={navigation}
            name={item.fromUser}
            id={item.id}
            handleRemove={handleRemove}
            handleAccept={handleAccept}
            location={item.location}
            time={item.meetTime}
          />
        ))
      }
      {/* populating friend request on screen */}
      <Text style={styles.heading}>Friends Invites</Text>
      {
        friendReq.map((item, index) => (
          <FriendReq
            key={index}
            nav={navigation}
            name={"FRIEND REQUEST FROM " + item.fromUser}
            fromUserId = {item.fromUserId}
            toUserId = {item.toUserId}
            index={item.id}
            handleRemove={handleRemove}
            handleAccept={handleAccept}
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
  heading: {
    fontSize: 22,
    margin: 15
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
  
});

export default InvitesScreen
  