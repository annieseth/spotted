import { Button, View, Text, Switch, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import Invitation from '../components/Invitation';
import {useState, useEffect} from 'react';
import {Auth, API, graphqlOperation} from 'aws-amplify';
import { getReqByToUser } from '../graphql/queries'; 
import FriendReq from '../components/FriendReq';


const InvitesScreen = ({ navigation }) => {

  const [invites, setInvites] = useState(
    [{
      id:0,
      name: "Annie Seth"
    },
    {
      id:1,
      name:"Daniel Wang"
    },
    {
      id:2,
      name:"Bob Jack"
    },
    {
      id:3,
      name:"Mcdonalds H"
    },
    {
      id:4,
      name:"John Smith"
    },
    ]
  )

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
    const newInvites = invites.filter((item) => item.id !== id);

    setInvites(newInvites);
  }

  return (
    <View style={styles.container}>

      {
        invites.map((item, index) => (
          <Invitation
            key={index}
            nav={navigation}
            name={item.name}
            index={item.id}
            handleRemove={handleRemove}
          />
        ))
      }
      {/* populating friend request on screen */}
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
          />
        ))
      }

      
      
      <View style={styles.bottom}>
        <View style={styles.row}>
          <Button 
            title="Home" style={styles.navButton}
            onPress={() => navigation.navigate("Home")}></Button>
          <Button 
            title="Invites" style={styles.navButton}
            onPress={() => navigation.navigate("Invites")}></Button>
        </View>
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
      marginBottom: 36
  },
  row: {
    maxWidth: 200,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  
});

export default InvitesScreen
  