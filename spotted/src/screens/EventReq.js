import * as React from 'react';
import { Component } from 'react';
import {useState} from 'react';
import { Button, View, Text, Switch, TextInput, StyleSheet } from 'react-native';


class EventRequestScreen extends Component {
  render() {
    //const [text, onChangeText] = useState("A");
    return (
      /*<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Who</Text>       
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <Text>Where</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <Text>Notes</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
      </View> */
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Conference Details</Text>
    </View>
    );
    }
    
  }

  export {EventRequestScreen};