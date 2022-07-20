import React from 'react';

import {View, Text, TouchableOpacity,Image,TextInput,StyleSheet} from 'react-native';
import { Card, ListItem } from "react-native-elements";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';
import NewContact from './NewContact';


const Contacts = ({navigation}) => {
    
  const [contact, setContact] = React.useState('')
  const [contacts, setContacts] = React.useState([])
  const [count, setCount] = React.useState(-1)
  const [foundContacts, setFoundContacts] = React.useState([]);
  const [selected, setSelected] = React.useState(null)

  React.useEffect(()=>{
    getContactsList()
    getContactsListStatus()
  }, [])
    
  const getContactsList = async()=>{
    try {
      console.log("Getting Contacts List")
      const response = await fetch('http://webwallet.knuct.com/capi/getContactsList');
      const responseJson = await response.json();
      console.log("getContactsList - Response JSON: ", responseJson)
    } catch(error) {
      Toast.show(error,Toast.LONG);
    }
  }

  const getContactsListStatus = async()=>{
    try {
      console.log("Getting Contacts List Status")
      const response = await fetch('http://webwallet.knuct.com/capi/getContactsListStatus');
      const responseJson = await response.json();
      console.log("getContactsListStatus - Response JSON: ", responseJson.data.response)
      setContacts(responseJson.data.response)
    } catch(error) {
      Toast.show(error,Toast.LONG);
    }
  }

  const ContactsCard = ({data})=>{
    return(
      <Card containerStyle={{marginLeft:10, marginRight:10,height:100,borderRadius:10,backgroundColor:"white", borderColor:"white",elevation:5}} wrapperStyle={{height:105,width:180}}>
        <View style={{flexDirection:'row'}}>
        <Image source={require('../assets/knuct-logo.png')}/>     
        <View >
        <Text style={{fontWeight:'bold',fontFamily:'Roboto',color:'#000000DE', fontSize:20}}> {data.nickname}</Text>
        <Text style={{color: '#000000DE', fontSize:12, fontFamily:'Roboto' , marginLeft:5, paddingTop:10}}> {data.did}</Text>
        </View> 
        </View>
      </Card>
    )
}

  return (
    <Card containerStyle={{width:"auto", height:"auto", borderRadius:10, backgroundColor:"white", borderColor:"white"}}>
    <View style={{flexDirection:'row'}}>

      <Text style={{fontWeight:'bold',fontFamily:'Roboto',color:'#000000DE', fontSize:20}}>Contacts</Text>
      <TouchableOpacity onPress={() => navigation.navigate('NewContact')} style={{flexDirection:"row"}}>
       
        <Text style={{fontSize:14,marginLeft:135,color:'#1976D2',marginTop:6}}>NEW CONTACT</Text>
      
      </TouchableOpacity>
      
     
    </View>
    
    <Text style={{color: '#000000DE', fontSize:12, fontFamily:'Roboto' , marginLeft:5, paddingTop:10}}> 0 Contact(s)</Text>
    
    <View>
        {contacts.map((data,id) => (
            <ContactsCard key={id} data={data} />
        ))}
    </View>

    <View>
      <TouchableOpacity style={{backgroundColor:'#1976D2',height:40,width:40,borderRadius:25 ,marginLeft:280, marginTop:20}} onPress={()=>navigation.navigate('NewContact')}>
          <Entypo name="plus" style={{color:'white',fontSize:35,alignSelf:'center'}}/>      
      </TouchableOpacity>
    </View>
    
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