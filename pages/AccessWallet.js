import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text, 
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-simple-toast';
import * as privShareUtils from '../utils/privShare';
import * as nlssUtils from '../utils/nlss';
import { Buffer } from 'buffer';
import { PNG } from 'pngjs/browser';
import { sign } from 'crypto';
import { scale, ScaledSheet } from 'react-native-size-matters';

const AccessWallet = ({ navigation, route}) => {

    const [checkwallet,setCheckwallet] = React.useState(false);
    const [authenticate,setAuthenticate] = React.useState(false);
    const [startwallet,setStartwallet] = React.useState(false);
    const [fetchdata,setFetchdata] = React.useState(false);
    const priv_share = route.params.priv_share;
    const [challengeRes,setChallengeRes] = React.useState(null);

    const apicalls = async() => {
      if(!checkwallet) {
        const myBuffer = Buffer.from(priv_share.base64, 'base64');
        console.log(myBuffer.slice(0,50))
        const png = PNG.sync.read(myBuffer);
        var AlphaprivShare = privShareUtils.removeAlphaChannel(png.data)
        let hashRaw = privShareUtils.mh_md5(AlphaprivShare)
        var hashval = privShareUtils.mb_base32(hashRaw) 
        console.log("Hash : ",hashval)
        askForChallenge(hashval)
      }
      if(checkwallet && !authenticate) {
        const myBuffer = Buffer.from(priv_share.base64, 'base64');
        const png = PNG.sync.read(myBuffer);
        console.log(png.data.slice(0,50))
        var AlphaprivShare = privShareUtils.removeAlphaChannel(png.data)
        const signature = nlssUtils.createChallengeResponse(String(challengeRes),32,AlphaprivShare)
        console.log(signature)
        sendResponse(signature)
      }
    }

    React.useEffect(()=>{
      apicalls()
    })


    const askForChallenge = async(hashval)=>{
      let options = {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify ({ 
          hash: hashval
        })
      }
      try {
          const response = await fetch('https://webwallet.knuct.com/sapi/auth/challenge',options);
          const responseJson = await response.json();
          console.log("Response JSON: ", responseJson)
          if(response.status===200 && responseJson) {
            setCheckwallet(true)
            console.log(responseJson.data.challenge)
            setChallengeRes(responseJson.data.challenge)
          }
      } catch(error){
        Toast.show(error,Toast.LONG);
      }
    }

    const sendResponse = async(signature)=>{
      let options = {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify ({ 
          response: signature
        })
      }
      try {
        const response = await fetch('https://webwallet.knuct.com/sapi/auth/response',options);
        console.log(response)
        if(response.status===204) {
          setAuthenticate(true)
          startNode()
        }
      } catch(error) {
        Toast.show(error,Toast.LONG);
      }
    }

    const startNode = async()=>{
      try {
        const response = await fetch('https://webwallet.knuct.com/sapi/startnode');
        console.log(response)
        if(response.status===204) {
          setStartwallet(true)
          fetchInitData()
        }
      } catch(error) {
        Toast.show(error,Toast.LONG);
      }
    }

    const fetchInitData = async()=>{
      try {
        const response = await fetch('https://webwallet.knuct.com/sapi/walletdata');
        const responseJson = await response.json();
        console.log("Response JSON: ", responseJson)
        if(response.status===200 && responseJson) {
          setFetchdata(true)
          navigation.navigate("Tab Bar",{"did":responseJson.data.did})
        }
      } catch(error) {
        Toast.show(error,Toast.LONG);
      }
    }

    return(
        <ScrollView style={styles.content}>
            <Text style={styles.headline}>Accessing Wallet</Text>
            <Text style={styles.content}>
                This will take some time. Please wait until the procedure completes. 
            </Text>
            <View style={styles.checkWalletView}>
                <Text style={{color:checkwallet?'green':'grey', fontSize:scale(15), marginRight:scale(5)}}>
                    Checking Wallet
                </Text>
                {checkwallet?<MaterialIcons name='check' style={{color:'green',fontSize:scale(18)}}/>:<ActivityIndicator  color={'grey'} />}
            </View> 
            <View style={styles.authenticatingView}>
                <Text style={{color:authenticate?'green': checkwallet ? "grey" : "#A9A9A9", fontSize:scale(15), marginRight:scale(5)}}>
                    Authenticating
                </Text>
                {
                  (() => {
                    if(authenticate){
                      return <MaterialIcons name='check' style={{color:'green',fontSize:scale(18)}}/>
                    }
                    else{
                      if(checkwallet){
                        return <ActivityIndicator  color={'grey'} />
                      }
                      else{
                        return null
                      }
                    }
                  })()
                }
            </View>
            <View style={styles.startWalletView}>
                <Text style={{color:startwallet?'green': authenticate ? "grey" : "#A9A9A9", fontSize:scale(15), marginRight:scale(5)}}>
                    Starting Wallet Node
                </Text>
                {
                  (() => {
                    if(startwallet){
                      return <MaterialIcons name='check' style={{color:'green',fontSize:scale(18)}}/>
                    }
                    else{
                      if(authenticate){
                        return <ActivityIndicator  color={'grey'} />
                      }
                      else{
                        return null
                      }
                    }
                  })()
                }
            </View>
            <View style={styles.fetchDataView}>
                <Text style={{color:fetchdata?'green': startwallet ? "grey" : "#A9A9A9", fontSize:scale(15), marginRight:scale(5)}}>
                    Fetching Initital Data
                </Text>
                {
                  (() => {
                    if(fetchdata){
                      return <MaterialIcons name='check' style={{color:'green',fontSize:scale(18)}}/>
                    }
                    else{
                      if(startwallet){
                        return <ActivityIndicator  color={'grey'} />
                      }
                      else{
                        return null
                      }
                    }
                  })()
                }
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate('Upload Private Share')}>
            <View style={styles.cancel}>
                <Text style={{color:'red',fontSize:scale(15)}}>
                    CANCEL
                </Text>
                <MaterialIcons name='close' style={styles.cancelLogo}/>
                </View>
            </TouchableOpacity>    
        </ScrollView>
    );
};

const styles = ScaledSheet.create({
    sectionTitle: {
      fontSize: '24@s',
    },
    content:{
      color:'black',
      flex:2 ,
      textAlign:'center',
      fontSize: '16@s',
      marginTop: '25@s',
      paddingEnd:'20@s',
      paddingStart:'20@s'
      // justifyContent: 'center',
      // marginLeft: 37
    },
    cancel:{
      alignItems:"center", 
      justifyContent:"center", 
      marginTop:'45@s', 
      flexDirection:"row"
    },
    cancelLogo:{
      color:'red',
      fontSize:'18@s', 
      marginLeft:'5@s'
    },
    Button_style:{
      borderColor:'#1976D2',
      flexDirection:'row',
      borderWidth:'1@s',
      padding:'12@s', 
      justifyContent:'center',
      flex:1,
      borderRadius:'5@s',
      backgroundColor:'#1976D2',
      marginTop:'20@s',
      alignSelf: 'center'
    },
    authenticatingView:{
      alignItems:"center", 
      justifyContent:"center", 
      marginTop:'20@s', 
      flexDirection:"row"
    },
    backBtn:{
      alignItems:'center',
      textAlign:'center',
      flex:2,
      marginTop:'25@s',
      flex:1,
      justifyContent:'center',
      flexDirection:'row'
    },
    container: {
      alignItems: 'center',
   },
   checkWalletView:{
    alignItems:"center", 
    justifyContent:"center", 
    marginTop:'40@s', 
    flexDirection:"row"
  },
  fetchDataView:{
    alignItems:"center", 
    justifyContent:"center", 
    marginTop:'20@s', 
    flexDirection:"row"
  },
   text: {
      borderWidth: '1@s',
      padding: '25@s',
      borderColor: 'black',
      backgroundColor: 'red'
   }
  ,
    headline: {
      textAlign: 'center', // <-- the magic
      fontWeight: 'bold',
      color:'black',
      fontSize: '35@s',
      marginTop: '130@s',
      // justifyContent: 'center',
      // marginLeft: 37,
      alignItems: 'center'
    },
    sectionDescription: {
      marginTop: '8@s',
      fontSize: '18@s',
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
    startWalletView:{
      alignItems:"center", 
      justifyContent:"center", 
      marginTop:'20@s', 
      flexDirection:"row"
    }
  });

  export default AccessWallet; 