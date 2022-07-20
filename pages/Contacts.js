import React from 'react';

import {View, Text, TouchableOpacity,TextInput,StyleSheet} from 'react-native';
import { Card, ListItem } from "react-native-elements";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import NewContact from './NewContact';


const Contacts = ({navigation}) => {
    
    
  return (
    <Card containerStyle={{width:"auto", height:250, borderRadius:10, backgroundColor:"white", borderColor:"white"}}>
    <View style={{flexDirection:'row'}}>
      <Text style={{fontWeight:'bold',fontFamily:'Roboto',color:'#000000DE', fontSize:20}}>Contacts</Text>
      <TouchableOpacity onPress={() => navigation.navigate('NewContact')} style={{flexDirection:"row"}}>
       
        <Text style={{fontSize:14,marginLeft:135,color:'#1976D2',marginTop:6,}}>NEW CONTACT</Text>
      
      </TouchableOpacity>
      
     
    </View>
    <Text style={{color: '#000000DE', fontSize:12, fontFamily:'Roboto' , marginLeft:5, paddingTop:10}}> 0 Contact(s)</Text>
    <TouchableOpacity style={{top:125,backgroundColor:'#1976D2',height:40,width:40,borderRadius:25 ,marginLeft:300}} onPress={()=>navigation.navigate('NewContact')}>
        <Entypo name="plus" style={{color:'white',fontSize:35,alignSelf:'center'}}/>
        
    </TouchableOpacity>
      </Card>
  );
};
const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    content:{
      color:'black',
      flex:2 ,
      textAlign:'center',
      fontSize: 15,
      marginTop: 25,
      // justifyContent: 'center',
      // marginLeft: 37
    },
    Button_style:{
      flex:2 ,
      textAlign:'center',
      fontSize: 20,
      marginTop: 25,
      // justifyContent: 'center',
      // marginLeft: 37,
      alignItems: 'center'
    },
    container: {
      alignItems: 'center',
   },
   newwallet:{
    borderColor:'#1976D2',
    flexDirection:'row',
    borderWidth:1,
    height:65,
    padding:12, 
    justifyContent:'center',
    flex:1,
    borderRadius:5,
    marginTop:30,
    alignItems: 'center',
    backgroundColor:'#1976D2'
  },
   textinput:{
    color: "black",
    height: 40,
    width: 325,
    marginTop: 25,
    marginStart:12,
    marginEnd:12,
    padding: 10,
    borderWidth: 1, 
    borderRadius: 5,
  },
   text: {
      borderWidth: 1,
      padding: 25,
      borderColor: 'black',
      backgroundColor: 'red'
   }
  ,
    headline: {
      textAlign: 'center', // <-- the magic
      fontWeight: 'bold',
      color:'black',
      fontSize: 35,
      marginTop: 250,
      // justifyContent: 'center',
      // marginLeft: 37,
      alignItems: 'center'
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
    
  });
export default Contacts;