import { Button, View, Text, Switch, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import Invitation from '../components/Invitation';
import {useState} from 'react';
import NavigationBar from '../components/NavigationBar';

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
            uniqueID={item.id}
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
  