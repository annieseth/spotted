import { Button, View, Text, Switch, TextInput, StyleSheet } from 'react-native';
import { Component } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
// import defaultIcon from 'react-native-paper/lib/typescript/components/MaterialCommunityIcon';


const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* View for Status Bar */}
      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
        <Text>Availability</Text>
        <Switch />        
      </View>

      
      <Text>Friends</Text>
      <Button
        title="Annie Seth"
        onPress={() => navigation.navigate("Event Request")}
      />
      <Button
        title="Daniel Wang"
        onPress={() => navigation.navigate("Event Request")}
      />
      <Button
        title="Rahul Bhatnagar"
        onPress={() => navigation.navigate("Event Request")}
      />
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

export default HomeScreen;
