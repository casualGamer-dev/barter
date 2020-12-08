import React from 'react';
import { StyleSheet, Text, View, Image,TextInput,FlatList, Alert,Modal,ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import   firebase from 'firebase'
import db from '../db'
import MyHeader from '../components/Myheader'
import { ListItem } from 'react-native-elements';
export default class ItemDonateScreen extends React.Component{
constructor(){
    super()
    this.state={
        requesteditemslist:[],

    }
    this.requestref=null
}
getrequestedstorylist=()=>{
    this.requestref=db.collection("requestedItems").onSnapshot((snapshot)=>{
        var requesteditemsList=snapshot.docs.map(document=>document.data())
        this.setState({
            requesteditemslist:requesteditemsList
        })
    })
}
componentDidMount(){
    this.getrequesteditemslist()
}
componentWillUnmount(){
    this.requestref()
}
keyExtractor=(item,index)=>{
    index.toString()
}
renderItem=({item,i})=>{
return(
    <ListItem key={i} title={item.bookName}subtitle={item.reasontorequest}titleStyle={{color:"black",fontWeight:"bold"}}rightElement={
    <TouchableOpacity style={styles.button} onPress={()=>{this.props.navigation.navigate("RecieverDetails",{"details":item})}}>
        <Text style={{color:"#FFFF"}}>
            view 
        </Text>
        </TouchableOpacity>}bottomDivider> 
        </ListItem>
)

}
render(){
    return(
        <View style={{flex:1}}>
       <MyHeader title="donate books" navigation={this.props.navigation}>
        </MyHeader>
        <View style={{flex:1}}>
        {
            this.state.requestedItemslist.length===0 ? (
                <View style={styles.subcontainer}> 
                <Text style={{fontSize:20}}> you have no book request</Text>
                </View>
            )
            : (
                <FlatList keyExtractor={this.keyExtractor}data={this.state.requestedItemslist} renderItem={this.renderItem}>  </FlatList>
            )
        }
        </View>
        </View>
    )
}
}
const styles=StyleSheet.create({
    subcontainer:{
        flex:1,
        fontSize:20,
        justifyContent:"center",
        alingItems:"center"
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
         }
})