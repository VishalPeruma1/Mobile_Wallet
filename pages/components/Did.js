import React from 'react';
import {
  Text, 
  View,
  Share,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card } from "react-native-elements";
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-simple-toast';

const Did = (did) => {
  const [showQrCode, setShowQrCode] = React.useState(false)

  const copyToClipboard = ()=>{
    Clipboard.setString(did)
    Toast.show("DID Copied to clipboard")
  }

  const shareDID = async() =>{
    try {
      await Share.share({
        title: 'React Native Share',
        message: did,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  const printDID = ()=>{

  }

  React.useEffect(()=>{
    if(showQrCode){
      Alert.alert('Hellp')
      setShowQrCode(false)
    }
  })
  
  return (
    <Card containerStyle={{borderRadius:10, backgroundColor:"white", borderWidth:0}} >
    <Card.Title style={{ fontSize: 25, color:"black" , textAlign:"left"}}>Your DID</Card.Title>
        <Text style={{ color: "black", fontSize: 15 }}>Use this to transfer tokens to your wallet. </Text>
        <TextInput value={did} readOnly selectTextOnFocus={false} style={{borderWidth:1, color:"black", marginTop:30}}/>
        <TextInput editable={false} value={did}  style={{borderWidth:1, color:"black", marginTop:30, marginStart:5,marginEnd:5}}/>
        <Text></Text>
        <View style={{flexDirection:'row', justifyContent:"space-evenly"}}>
          <TouchableOpacity onPress={copyToClipboard}>
          <View style={{flexDirection:'column',alignItems:'center'}}>
            <MaterialIcons name="content-copy" style={{fontSize:20, color:"#9c27b0"}}/>
            <Text style={{fontSize:15, color:'#9c27b0'}}>copy</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>shareDID()}>
          <View style={{flexDirection:'column',alignItems:'center'}}>
            <Ionicons name="share-social-outline" style={{fontSize:20, color:"#9c27b0"}}/>
            <Text style={{fontSize:15, color:'#9c27b0'}}>share</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>setShowQrCode(true)}>
          <View style={{flexDirection:'column',alignItems:'center'}}>
            <MaterialIcons name="qr-code" style={{fontSize:20, color:"#9c27b0"}}/>
            <Text style={{fontSize:15, color:'#9c27b0'}}>QR code</Text>
          </View>
          </TouchableOpacity>
        </View>
    </Card>
    )
    
}

export default Did;



