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
        challengeApi(hashval)
      }
      if(checkwallet && !authenticate) {
        const myBuffer = Buffer.from(priv_share.base64, 'base64');
        const png = PNG.sync.read(myBuffer);
        console.log(png.data.slice(0,50))
        var AlphaprivShare = privShareUtils.removeAlphaChannel(png.data)
        const signature = nlssUtils.createChallengeResponse(String(challengeRes),32,AlphaprivShare)
        console.log(signature)
        responseApi(signature)
      }
      if(authenticate && !startwallet) {
        startNodeApi()
      }
      if(startwallet && !fetchdata) {
        fetchDataApi()
      }
    }

    React.useEffect(()=>{
      apicalls()
    })


    const challengeApi = async(hashval)=>{
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
          const response = await fetch('http://webwallet.knuct.com/sapi/auth/challenge',options);
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

    const responseApi = async(signature)=>{
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
        const response = await fetch('http://webwallet.knuct.com/sapi/auth/response',options);
        console.log(response)
        if(response.status===204) {
          setAuthenticate(true)
        }
      } catch(error) {
        Toast.show(error,Toast.LONG);
      }
    }

    const startNodeApi = async()=>{
      try {
        const response = await fetch('http://webwallet.knuct.com/sapi/startnode');
        console.log(response)
        if(response.status===204) {
          setStartwallet(true)
        }
      } catch(error) {
        Toast.show(error,Toast.LONG);
      }
    }

    const fetchDataApi = async()=>{
      try {
        const response = await fetch('http://webwallet.knuct.com/sapi/walletdata');
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
            <View style={{alignItems:"center", justifyContent:"center", marginTop:40, flexDirection:"row"}}>
                <Text style={{color:checkwallet?'green':'grey', fontSize:15, marginRight:5}}>
                    Checking Wallet
                </Text>
                {checkwallet?<MaterialIcons name='check' style={{color:'green',fontSize:18}}/>:<ActivityIndicator  color={'grey'} />}
            </View> 
            <View style={{alignItems:"center", justifyContent:"center", marginTop:20, flexDirection:"row"}}>
                <Text style={{color:authenticate?'green': checkwallet ? "grey" : "#A9A9A9", fontSize:15, marginRight:5}}>
                    Authenticating
                </Text>
                {
                  (() => {
                    if(authenticate){
                      return <MaterialIcons name='check' style={{color:'green',fontSize:18}}/>
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
            <View style={{alignItems:"center", justifyContent:"center", marginTop:20, flexDirection:"row"}}>
                <Text style={{color:startwallet?'green': authenticate ? "grey" : "#A9A9A9", fontSize:15, marginRight:5}}>
                    Starting Wallet Node
                </Text>
                {
                  (() => {
                    if(startwallet){
                      return <MaterialIcons name='check' style={{color:'green',fontSize:18}}/>
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
            <View style={{alignItems:"center", justifyContent:"center", marginTop:20, flexDirection:"row"}}>
                <Text style={{color:fetchdata?'green': startwallet ? "grey" : "#A9A9A9", fontSize:15, marginRight:5}}>
                    Fetching Initital Data
                </Text>
                {
                  (() => {
                    if(fetchdata){
                      return <MaterialIcons name='check' style={{color:'green',fontSize:18}}/>
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
            <View style={{alignItems:"center", justifyContent:"center", marginTop:45, flexDirection:"row"}}>
                <Text style={{color:'red',fontSize:15}}>
                    CANCEL
                </Text>
                <MaterialIcons name='close' style={{color:'red',fontSize:18, marginLeft:5}}/>
                </View>
            </TouchableOpacity>    
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    sectionTitle: {
      fontSize: 24,
    },
    content:{
      color:'black',
      flex:2 ,
      textAlign:'center',
      fontSize: 16,
      marginTop: 25,
      paddingEnd:20,
      paddingStart:20
      // justifyContent: 'center',
      // marginLeft: 37
    },
    Button_style:{
      borderColor:'#1976D2',
      flexDirection:'row',
      borderWidth:1,
      padding:12, 
      justifyContent:'center',
      flex:1,
      borderRadius:5,
      backgroundColor:'#1976D2',
      marginTop:20,
      alignSelf: 'center'
    },
    backBtn:{
      alignItems:'center',
      textAlign:'center',
      flex:2,
      marginTop:25,
      flex:1,
      justifyContent:'center',
      flexDirection:'row'
    },
    container: {
      alignItems: 'center',
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
  });

  export default AccessWallet; 