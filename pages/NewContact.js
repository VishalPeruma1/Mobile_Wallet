import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text, 
  TouchableOpacity,
  View,
  Image,TextInput,
  Button,
  ActivityIndicator
} from 'react-native';
import { Card } from "react-native-elements";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar } from "react-native-elements";
import {launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import Contacts from './Contacts';

const NewContact = ({navigation}) => {
  const [Token, onChangeToken] = React.useState("");
  const [RDID, onChangeRDID] = React.useState("");
  const [ImgPath, setImgPath] = React.useState("");

  const chooseImage = () =>{

    var options = {
      title:"Choose profile image",
      mediaType:'photo',
      customButtons:[{name:'customOptionKey', title:'Choose file from Gallery'}],storageOptions:{skipBackup:true,path:'images'},
    };
    launchImageLibrary(options,res =>{
      
      console.log("Response = ",res)
      if(res.didCancel)
      {console.log("User Cancelled");}

      else if(res.error){
        console.log("Error: ",res.error);

      }
      else if(res.customButton){
        console.log("User tapped into custom button");
        alert(res.customButton);
      }
      else{
        var pro_image = res.assets[0]
        if(pro_image.fileSize > 1000000){
          Toast.show("File size must be less than 1 MB",Toast.LONG)
        }
        else{
          //Sconsole.log(pro_image.uri)
          setImgPath(pro_image.uri)
          console.log("Success",ImgPath);
          // return img
          
        }
      }
    })
  }


  return (
    
    <Card containerStyle={{width:"auto", height:"auto", borderRadius:10, backgroundColor:"white", borderColor:"white"}}>

      <TouchableOpacity onPress={()=>navigation.navigate('Contacts')}>
      <View style={{flexDirection:'row'}}>
      <Ionicons name='arrow-back-outline' style={{color: '#1976D2',fontSize:20,marginTop:3}}/>
      <Text style={{color: '#1976D2', fontSize:14, fontFamily:'Roboto', marginTop:3}}>BACK</Text>
      </View>
        </TouchableOpacity>
       

    <View style={{ marginTop:25}}>
      
      <Text style={{fontWeight:'bold',fontFamily:'Roboto',color:'#000000DE', fontSize:20}}>Create Contact</Text>

      <Text style={{fontWeight:'bold',fontFamily:'Roboto',color:'#000000DE', fontSize:20,marginTop:25}}>Add DID to contacts</Text>

       <Text style={{color: '#000000DE', fontSize:12, fontFamily:'Roboto' , marginLeft:5, paddingTop:10}}> Giving names to DIDs for better organization</Text>
      
      <View style={{alignItems:'center',justifyContent:'space-around', height:230, marginTop:10, marginBottom:0}}>
        
      <TouchableOpacity onPress={chooseImage}>
        {ImgPath===""?
      <FontAwesome5 name="user-circle" style={{fontWeight:50,color: '#1976D2',fontSize:185,marginTop:3}}/>
          :
            <Image source={{uri:ImgPath}} style={{height:185, width:185, borderRadius:100}} />
       }
        
      </TouchableOpacity>
  
      </View>
     
    </View>
    
            <View style={{flexDirection:'column'}}>
            <TextInput placeholder='DID' placeholderTextColor="grey" style={styles.textinput} onChangeText={onChangeToken} value={Token} />
            <Text style={{color: '#00000099',fontSize:12, fontFamily:'Roboto' , marginLeft:20, paddingTop:10}}>DID for new contact</Text>
            </View>
            <View style={{flexDirection:'column'}}>
            <TextInput placeholder='Nickname' placeholderTextColor="grey" style={styles.textinput} onChangeText={onChangeRDID} value={RDID}  />

            <Text style={{color: '#00000099',fontSize:12, fontFamily:'Roboto' , marginLeft:20, paddingTop:10}}>Name for new contact</Text>
            </View>

            <TouchableOpacity style={{backgroundColor:'#1976D2', height:40, width:150, borderRadius:10,alignSelf:'flex-end'}}>
              <Text style={{padding:10,textAlign:'center',fontWeight:'bold',fontFamily:'Roboto',color:'#fff', fontSize:15}}>
                SAVE CONTACT
              </Text>
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
  logo: {
    width: 66,
    height: 58,
  }
  
});
export default NewContact;