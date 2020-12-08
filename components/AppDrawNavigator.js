import React from "react"
import {createDrawerNavigator} from "react-navigation-drawer"
import {AppTabNavigator} from "./AppTabNavigator"
import  CustomSideBarMenu from "./CustomSideBarMenu"
import SettingsScreen from "../screens/SettingsScreen"
import MyDonationsScreen from "../screens/MyDonationsScreen"

export const AppDrawerNavigator = createDrawerNavigator({
    Home:{screen:AppTabNavigator},
    settings:{screen:SettingsScreen},
    MyDonations:{screen:MyDonationsScreen}
},
{
    contentComponent:CustomSideBarMenu,
},
{
    initialRouteName:"Home"
    
}
)