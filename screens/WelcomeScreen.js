import React from 'react';
import { StyleSheet, Text, View, Image,TextInput, Alert,Modal,ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import   firebase from 'firebase'
import db from '../db'

export default class WelcomeScreen extends React.Component{
    constructor(){
        super()
        this.state={
            emailid:'',
            password:'',
            firstName:'',
            lastName:'',
            address:'',
            contact:'',
            isModalVisible:false,
            confirmPassword:''
        }
 
   }
login=(emailid,password)=>{
    firebase.auth().signInWithEmailAndPassword(emailid,password).then(()=>{
      this.props.navigation.navigate("DonateItems")
    })
    .catch((error)=>{
        var errorcode=error.code
        var errormsg=error.message
        return Alert.alert(errormsg);
    })
}
signup=(emailid,password,confirmPassword)=>{
    if(password != confirmPassword){
        return Alert.alert("password does not match")
    }
    else{
    firebase.auth().createUserWithEmailAndPassword(emailid,password).then(()=>{
        db.collection("users").add({
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            contact:this.state.contact,
            emailid:this.state.emailid,
            address:this.state.address
        })
       return Alert.alert("succesfully created a user","",[{text:"OK",onPress:()=>{this.setState({
           isModalVisible:false
       })}}])
    })
    .catch((error)=>{
        var errorcode=error.code
        var errormsg=error.message
        return Alert.alert(errormsg);
    })  
  } 
 } 
showModal=()=>{
    return(
      <Modal animationType="fade" transparent={true} visible={this.state.isModalVisible}> 
      <View style={styles.ModalContainer}>
      <ScrollView style={{width:"100%"}}>
          <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
         <Text style={styles.modalTitle}>
             RESGISTRATION
         </Text>
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
<TextInput  style={styles.formTextInput}  placeholder={"enter your email address"} keyboardType="email-address" onChangeText={(text)=>{
                        this.setState({
                            emailid:text
                        })
                    }}></TextInput>
                                        <TextInput style={styles.formTextInput} placeholder={"enter your password"} secureTextEntry={true} onChangeText={(text)=>{
                        this.setState({
                            password:text
                        })
   }}></TextInput>
   <TextInput style={styles.formTextInput} placeholder={"confirm password"} secureTextEntry={true} onChangeText={(text)=>{
                        this.setState({
                            confirmPassword:text
                        })
   }}></TextInput>
   <View>
       <TouchableOpacity style={styles.registerButton}onPress={()=>{this.signup(this.state.emailid,this.state.password,this.state.confirmPassword)}}>
           <Text style={styles.registerButtonText}>
               REGISTER 
           </Text>
       </TouchableOpacity>
   </View>
   <View>
       <TouchableOpacity style={styles.cancelButton}onPress={()=>{this.setState({
           isModalVisible:false
       })}}>
           <Text>Cancel</Text>
       </TouchableOpacity>
   </View>
          </KeyboardAvoidingView>
      </ScrollView>
     </View>
    </Modal>
    )
} 
 render(){
return(
    <View style={styles.container}>
    <View style={styles.profileContainer}>
        {this.showModal()}
     <Text style={styles.title}>
     BARTER APP
     </Text>
    </View>
    <View styles={styles.ButtonContainer}>
    <TextInput  style={styles.LoginBox}  placeholder={"enter your email address"} keyboardType="email-address" onChangeText={(text)=>{
                        this.setState({
                            emailid:text
                        })
                    }}></TextInput>
                                        <TextInput style={styles.LoginBox} placeholder={"enter your password"} secureTextEntry={true} onChangeText={(text)=>{
                        this.setState({
                            password:text
                        })
   }}></TextInput>
   <TouchableOpacity style={[styles.button,{marginBottom:20,marginTop:20}]}onPress={()=>{this.login(this.state.emailid,this.state.password)}}>
       <Text style={styles.ButtonText}>
           LOGIN
       </Text>
   </TouchableOpacity>
   <TouchableOpacity style={styles.button} onPress={()=>{this.setState({
       isModalVisible:true
   })}}>
       <Text style={styles.ButtonText}>
           SIGNUP
       </Text>
   </TouchableOpacity>
    </View>
    </View>
)
 }


}
const styles =StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"orange",
     },
     profileContainer:{
         flex:1,
         justifyContent:"center",
         alignItems:"center"
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
     ButtonText:{
         color:"#fff",
         fontWeight:"bold",
         fontSize:20,
         textAlign:"center"
     },
    ButtonContainer:{
        flex:1,
        alignItems:"center"
    },
    ModalContainer:{
        flex:1,
        borderRadius:20,
        justifyContent:"center",
        alingItems:"center",
        backgroundColor:"white",
        marginRight:30,
        marginLeft:30,
        marginTop:80,
        marginBottom:80
    },
    keyboardAvoidingView:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    modalTitle:{
        justifyContent:"center",
        alignSelf:"center",
        fontSize:30,
        color:"#ff5722",
        margin:50
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
  registerButton:{
      width:200,
      height:40,
      alignItems:"center",
      justifyContent:"center",
      borderWidth:1,
      borderRadius:10,
      marginTop:30,
    },
    registerButtonText:{
   color:"black",
   fontSize:15,
   fontWeight:"bold",
    
    },
    cancelButton:{
        width:200,
        height:30,
        justifyContent:"center",
        aligntItems:"center",
        marginTop:5
    }
})