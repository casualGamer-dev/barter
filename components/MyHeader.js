import React,{Component} from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import {Header,Icon} from 'react-native-elements';
const MyHeader =props=>{
    return(
        <Header centerComponent={{text:props.title,style:{color:"#90A5A9",fontSize:20,fontWeight:"bold"}}}backgroundColor={"#EAF8FE"}></Header>
    )
}
export default MyHeader