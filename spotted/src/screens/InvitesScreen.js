import { Button, View, Text, Switch, TextInput, StyleSheet } from 'react-native';
import { Component } from 'react';
import {HomeScreen} from './HomeScreen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';

class InvitesScreen extends Component { 
  render() {
    // const [isEnabled, setIsEnabled] = useState(false);

    return (
      <View style={styles.container}>
        
        

        
        <Text>Invites</Text>
        <View style={styles.row}>
          <Text>Annie Seth</Text>
          <Button
            title="Accept"
            onPress={() => this.props.navigation.navigate("Event Request")}
          />
        </View>
        <View style={styles.row}>
          <Text>Rushi Shah</Text>
          <Button
            title="Accept"
            onPress={() => this.props.navigation.navigate("Event Request")}
          />
        </View>
        <View style={styles.row}>
          <Text>Daniel Wang</Text>
          <Button
            title="Accept"
            onPress={() => this.props.navigation.navigate("Event Request")}
          />
        </View>
        
        
        <View style={styles.bottom}>
          <View style={styles.row}>
            <Button 
              title="Home" style={styles.navButton}
              onPress={() => this.props.navigation.navigate("Home")}></Button>
            <Button 
              title="Invites" style={styles.navButton}
              onPress={() => this.props.navigation.navigate("Invites")}></Button>
          </View>
        </View>
        
      </View>
    );
          }
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

  export {HomeScreen, InvitesScreen};