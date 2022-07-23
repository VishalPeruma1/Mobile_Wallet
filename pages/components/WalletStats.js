import React from 'react';
import {
  Text, 
  Image,
  View,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Card } from "react-native-elements";
import Toast from 'react-native-simple-toast';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard';

const WalletStats = () => {

  const [details, setDetails] = React.useState('')
  const isFocused = useIsFocused();

  React.useEffect(()=>{
    getDashboardDetails()
  }, [isFocused])

  const getDashboardDetails = async() =>{
    try{
      console.log("Getting Dashboard Details")
      const response = await fetch('http://webwallet.knuct.com/capi/getDashboard')
      const responseJson = await response.json();
      console.log("getDashboardDetails - Response JSON: ", responseJson)
      console.log("WID: ", responseJson.data.response.wid)
      setDetails(responseJson.data.response)


    }
    catch(error){
      // console.log(error)
      Toast.show(error, Toast.LONG);
    }
  }
  const copyToClipboard = ()=>{
    Clipboard.setString(details.wid)
    Toast.show("DID Copied to clipboard")
  }

  return (
    <View>
    <Text style={{fontSize: 22.5, color:"black", marginTop:25, fontWeight:"bold",marginLeft: 16}}>Wallet Stats</Text>
       <View style={{display:"flex", flexDirection:"row"}}>
        <Card containerStyle={{width:175, height:105, borderRadius:10, backgroundColor:"white", borderColor:"white" }} wrapperStyle={{width:175, height:105}}>
          <Card.Title style={{ fontSize: 15, right:15, color:"black"}}>KNCT Transactions</Card.Title>
          <View style={{position: "relative" }}>
            <Text style={{ color: "black", fontSize: 27.5, bottom:22,left:5}}>{details.totalTxn}            
              <View>
                <Text style={{color:"green", fontSize: 15,left:25, bottom:-16}}>
                  <Ionicons name="arrow-down" style={{fontSize:15, color:"green"}}/>
                  {details.receiverTxn}
                </Text>    
                <Text style={{color:"red", fontSize: 15,left:62, bottom: 5}}>
                  <Ionicons name="arrow-down" style={{fontSize:15, color:"red"}}/>
                  {details.senderTxn}
                </Text>
              </View>
            </Text>
          </View>
        </Card>
        <Card containerStyle={{width:175, height:105, right: 17, borderRadius:10, backgroundColor:"white", borderColor:"white"}} wrapperStyle={{width:175, height:105}}>
          <Card.Title style={{ fontSize: 15, right:15, color:"black"}}>NFT Transactions</Card.Title>
          <View style={{position: "relative" }}>
            <Text style={{ color: "black", fontSize: 27.5, bottom:22,left:10}}>{(details.buyerTxn + details.sellerTxn)}           
              <View>
                <Text style={{color:"green", fontSize: 15,left:25, bottom:-16}}>
                  <Ionicons name="arrow-down" style={{fontSize:15, color:"green"}}/>
                  {details.buyerTxn}
                </Text>
                <Text style={{color:"red", fontSize: 15,left:60, bottom: 5}}>
                  <Ionicons name="arrow-down" style={{fontSize:15, color:"red"}}/>
                  {details.sellerTxn}
                </Text>
              </View>
            
            </Text>
          </View>
        </Card>
      </View>
      <View style={{display:"flex", flexDirection:"row"}}>
        <Card containerStyle={{width:175, height:105, borderRadius:10, backgroundColor:"white", borderColor:"white"}} wrapperStyle={{width:175, height:105}}>
          <Card.Title style={{ fontSize: 15, right:15, color:"black"}}>Proof Credits</Card.Title>
          <View style={{position: "relative" }}>
            <Text style={{ color: "black", fontSize: 27.5, left:65}}>{details.proofCredits}</Text>
          </View>
        </Card>
        <Card containerStyle={{width:175, height:105, right: 17, borderRadius:10, backgroundColor:"white", borderColor:"white"}} wrapperStyle={{width:175, height:105}}>
          <Card.Title style={{ fontSize: 15, right:15, color:"black"}}>Active Nodes</Card.Title>
          <View style={{position: "relative" }}>
            <Text style={{ color: "black", fontSize: 27.5, left:45 }}>{details.contactsCount}</Text>
          </View>
        </Card>
      </View>
      <View style={{display:"flex", flexDirection:"row"}}>
        <Card containerStyle={{height:105, width:"auto",borderRadius:10,backgroundColor:"white", borderColor:"white" }} wrapperStyle={{height:105}}>
          <Card.Title style={{ fontSize: 15, color:"black"}}>Wallet ID</Card.Title>
         
          <View style={{position: "relative",flexDirection:'row' }}>
            <TextInput editable={true} value={details.wid} multiline={false} 
            style={{      
              color: "rgb(118, 118, 118)",
              marginStart:12,
              marginEnd:0,
              padding: 5,
              // paddingLeft:15,
              borderWidth: 1, 
              borderRadius: 5,
              borderColor:"grey",     
              right:20
              }}
              // autoFocus={true}
              // selectTextOnFocus={true}
              selection={{start:0, end:46}}
              showSoftInputOnFocus={false}
              // keyboardType=""
              // selectionColor={"#1976D2"}
              // maxLength={10}
              />
               
          <TouchableOpacity onPress={copyToClipboard}>
          {/* <View style={{flexDirection:'column',alignItems:'center'}}> */}
            <MaterialIcons name="content-copy" style={{fontSize:22, color:"grey",right:17,top:7}}/>
            {/* <Text style={{fontSize:15, color:'#9c27b0'}}>copy</Text> */}
          {/* </View> */}
          </TouchableOpacity>
          </View>
          
        </Card>
      </View>
      <View>
          
      </View>
    </View>
    )
    
}

export default WalletStats;



