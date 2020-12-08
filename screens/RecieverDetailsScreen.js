import React from 'react';
import { StyleSheet, Text, View, Image,TextInput, Alert,Modal,ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import   firebase from 'firebase'
import db from '../db'
import MyHeader from '../components/Myheader'
import {Card,Icon,Header} from "react-native-elements"
export default class RecieverDetailsScreen extends React.Component{
    constructor(props){
        super()
        this.state={
            userId:firebase.auth().currentUser.email,
            receiverId:this.props.navigation.getParam("details")["userID"],
            requestId:this.props.navigation.getParam("details")["requestId"],
            bookName:this.props.navigation.getParam("details")["bookName"],
            reasontorequest:this.props.navigation.getParam("details")["reasonTorequest"],
            recieverName    : '',
            recieverContact : '',
            recieverAddress : '',
            recieverRequestDocId : ''
        }
    }
    getRecieverDetails(){
        db.collection('users').where('emailid','==',this.state.recieverId).get()
        .then(snapshot=>{
          snapshot.forEach(doc=>{
            this.setState({
              recieverName    : doc.data().firstName,
              recieverContact : doc.data().contact,
              recieverAddress : doc.data().address,
            })
          })
        });
      
        db.collection('requestedBooks').where('requestId','==',this.state.requestId).get()
        .then(snapshot=>{
          snapshot.forEach(doc => {
            this.setState({recieverRequestDocId:doc.id})
         })
      })}
      updateBookStatus=()=>{
        db.collection('all_donations').add({
          book_name           : this.state.bookName,
          request_id          : this.state.requestId,
          requested_by        : this.state.recieverName,
          donor_id            : this.state.userId,
          request_status      :  "Donor Interested"
        })
      }
      componentDidMount(){
        this.getRecieverDetails()
      }


      render(){
        return(
          <View style={styles.container}>
            <View style={{flex:0.1}}>
              <Header
                leftComponent ={<Icon name='arrow-left' type='feather' color='#696969'  onPress={() => this.props.navigation.goBack()}/>}
                centerComponent={{ text:"Donate Books", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
                backgroundColor = "#eaf8fe"
              />
            </View>
            <View style={{flex:0.3}}>
              <Card
                  title={"Book Information"}
                  titleStyle= {{fontSize : 20}}
                >
                <Card >
                  <Text style={{fontWeight:'bold'}}>Name : {this.state.bookName}</Text>
                </Card>
                <Card>
                  <Text style={{fontWeight:'bold'}}>Reason : {this.state.reasontorequest}</Text>
                </Card>
              </Card>
            </View>
            <View style={{flex:0.3}}>
              <Card
                title={"Reciever Information"}
                titleStyle= {{fontSize : 20}}
                >
                <Card>
                  <Text style={{fontWeight:'bold'}}>Name: {this.state.recieverName}</Text>
                </Card>
                <Card>
                  <Text style={{fontWeight:'bold'}}>Contact: {this.state.recieverContact}</Text>
                </Card>
                <Card>
                  <Text style={{fontWeight:'bold'}}>Address: {this.state.recieverAddress}</Text>
                </Card>
              </Card>
            </View>
            <View style={styles.buttonContainer}>
              {
                this.state.recieverId !== this.state.userId
                ?(
                  <TouchableOpacity
                      style={styles.button}
                      onPress={()=>{
                        this.updateBookStatus()
                        this.props.navigation.navigate('MyDonations')
                      }}>
                    <Text>I want to Donate</Text>
                  </TouchableOpacity>
                )
                : null
              }
            </View>
          </View>
        )
      }
    
    }
    
    
    const styles = StyleSheet.create({
      container: {
        flex:1,
      },
      buttonContainer : {
        flex:0.3,
        justifyContent:'center',
        alignItems:'center'
      },
      button:{
        width:200,
        height:50,
        justifyContent:'center',
        alignItems : 'center',
        borderRadius: 10,
        backgroundColor: 'orange',
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8
         },
        elevation : 16
      }
    })
    

