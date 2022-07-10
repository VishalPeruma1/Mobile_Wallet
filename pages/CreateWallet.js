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


const Wallet_Creation = ({ navigation, route}) => {

    const [starttempnode,setStarttempnode] = React.useState(false);
    const [createwallet,setCreatewallet] = React.useState(false);
    const [privShareKey,setPrivShareKey] = React.useState(null)
    const {param1,param2} = route.params;

    const tempnodecreation = async() => {
      console.log("Starting Temporary Node")
      fetch('http://webwallet.knuct.com/sapi/starttempnode')
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
        const response = await fetch('http://webwallet.knuct.com/sapi/createwallet',options);
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
            <View style={{alignItems:"center", justifyContent:"center", marginTop:40, flexDirection:"row"}}>
                <Text style={{color:starttempnode?'green':'grey', fontSize:15, marginRight:5}}>
                    Starting Temporary Node
                </Text>
                {starttempnode?<MaterialIcons name='check' style={{color:'green',fontSize:18}}/>:<ActivityIndicator  color={'grey'} />}
            </View> 
            <View style={{alignItems:"center", justifyContent:"center", marginTop:20, flexDirection:"row"}}>
                <Text style={{color:createwallet?'green': starttempnode ? "grey" : "#A9A9A9", fontSize:15, marginRight:5}}>
                    Creating Wallet
                </Text>
                {
                  (() => {
                    if(createwallet){
                      return <MaterialIcons name='check' style={{color:'green',fontSize:18}}/>
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
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
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

  export default Wallet_Creation; 