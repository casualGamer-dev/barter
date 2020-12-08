import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import BookDonateScreen from "../screens/ItemDonateScreen"
import BookRequestScreen from "../screens/ItemRequestScreen"
import {createBottomTabNavigator} from "react-navigation-tabs"
export const AppTabNavigator=createBottomTabNavigator({
    DonateItems:{
        screen:ItemDonateScreen,
        navigationOptions:{
            tabBarIcon:<Image source={require("../assets/donation.jpg")}style={{width:20,height:20}}></Image>,
            tabBarLabel:"DONATE ITEMS"
        }
    },
     RequestItems:{
        screen:ItemRequestScreen,
        navigationOptions:{
            tabBarIcon:<Image source={require("../assets/BoOk.png")}style={{width:20,height:20}}></Image>,
            tabBarLabel:"REQUEST ITEMS"
        },
    }
})