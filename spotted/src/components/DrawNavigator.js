
import React from "react";

import { AppRegistry } from "react-native";
import App from "../../App";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "../screens/HomeScreen";
import EventRequestScreen from "../screens/EventRequestScreen";
import InvitesScreen from "../screens/InvitesScreen";
import FriendRequestScreen from "../screens/FriendRequestScreen";


AppRegistry.registerComponent('main', () => App);
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Event Request" component={EventRequestScreen} />
      <Drawer.Screen name="Invites" component={InvitesScreen} />
      <Drawer.Screen name="Friends" component={FriendRequestScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
