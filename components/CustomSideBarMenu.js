import React from 'react';
import { StyleSheet, Text, View, Image,TextInput, Alert,Modal,ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import {DrawerItems} from 'react-navigation-drawer'
export default class CustomSideBarMenu extends React.Component{
    render(){
        return(
            <View style={{flex:1}}>
              <View style={{flex:0.8}}>
               <DrawerItems {...this.props}/>
              </View> 
              <View style={{flex:2,justifyContent:"flex-end",paddingBottom:20}}> 
              <TouchableOpacity style={{height:30,width:"100%",justifyContent:"center",padding:10}} onPress={()=>{this.props.navigation.navigate("WelcomeScreen")
            firebase.auth().signOut()}}>
                  <Text style={{fontSize:30,fontWeight:"bold"}}>
                      LOGOUT
                  </Text>
              </TouchableOpacity>
              </View>
            </View>
        )
    }
}