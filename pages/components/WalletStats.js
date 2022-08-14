import React from 'react';
import {
  Text, 
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Card } from "react-native-elements";
import Toast from 'react-native-simple-toast';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard';
import { scale, ScaledSheet } from 'react-native-size-matters';

const WalletStats = () => {

  const [details, setDetails] = React.useState('')
  const isFocused = useIsFocused();

  React.useEffect(()=>{
    getDashboardDetails()
  }, [isFocused])

  const getDashboardDetails = async() =>{
    try{
      console.log("Getting Dashboard Details")
      const response = await fetch('https://webwallet.knuct.com/capi/getDashboard')
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
    Toast.show("Wallet ID Copied to clipboard")
  }

  return (
    <View>
    <Text style={styles.walletStatsText}>Wallet Stats</Text>
    <View style={styles.flexColView}>
       <View style={{display:"flex", flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
        <Card containerStyle={styles.card} wrapperStyle={styles.cardWrapperStyle}>
          <Card.Title style={styles.cardTitle}>KNCT Transactions</Card.Title>
          <View style={{position: "relative" }}>
            <Text style={styles.knctTotalTxn}>{details.totalTxn}            
              <View>
                <Text style={styles.knctTxnReceiver}>
                  <Ionicons name="arrow-down" style={{fontSize:scale(15), color:"rgb(45, 201, 55)"}}/>
                  {details.receiverTxn}
                </Text>    
                <Text style={styles.knctTxnSender}>
                  <Ionicons name="arrow-up" style={{fontSize:scale(15), color:"#cc3232"}}/>
                  {details.senderTxn}
                </Text>
              </View>
            </Text>
          </View>
        </Card>
        <Card containerStyle={styles.card} wrapperStyle={styles.cardWrapperStyle}>
          <Card.Title style={styles.cardTitle}>NFT Transactions</Card.Title>
          <View style={{position: "relative" }}>
            <Text style={styles.totalNftTxn}>{(details.buyerTxn + details.sellerTxn)}           
              <View>
                <Text style={styles.nftTxnBuyer}>
                  <Ionicons name="arrow-down" style={{fontSize:scale(15), color:"rgb(45, 201, 55)"}}/>
                  {details.buyerTxn}
                </Text>
                <Text style={styles.nftTxnSeller}>
                  <Ionicons name="arrow-up" style={{fontSize:scale(15), color:"#cc3232"}}/>
                  {details.sellerTxn}
                </Text>
              </View>
            
            </Text>
          </View>
        </Card>
      </View>

      <View style={{display:"flex", flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
        <Card containerStyle={styles.card} wrapperStyle={styles.cardWrapperStyle}>
          <Card.Title style={styles.cardTitle}>Proof Credits</Card.Title>
          <View style={{position: "relative" }}>
            <Text style={styles.proofCredits}>{details.proofCredits}</Text>
          </View>
        </Card>
        <Card containerStyle={styles.card} wrapperStyle={styles.cardWrapperStyle}>
          <Card.Title style={styles.cardTitle}>Active Nodes</Card.Title>
          <View style={{position: "relative" }}>
            <Text style={styles.activeNodes}>{details.contactsCount}</Text>
          </View>
        </Card>
      </View>
      </View>
      <View style={{display:"flex", flexDirection:"row"}}>
        <Card containerStyle={styles.walletIdCard} wrapperStyle={{height:scale(105)}}>
          <Card.Title style={styles.walletIdCardTitle}>Wallet ID</Card.Title>
         
          <View style={{position: "relative" }}>
            <TextInput editable={false} value={details.wid} multiline={false} 
            style={styles.walletIdTextInput}
              // autoFocus={true}
              // selectTextOnFocus={true}
              selection={{start:0, end:1}} //end:46
              showSoftInputOnFocus={true}
              // keyboardType=""
              // selectionColor={"#1976D2"}
              // maxLength={10}
              />
               
          <TouchableOpacity onPress={copyToClipboard}>
          {/* <View style={{flexDirection:'column',alignItems:'center'}}> */}
            <MaterialIcons name="content-copy" style={styles.clipboardIcon}/>
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

const styles = ScaledSheet.create({
  walletStatsText:{
    fontSize: '22.5@s', 
    color:"black", 
    marginTop:'25@s', 
    fontWeight:"bold",
    marginLeft: '16@s'
  },
  flexColView:{
    flexDirection:"column", 
    marginStart:'8@s', 
    marginEnd:'7@s'
  },
  card:{
    width:'150@s',
    height:'90@s', 
    borderRadius:'8@s', 
    backgroundColor:"white", 
    borderColor:"white"
  },
  cardTitle:{ 
    fontSize: '13@s', 
    right:'20@s', 
    color:"black"
  },
  cardWrapperStyle:{
    width:'160@s',
    height:'105@s'
  },
  knctTotalTxn:{ 
    color: "black", 
    fontSize: '25@s', 
    bottom:'21@s',
    left:'5@s'
  },
  knctTxnReceiver:{
    color:"rgb(45, 201, 55)", 
    fontSize: '15@s',
    left:'25@s', 
    bottom:'-16@s'
  },
  knctTxnSender:{
    color:"#cc3232", 
    fontSize: '15@s',
    left:'62@s', 
    bottom: '5@s'
  },
  totalNftTxn:{ 
    color: "black", 
    fontSize: '25@s', 
    bottom:'22@s',
    left:'10@s'
  },
  nftTxnBuyer:{
    color:"rgb(45, 201, 55)", 
    fontSize: '15@s',
    left:'25@s', 
    bottom:'-16@s'
  },
  nftTxnSeller:{
    color:"#cc3232", 
    fontSize: '15@s',
    left:'60@s', 
    bottom: '5@s'
  },
  proofCredits:{ 
    color: "black", 
    fontSize: '25@s', 
    left:'50@s',
    bottom:'8@s'
  },
  activeNodes:{ 
    color: "black", 
    fontSize: '25@s', 
    left:'37@s',
    bottom:'8@s'
   },
   walletIdCard:{
    height:'105@s', 
    width:"auto",
    borderRadius:'10@s',
    backgroundColor:"white", 
    borderColor:"white" 
  },
  walletIdCardTitle:{ 
    fontSize: '13@s', 
    // right:'22@s', 
    justifyContent:"center",
    color:"black"
  },
  walletIdTextInput:{      
    color: "rgb(118, 118, 118)",
    marginStart:'12@s',
    marginEnd:'0@s',
    padding: '5@s',
    paddingLeft:'15@s',
    paddingRight: '15@s',
    borderWidth: '1@s', 
    borderRadius: '5@s',
    borderColor:"grey",     
    right:'14@s'
    },
    clipboardIcon:{
      fontSize:'22@s', 
      color:"grey", 
      bottom:'29@s',
      left:'282@s'
    }
});
export default WalletStats;



