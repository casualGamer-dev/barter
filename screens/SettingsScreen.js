import React from 'react';
import { StyleSheet, Text, View, Image,TextInput, Alert,Modal,ScrollView, TouchableOpacity, KeyboardAvoidingView, KeyboardAvoidingViewComponent } from 'react-native';
import   firebase from 'firebase'
import db from '../db'
import MyHeader from '../components/Myheader'
export default class SettingsScreen extends React.Component{
    constructor(){
        super()
        this.state={
            emailid:'',
            firstName:'',
            lastName:'',
            address:'',
            contact:'',
            docId:""
        }
   
   
    }
    getUserDetails=()=>{
        var email =firebase.auth().currentUser.email
        db.collection("users").where("emailid","==",email).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var data=doc.data()
                this.setState({
                    emailid:data.emailid,
                    firstName:data.firstName,
                    lastName:data.lastName,
                    address:data.address,
                    contact:data.contact,
                    docId:doc.id
                })
            })
        })
    } 
    updateUserDetails=()=>{
        db.collection("users").doc(this.state.docId).update({
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            address:this.state.address,
            contact:this.state.contact,
        })
        Alert.alert("profile updated successfully")
    }
    componentDidMount()
    {
        this.getUserDetails()
    }
    render(){
        return(
            <View style={styles.container}>
                <MyHeader title="settings" navigation={this.props.navigation}>
                </MyHeader>
                <View style={styles.formcontainer}>
                    <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
                <TextInput style={styles.formTextInput} placeholder="first Name " maxLength={8} onChangeText={(text)=>{
             this.setState({
                 firstName:text
             })
         }} value={this.state.firstName}></TextInput>
         <TextInput style={styles.formTextInput} placeholder="last Name " maxLength={8} onChangeText={(text)=>{
             this.setState({
                 lastName:text
             })
         }} value={this.state.lastName}></TextInput>
         <TextInput style={styles.formTextInput} placeholder="contact " maxLength={10} onChangeText={(text)=>{
             this.setState({
                contact:text
             })
         }} value={this.state.contact}keyboardType={"numeric"}></TextInput>
         <TextInput style={styles.formTextInput} placeholder="address " multiline={true} onChangeText={(text)=>{
             this.setState({
                 address:text
             })
         }} value={this.state.address}></TextInput>
         <TouchableOpacity onPress={()=>{
             this.updateUserDetails()
         }} style={button}>
             <Text style={styles.buttonText}>SAVE</Text>
         </TouchableOpacity>
         </KeyboardAvoidingView>
                </View>
            </View>
        )
    }
}
const styles =StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
     },
     formContainer:{
         flex:1,
         alignItems:"center",
         width:"100%"
     },
     title:{
         fontSize:65,
         fontWeight:"bold",
         paddingBottom:30,
         color:"black"
     },
     LoginBox:{
         width:300,
         height:40,
         borderBottomWidth:1.5,
         borderColor:"black",
         fontSize:20,
         margin:10,
         paddingLeft:10
     },
     button:{

    width:300,
    height:50,
    justifyContent:"center",
    alingItems:"center",
    borderRadius:25,
    backgroundColor:"red",
    shadowColor:"#000",
    shadowOffset:{width:0,height:8},
    shadowOpacity:0.3,
    shadowRadius:10,
    elevation:16
     },
     buttonText:{
         color:"#fff",
         fontWeight:"bold",
         fontSize:20,
         textAlign:"center"
     },
  
  
    keyboardAvoidingView:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
 
   formTextInput:{
       width:"75%",
       height:35,
       alignSelf:"center",
       borderColor:"grey",
        borderRadius:10,
        borderWidth:1,
       marginTop:20,
        padding:10
    },

})


