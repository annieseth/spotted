import { Button, View, Text, Switch, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import Invitation from '../components/Invitation';
import {useState, useEffect} from 'react';
import NavigationBar from '../components/NavigationBar';
import {Auth, API, graphqlOperation} from 'aws-amplify';
import { getEventByToUser } from '../graphql/queries';
import { deleteEvent } from '../graphql/mutations';



const InvitesScreen = ({ navigation }) => {

  const [invites, setInvites] = useState([])

  useEffect(() => {
    const fetchInvites = async () => {
      const user = await Auth.currentAuthenticatedUser();
      // console.log(typeof user.username)
      // console.log(user)
      // const { response } = await API.graphql({ query: getEventByToUser, variables: {
      //   input : {
      //     toUser: user.username
      //   }
      // }, authMode: "AMAZON_COGNITO_USER_POOLS" });

      const data = await API.graphql(graphqlOperation(getEventByToUser, { toUser: user.username }));
      console.log(data.data.getEventByToUser.items)
      setInvites(data.data.getEventByToUser.items)
      console.log(invites[0].fromUser)
    }
    fetchInvites()
      .catch(console.error);
  }, [])

  const handleRemove = async (id) => {
    console.log(id)
    const user = await Auth.currentAuthenticatedUser();
    await API.graphql(graphqlOperation(deleteEvent, { id: id }));
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
            name={item.fromUser}
            index={item.id}
            handleRemove={handleRemove}
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
  
});

export default InvitesScreen
  