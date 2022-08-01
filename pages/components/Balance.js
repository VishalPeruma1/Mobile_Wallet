import React from 'react';
import {
  StyleSheet,
  Text, 
  View,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';

import { Card, ListItem } from "react-native-elements";
import RadialGradient from 'react-native-radial-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-simple-toast';

const Balance = () => {

  const [refresh, setRefresh] = React.useState(true)
  const [refreshNft, setRefreshNft] = React.useState(true)
  const [balance, setBalance] = React.useState(null)
  const [nftBalance, setNftBalance] = React.useState(null)

  const handleRefersh = async() => {
    console.log("Updating Balance....")
    setRefresh(!refresh)
    setRefreshNft(!refreshNft)
  }

  React.useEffect(()=>{
    getBalance()
    getNftBalance()
  })

  const getBalance = async()=>{
    if(refresh){
      try {
        const response = await fetch('https://webwallet.knuct.com/capi/getDashboard');
        const responseJson = await response.json();
        //console.log("Response JSON: ", responseJson)
        if(response.status===200){
          console.log("Balance: "+responseJson.data.response.balance)
          setBalance(responseJson.data.response.balance)
        }
      } catch(error){
        Toast.show(error,Toast.LONG);
      }
      finally{
          setRefresh(false)
      }
    }
  }

  const getNftBalance = async()=>{
    if(refreshNft){
      try {
        const response = await fetch('https://webwallet.knuct.com/capi/getNftDashboard');
        const responseJson = await response.json();
        //console.log("Response JSON: ", responseJson)
        if(response.status===200){
          console.log("Nft Balance: "+responseJson.data.response.nftCount)
          setNftBalance(responseJson.data.response.nftCount)
        }
      } catch(error){
        Toast.show(error,Toast.LONG);
      }
      finally{
        setRefreshNft(false)
    }
    }
  }

  return (
    <Card containerStyle={{padding:0, borderRadius:10,backgroundColor:'rgb(66, 165, 245)'}}>
        <RadialGradient colors={['rgba(0,0,0,0)','rgba(0,0,0,0.1)','rgba(0,0,0,0.05)','rgba(0,0,0,0.03)','rgba(255,255,255,0.05)']} stops={[0.03,0.2,0.2,0.6,0.6]}center={[5,155]} radius={420}>
        <View style={{padding:10, paddingTop:20, flexDirection:"row", alignItems:"baseline", justifyContent:"space-between"}}>        
          <Card.Title style={{ fontSize: 20, color:"white"}}>Your Balance</Card.Title>
          <TouchableOpacity onPress={()=>handleRefersh()}>
          {!refresh?
          <FontAwesome name="refresh" style={{fontSize:20, fontWeight:"bold", color:"white",transform: [{rotate: '90deg'}]}} />
          :<ActivityIndicator  color={'white'} style={{fontSize:20, fontWeight:"bold"}} />}
          </TouchableOpacity>
        </View>
        <View style={{padding:10, paddingTop:0, paddingBottom:0, flexDirection:"row", justifyContent:"space-between"}}>        
          <Text style={{color: "#FFFFFF", fontSize: 17.5 }}>KNUCT</Text>
          <Text style={{paddingRight:100, color: "#FFFFFF", fontSize: 17.5 }}>NFT</Text>
        </View>
        <View style={{padding:10, paddingTop:0, flexDirection:"row", justifyContent:"space-between"}}>        
          <Text style={{color: "white", fontSize: 27.5 }}>{balance}</Text>
          <Text style={{ paddingRight:115,color: "white", fontSize: 27.5 }}>{nftBalance}</Text>
        </View>
        </RadialGradient>
    </Card>
    )
}

export default Balance; 
