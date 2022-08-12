import React from 'react';
import {
  Text, 
  View,
  Share,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card } from "react-native-elements";
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-simple-toast';
import QRCode from 'react-native-qrcode-svg';
import { scale, ScaledSheet } from 'react-native-size-matters';

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
    <Card containerStyle={styles.card} >
    <Card.Title style={styles.cardTitle}>Your DID</Card.Title>
        <Text style={{ color: "black", fontSize: scale(15) }}>Use this to transfer tokens to your wallet. </Text>
        <TextInput editable={false} value={did} multiline={true} style={styles.textinput}/>
        <View style={{flexDirection:'row', justifyContent:"space-evenly", top:7}}>
          <TouchableOpacity onPress={copyToClipboard}>
          <View style={styles.buttonView}>
            <MaterialIcons name="content-copy" style={styles.buttonIcon}/>
            <Text style={styles.buttonText}>copy</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>shareDID()}>
          <View style={styles.buttonView}>
            <Ionicons name="share-social-outline" style={styles.buttonIcon}/>
            <Text style={styles.buttonText}>share</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>setShowQrCode(true)}>
          <View style={styles.buttonView}>
            <MaterialIcons name="qr-code" style={styles.buttonIcon}/>
            <Text style={styles.buttonText}>QR code</Text>
          </View>
          </TouchableOpacity>
        </View>
        <Modal visible={showQrCode} transparent={true} onRequestClose={() => {setShowQrCode(false)}}>
          <View style={styles.qrcodeAlign}>
            <View style={styles.qrcode}>
              <Text style={styles.qrcodeTitle}>DID QR code</Text>
              <QRCode value={did} size={scale(250)} color="black" />
              <View style={styles.qrcodeButtons}>
                <TouchableOpacity onPress={()=>printDID()}>
                  <Text style={styles.qrcodePrintBtn}>Print</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setShowQrCode(false)}>
                  <Text style={styles.qrcodeCloseBtn}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
    </Card>
    )
    
}

const styles = ScaledSheet.create({
  card:{
    borderRadius:'10@s', 
    backgroundColor:"white", 
    borderWidth:'0@s'
  },
  cardTitle:{ 
    fontSize: '25@s', 
    color:"black" , 
    textAlign:"left"
  },
  textinput:{
      color: "black",
      marginTop: '12@s',
      marginStart:'12@s',
      marginEnd:'12@s',
      marginBottom:'10@s',
      padding: '10@s',
      borderWidth: '1@s', 
      borderRadius: '5@s',
      textAlign: 'center',
    },
    buttonView:{
      flexDirection:'column',
      alignItems:'center'
    },
    buttonIcon:{
      fontSize:'20@s', 
      color:"#9c27b0"
    },
    buttonText:{
      fontSize:'15@s', 
      color:'#9c27b0'
    },
  qrcode: {
    margin: '10@s', 
    backgroundColor: "white", 
    borderRadius: '20@s', 
    padding: '25@s', 
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: '0@s',
      height: '2@s'
    },
    shadowOpacity: '0.25@s',
    shadowRadius: '4@s',
    elevation: '25@s',
    flexDirection:'column',
    justifyContent:'space-evenly'
  },
  qrcodeAlign:{
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  qrcodeTitle:{
    fontWeight:'bold', 
    fontSize:'20@s', 
    color:'black', 
    paddingBottom:'35@s'
  },
  qrcodeButtons:{
    flexDirection:'row', 
    justifyContent:'space-around', 
    alignItems:'center', 
    alignContent:'space-around', 
    marginTop:'20@s'
  },
  qrcodePrintBtn:{
    fontSize:'20@s', 
    fontWeight:'bold', 
    color:'black',
    paddingRight:'40@s'
  },
  qrcodeCloseBtn:{
    fontSize:'20@s', 
    fontWeight:'bold', 
    color:'black'
  }
});

export default Did;



