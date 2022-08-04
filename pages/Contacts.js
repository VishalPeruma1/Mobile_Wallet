import React from 'react';

import {View, Text, TouchableOpacity,Image,TextInput,StyleSheet, ScrollView} from 'react-native';
import { Card} from "react-native-elements";
import { useIsFocused } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Toast from 'react-native-simple-toast';
import {scale, ScaledSheet} from 'react-native-size-matters';


const Contacts = ({navigation}) => {
    
  const [contacts, setContacts] = React.useState([])
  const [count, setCount] = React.useState()
  const [foundContacts, setFoundContacts] = React.useState([]);
  const [selected, setSelected] = React.useState(null)
  const isFocused = useIsFocused();
  const [search, setSearch] = React.useState("");

  React.useEffect(()=>{
    getContactsList()
    getContactsListStatus()
  }, [isFocused])

  const searchFilterFunction = (text) => {
    console.log("Inside Search")
    const keyword = text;
    setSearch(keyword)

    if (keyword!=="") {
     console.log("Inside IF")
     console.log(keyword)
     const results = contacts.filter(t=>Object.values(t).some(nickname=>typeof nickname ==="string" && nickname.toLowerCase().includes(keyword.toLowerCase())));
     const results2 = contacts.filter(t => Object.values(t).some(did => typeof did === "string" && did.includes(keyword)));
     console.log(results)
     console.log(results2)
     if (results2.length > 0 && results.length === 0) {
                setFoundContacts(results2);
                console.log(results2)
     }
      if (results.length > 0 && results2.length === 0) {
          setFoundContacts(results);
          console.log(results)
        }
      if (results.length > 0 && results2.length > 0) {
            const results3 = [...new Set(results.concat(results2))]
            setFoundContacts(results3);
            console.log(results3)
        }
      if(results.length===0 && results2.length===0) {
        setFoundContacts([])
      }
                
      setSelected(null)
            }
    else {
      setContacts(contacts);
      setSelected(null)
    }
  }


    
  const getContactsList = async()=>{
    try {
      console.log("Getting Contacts List")
      const response = await fetch('https://webwallet.knuct.com/capi/getContactsList');
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
      const response = await fetch('https://webwallet.knuct.com/capi/getContactsListStatus');
      const responseJson = await response.json();
      console.log("getContactsListStatus - Response JSON: ", responseJson.data.response)
      console.log("getContactsListStatus - Count JSON: ", responseJson.data.count)
      setCount(responseJson.data.count)
      let temp = responseJson.data.response
    temp.sort((a,b)=>(a.nickname.toLowerCase()> b.nickname.toLowerCase()) ? 1 :(a.nickname.toLowerCase() === b.nickname.toLowerCase())?((a.did > b.did)?1:-1):-1)
   setContacts(temp)
      // setContacts(responseJson.data.response)
      console.log(contacts)
      
    } catch(error) {
      Toast.show(error,Toast.LONG);
    }
  }


  const ContactsCard = ({data})=>{
    return(
      <TouchableOpacity onPress={() => navigation.navigate('Contact Details', {"data":data})}>
        <Card containerStyle={styles.cardContainer} wrapperStyle={{height:scale(90), width:scale(175)}}>
          <View style={styles.cardView}>
            <View style={{paddingEnd:5}}>
            {data.dp===""?
              // <Image source={require('../assets/knuct-logo.png')}/>
              <View style={[styles.indCard,{backgroundColor:generateColor({data})}]}>
              <Text style={styles.contactName}>
                {data.nickname.slice(0,1)}
              </Text>
              </View>
              :
              <Image source={{
                uri:`data:image/jpg;base64,${JSON.parse(data.dp).base64}`
              }}
               style={{height:scale(70),width:scale(70), borderRadius:scale(40)}} 
              />
              // console.log(JSON.parse(data.dp).base64)
            }  
            </View>
            <View>
              <Text style={styles.nickName}>{data.nickname}</Text>
              <Text style={styles.did}>{data.did}</Text>
            </View> 
          </View>
        </Card>
      </TouchableOpacity>
      
    )
}

  return (
    <ScrollView>
    <Card containerStyle={styles.mainCard}>
    <View style={{flexDirection:'row'}}>

      <Text style={styles.contText}>Contacts</Text>
      <TouchableOpacity onPress={() => navigation.navigate('New Contact')} style={{flexDirection:"row"}}>
       
        <Text style={styles.newContText}>NEW CONTACT</Text>
      
      </TouchableOpacity>
      
     
    </View>
    {search===""?
      <Text style={styles.searchText}>{count} total contact(s)</Text>:
      <Text style={styles.searchText}>{Object.keys(foundContacts).length} contact(s) found from {count} total contact(s)</Text>
    }   
     <View>
     <TextInput placeholder='Search Contacts' placeholderTextColor="grey" style={styles.textinput} onChangeText={(search) => searchFilterFunction(search)} />
    </View>
    <View>
        {
          (() => {
            if(search!==""){
              return foundContacts.map((data,id) => (
                <ContactsCard key={id} data={data} />
            ))
            }
            else{
             return contacts.map((data,id) => (
                <ContactsCard key={id} data={data} />
            ))
            }
          })()
        }
    </View>

    <View>
      <TouchableOpacity style={styles.plusTO} onPress={()=>navigation.navigate('New Contact')}>
          <Entypo name="plus" style={styles.plus}/>      
      </TouchableOpacity>
    </View>
    
      </Card>
    </ScrollView>
  );
};
const styles = ScaledSheet.create({
  dp:{
    height:'80@s',
    width:'80@s', 
    borderRadius:'40@s'
  },
  did:{
  color: 'rgba(0, 0, 0, 0.6)',
  fontSize:'10@s', 
  fontFamily:'Roboto',
  marginLeft:'5@s', 
  paddingTop:'10@s'
},
  nickName:{
    fontFamily:'Roboto',
    color:'#000000DE',
    fontSize:'20@s'

  },
  plus:{
    color:'white',
    fontSize:'35@s',
    alignSelf:'center'
  },

  plusTO:{
    backgroundColor:'#1976D2',
    height:'40@s',
    width:'40@s',
    borderRadius:'25@s' ,
    marginLeft:'250@s', 
    marginTop:'20@s'
  },
  searchText:{
    color: '#000000DE',
    fontSize:'12@s', 
    fontFamily:'Roboto' ,
    marginLeft:'5@s', 
    paddingTop:'10@s'
  },
  newContText:{
    fontSize:'14@s',
    marginLeft:'100@s',
    color:'#1976D2',
    marginTop:'6@s'
  },
  contText:{
    fontWeight:'bold',
    fontFamily:'Roboto',
    color:'#000000DE', 
    fontSize:'20@s'
  },
  mainCard:{
    width:"auto", 
    height:"auto", 
    borderRadius:'10@s', 
    backgroundColor:"white", 
    borderColor:"white",
    marginBottom:'75@s' 
  },
  contactName:{
    fontSize: '35@s',
    color: "#fff",
    textAlign: "center"
  },
  indCard:{
    borderRadius:'40@s', 
    width: '70@s', 
    height:'70@s',
    alignContent:"center", 
    justifyContent:"center"

  },
  cardView:{
  flexDirection:'column', 
  flexWrap:"wrap", 
  justifyContent:"space-evenly"
},

  cardContainer:{
    marginLeft:'10@s', 
    marginRight:'10@s',
    borderRadius:'10@s',
    backgroundColor:"white",
    padding:'5@s', 
    paddingLeft:'12@s', 
    borderColor:"white",
    elevation:'5@s'
  },        
   textinput:{
    color: "black",
    height: '40@s',
    width: '275@s',
    marginTop: '25@s',
    marginStart:'12@s',
    marginEnd:'12@s',
    padding: '10@s',
    borderWidth: '1@s', 
    borderRadius: '5@s',
  },
   
    
  });
export default Contacts;