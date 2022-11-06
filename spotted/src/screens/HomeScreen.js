import { Button, View, Text, Switch, TextInput, StyleSheet } from 'react-native';
import { Component } from 'react';
import {EventRequestScreen} from './EventReq';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';

class HomeScreen extends Component { 
  render() {
    // const [isEnabled, setIsEnabled] = useState(false);

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* View for Status Bar */}
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
          <Text>Availability</Text>
          <Switch />        
        </View>

        
        <Text>Friends</Text>
        <Button
          title="Annie Seth"
          onPress={() => this.props.navigation.navigate("Event Request")}
          /*onPress={() => navigation.dispatch(
            CommonActions.navigate({
              name: 'Event Request'
            })
          )} */
        />
        <Button
          title="Daniel Wang"
          onPress={() => this.props.navigation.navigate("Event Request")}
        />
        <Button
          title="Rahul Bhatnagar"
          onPress={() => this.props.navigation.navigate("Event Request")}
        />
      </View>
    );
          }
  }

  export {HomeScreen, EventRequestScreen};