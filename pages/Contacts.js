import React from 'react';

import {View, Text, TouchableOpacity,Image,TextInput,StyleSheet, ScrollView} from 'react-native';
import { Card, ListItem } from "react-native-elements";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';
import NewContact from './NewContact';


const Contacts = ({navigation}) => {
    
  const [contact, setContact] = React.useState('')
  const [contacts, setContacts] = React.useState([])
  const [count, setCount] = React.useState()
  const [foundContacts, setFoundContacts] = React.useState([]);
  const [selected, setSelected] = React.useState(null)
  const isFocused = useIsFocused();


  React.useEffect(()=>{
    getContactsList()
    getContactsListStatus()
  }, [isFocused])


    
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

  const generateColor = ({data}) => {
    try{
      var s_red = 1.75 * data.did.charAt(10).charCodeAt()
      var s_green =  1.2 * data.did.toString().charAt(20).charCodeAt() 
      var s_blue = data.did.toString().charAt(30).charCodeAt() 
      var s_contactColor = "rgb(" + String(s_red) + "," + String(s_green) + "," + String(s_blue) + ")"
      console.log("CONTACT COLOR => ",s_contactColor)
      return s_contactColor
    }

    catch(error){
      console.log(error)
    }

  };


  const getContactsListStatus = async()=>{
    try {
      console.log("Getting Contacts List Status")
      const response = await fetch('http://webwallet.knuct.com/capi/getContactsListStatus');
      const responseJson = await response.json();
      console.log("getContactsListStatus - Response JSON: ", responseJson.data.response)
      console.log("getContactsListStatus - Count JSON: ", responseJson.data.count)
      setCount(responseJson.data.count)
      setContacts(responseJson.data.response)
      console.log(contacts)
      
    } catch(error) {
      Toast.show(error,Toast.LONG);
    }
  }


  const ContactsCard = ({data})=>{
    return(
      <TouchableOpacity onPress={() => navigation.navigate('Contact Details', {"data":data})}>
        <Card containerStyle={{marginLeft:10, marginRight:10,borderRadius:10,backgroundColor:"white",padding:5, paddingLeft:12, borderColor:"white",elevation:5}} wrapperStyle={{height:105, width:200}}>
          <View style={{flexDirection:'column', flexWrap:"wrap", justifyContent:"space-evenly"}}>
            {data.dp===""?
              // <Image source={require('../assets/knuct-logo.png')}/>
              <View style={{backgroundColor:generateColor({data}), borderRadius:40, width: 80, height:80, alignContent:"center", justifyContent:"center"}}>
              <Text style={{
                fontSize: 35,
                color: "#fff",
                textAlign: "center",
                 }}>
                {data.nickname.slice(0,1)}
              </Text>
              </View>
              :
              <Image source={{
                uri:`data:image/jpg;base64,${JSON.parse(data.dp).base64}`
              }}
               style={{height:80,width:80, borderRadius:40}} 
              />
              // console.log(JSON.parse(data.dp).base64)
            }  

            <View >
              <Text style={{fontFamily:'Roboto',color:'#000000DE', fontSize:20}}> {data.nickname}</Text>
              <Text style={{color: 'rgba(0, 0, 0, 0.6)', fontSize:12, fontFamily:'Roboto' , marginLeft:5, paddingTop:10}}> {data.did}</Text>
            </View> 
          </View>
        </Card>
      </TouchableOpacity>
      
    )
}

  return (
    <ScrollView>
    <Card containerStyle={{width:"auto", height:"auto", borderRadius:10, backgroundColor:"white", borderColor:"white", marginBottom:75 }}>
    <View style={{flexDirection:'row'}}>

      <Text style={{fontWeight:'bold',fontFamily:'Roboto',color:'#000000DE', fontSize:20}}>Contacts</Text>
      <TouchableOpacity onPress={() => navigation.navigate('NewContact')} style={{flexDirection:"row"}}>
       
        <Text style={{fontSize:14,marginLeft:135,color:'#1976D2',marginTop:6}}>NEW CONTACT</Text>
      
      </TouchableOpacity>
      
     
    </View>
    
    {
      (count === 1)?
      <Text style={{color: '#000000DE', fontSize:12, fontFamily:'Roboto' , marginLeft:5, paddingTop:10}}> {count} Contact</Text>
        :
      <Text style={{color: '#000000DE', fontSize:12, fontFamily:'Roboto' , marginLeft:5, paddingTop:10}}> {count} Contacts</Text>
    }
    
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
    </ScrollView>
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