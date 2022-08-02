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
import { scale, ScaledSheet } from 'react-native-size-matters';

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
    <Card containerStyle={styles.card}>
        <RadialGradient 
        colors={['rgba(0,0,0,0)','rgba(0,0,0,0.1)','rgba(0,0,0,0.05)','rgba(0,0,0,0.03)','rgba(255,255,255,0.05)']} 
        stops={[0.03,0.2,0.2,0.6,0.6]}
        center={[5,155]} 
        radius={scale(420)}>
        <View style={styles.firstRow}>        
          <Card.Title style={{ fontSize: scale(20), color:"white"}}>Your Balance</Card.Title>
          <TouchableOpacity onPress={()=>handleRefersh()}>
          {!refresh?
          <FontAwesome name="refresh" style={styles.refresh} />
          :<ActivityIndicator  color={'white'} style={styles.refreshActivity} />}
          </TouchableOpacity>
        </View>
        <View style={styles.secondRow}>        
          <Text style={styles.knctTxt}>KNUCT</Text>
          <Text style={styles.nftTxt}>NFT</Text>
        </View>
        <View style={styles.thirdRow}>        
          <Text style={styles.knctBalanceTxt}>{balance}</Text>
          <Text style={styles.nftBalanceTxt}>{nftBalance}</Text>
        </View>
        </RadialGradient>
    </Card>
    )
}

const styles = ScaledSheet.create({
  card:{
    padding:'0@s', 
    borderRadius:'10@s',
    backgroundColor:'rgb(66, 165, 245)'},
    firstRow:{
      padding:'10@s', 
      paddingTop:'20@s',
      flexDirection:"row", 
      alignItems:"baseline", 
      justifyContent:"space-between"
    },
    refresh:{
      fontSize:'20@s', 
      fontWeight:"bold", 
      color:"white",
      transform: [{rotate: '90deg'}]
    },
    refreshActivity:{
      fontSize: '20@s',
      fontWeight:"bold"
    },
    secondRow:{
      padding:'10@s', 
      paddingTop:'0@s', 
      paddingBottom:'0@s', 
      flexDirection:"row", 
      justifyContent:"space-between"
    },
    knctTxt:{
      color: "#FFFFFF", 
      fontSize: '17.5@s'
    },
    nftTxt:{
      paddingRight:'100@s', 
      color: "#FFFFFF", 
      fontSize: '17.5@s' 
    },
    thirdRow:{
      padding:'10@s', 
      paddingTop:'0@s', 
      flexDirection:"row", 
      justifyContent:"space-between"
    },
    knctBalanceTxt:{
      color: "white", 
      fontSize: '27.5@s' 
    },
    nftBalanceTxt:{ 
      paddingRight:'115@s',
      color: "white", 
      fontSize: '27.5@s' 
    }
});

export default Balance; 
