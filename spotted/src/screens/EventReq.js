import * as React from 'react';
import { Component } from 'react';
import {useState} from 'react';
import { Button, View, Text, Switch, TextInput, StyleSheet } from 'react-native';


class EventRequestScreen extends Component {
  constructor(props){
    super(props)

    this.state = {
      When: '',
      Where: '',
      Note: '',
    }
  }

  _handlePress() {
     console.log(this.state.When);
     console.log(this.state.Where);
     console.log(this.state.Note)
  }
  render() {
    //const [text, onChangeText] = useState("A");
    return (
      // Main View for the PAge
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' , width:'100%'}}>
      <Text>Fill out the Information below to send the Invite</Text>
        {/* View for the When Text input Form */}
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
          <Text>
            When: 
          </Text>
          <TextInput
              // style={styles.textInputStyle}
              placeholder="When would you like to meet?"
              returnKeyLabel = {"next"}
              onChangeText={(text) => this.setState({When:text})}
            />          
        </View>

        {/* View for the Where Text input Form */}
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
          <Text
          >
            Where: 
          </Text>
          <TextInput
              // style={styles.textInputStyle}
              
              placeholder="Where would you like to meet?"
              returnKeyLabel = {"next"}
              onChangeText={(text) => this.setState({Where:text})}
            />          
        </View>

        {/* View for the Note Text input Form */}
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
          <Text>
            Note: 
          </Text>
          <TextInput
              // style={styles.textInputStyle}
              placeholder="Any Additonal Info you would like to add"
              returnKeyLabel = {"next"}
              onChangeText={(text) => this.setState({Note:text})}
          />          
        </View>

        <Button 
            title='Submit'
            onPress={() => this._handlePress()}>
              
          </Button>
      </View>
    );
    }
    
  }

  export {EventRequestScreen};