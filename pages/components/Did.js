import React from 'react';
import {
  Text, 
  StyleSheet,
  View,
  Share,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card } from "react-native-elements";
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-simple-toast';
import QRCode from 'react-native-qrcode-svg';

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
  
  return (
    <Card containerStyle={{borderRadius:10, backgroundColor:"white", borderWidth:0}} >
    <Card.Title style={{ fontSize: 25, color:"black" , textAlign:"left"}}>Your DID</Card.Title>
        <Text style={{ color: "black", fontSize: 15 }}>Use this to transfer tokens to your wallet. </Text>
        <TextInput editable={false} value={did} multiline={true} style={styles.textinput}/>
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
        <Modal visible={showQrCode} transparent={true} onRequestClose={() => {setShowQrCode(false)}}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.qrcode}>
              <Text style={{fontWeight:'bold', fontSize:20, color:'black', paddingBottom:35}}>DID QR code</Text>
              <QRCode value={did} size={250} color="black" />
              <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center', alignContent:'space-around', marginTop:20}}>
              <TouchableOpacity onPress={()=>printDID()}>
                <Text style={{fontSize:20, fontWeight:'bold', color:'black'}}>Print</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>setShowQrCode(false)}>
                <Text style={{fontSize:20, fontWeight:'bold', color:'black'}}>Close</Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
    </Card>
    )
    
}

const styles = StyleSheet.create({
  textinput:{
      color: "black",
      marginTop: 12,
      marginStart:12,
      marginEnd:12,
      padding: 10,
      borderWidth: 1, 
      borderRadius: 5,
      textAlign: 'center'
    },
  qrcode: {
    margin: 10, 
    backgroundColor: "white", 
    borderRadius: 20, 
    padding: 25, 
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 25,
    flexDirection:'column',
    justifyContent:'space-evenly'
  }
});

export default Did;



