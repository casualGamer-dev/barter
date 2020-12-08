import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen'
import {AppTabNavigator} from './components/AppTabNavigator'
import {createAppContainer,createSwitchNavigator} from "react-navigation"
import {AppDrawerNavigator} from './components/AppDrawNavigator'
export default function App() {
  return (
    <View style={styles.container}>
    <AppContainer></AppContainer>
    </View>
  );
}
const SwitchNavigator=createSwitchNavigator({
 WelcomeScreen:{screen:WelcomeScreen},
 Drawer:{screen:AppDrawerNavigator}
})
const AppContainer=createAppContainer(SwitchNavigator)
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
