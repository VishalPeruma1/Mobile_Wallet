import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text, 
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-simple-toast';
import { scale, ScaledSheet } from 'react-native-size-matters';


const Wallet_Creation = ({ navigation, route}) => {

    const [starttempnode,setStarttempnode] = React.useState(false);
    const [createwallet,setCreatewallet] = React.useState(false);
    const [privShareKey,setPrivShareKey] = React.useState(null)
    const {param1,param2} = route.params;

    const tempnodecreation = async() => {
      console.log("Starting Temporary Node")
      fetch('https://webwallet.knuct.com/sapi/starttempnode')
      .then(response => {
         if(response.status===204) {
            setStarttempnode(true);
            console.log(response.status)
           }
      })
      .catch(error=>{
         Toast.show(error,Toast.LONG)
      })
    }

    const newwalletcreation = async() => {
      console.log("Creating Wallet")
      console.log(param1,param2)
      let options = {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify ({
            passphrase: param1,
            seedWords: param2
        })
      }
      try {
        const response = await fetch('https://webwallet.knuct.com/sapi/createwallet',options);
        const responseJson = await response.json();
        console.log("Response JSON: ", responseJson)
        if(response.status===200){
          setCreatewallet(true)
          console.log("privshare: "+responseJson.data.privshare)
          setPrivShareKey(String(responseJson.data.privshare)) 
          navigation.navigate("Get Private Share",{"Key":String(responseJson.data.privshare)})
        }
      } catch(error){
        Toast.show(error,Toast.LONG);
      }
    }

    const apicalls = async() => {
      if(!starttempnode){
        tempnodecreation()
      }
      if(starttempnode && !createwallet) {
        newwalletcreation()
      }
    }

    React.useEffect(() => {
      apicalls()
      }
    )


    return(
        <ScrollView style={styles.content}>
            <Text style={styles.headline}>Creating Wallet</Text>
            <Text style={styles.content}>
                This will take some time. Please wait until the procedure completes. 
            </Text>
            <View style={styles.tempNodeView}>
                <Text style={{color:starttempnode?'green':'grey', fontSize:scale(15), marginRight:scale(5)}}>
                    Starting Temporary Node
                </Text>
                {starttempnode?<MaterialIcons name='check' style={{color:'green',fontSize:scale(18)}}/>:<ActivityIndicator  color={'grey'} />}
            </View> 
            <View style={styles.createWalletView}>
                <Text style={{color:createwallet?'green': starttempnode ? "grey" : "#A9A9A9", fontSize:scale(15), marginRight:scale(5)}}>
                    Creating Wallet
                </Text>
                {
                  (() => {
                    if(createwallet){
                      return <MaterialIcons name='check' style={{color:'green',fontSize:scale(18)}}/>
                    }
                    else{
                      if(starttempnode){
                        return <ActivityIndicator  color={'grey'} />
                      }
                      else{
                        return null
                      }
                    }
                  })()
                }
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate('Choose Words')}>
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
    sectionContainer: {
      marginTop: '32@s',
      paddingHorizontal: '24@s',
    },
    sectionTitle: {
      fontSize: '24@s',
      fontWeight: '600',
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
    createWalletView:{
      alignItems:"center", 
      justifyContent:"center", 
      marginTop:'20@s', 
      flexDirection:"row"
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
    backBtn:{
      alignItems:'center',
      textAlign:'center',
      flex:2,
      marginTop:'25@s',
      justifyContent:'center',
      flexDirection:'row'
    },
    container: {
      alignItems: 'center',
   },
   tempNodeView:{
    alignItems:"center", 
    justifyContent:"center",
    marginTop:'40@s', 
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
      marginTop: '170@s',
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
  });

  export default Wallet_Creation; 