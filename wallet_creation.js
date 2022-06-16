import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text, 
  Button,TouchableOpacity,
  Alert,
  useColorScheme,
  View,
} from 'react-native';
import { color } from 'react-native-elements/dist/helpers';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-simple-toast';


const Wallet_Creation = ({ navigation, route}) => {

    var starttempnode=false;
    var createwallet=false;
    const {param1,param2} = route.params;

    fetch('http://webwallet.knuct.com/sapi/starttempnode')
     .then(response=>{
        if(response.status===204) {
            console.log(response.status)
            console.log(param1,param2)
            starttempnode=true;
            let options = {
                method:"POST",
                Headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    passphrase: param1,
                    seedWords: param2
                })

            }
            fetch('http://webwallet.knuct.com/sapi/createwallet',options)
             .then(response=>{
                console.log(response)
             })
             .catch(error=>{
                Toast.show(error,Toast.LONG)
             })
        }
     })
     .catch(error=>{
        Toast.show(error,Toast.LONG)
     })

    return(
        <ScrollView style={styles.content}>
            <Text style={styles.headline}>Creating Wallet</Text>
            <Text style={styles.content}>
                This will take some time. Please wait until the procedure completes. 
            </Text>
            <View style={{alignItems:"center", justifyContent:"center", marginTop:40, flexDirection:"row"}}>
                <Text style={{color:'grey', fontSize:15}}>
                    Starting Temporary Wallet
                </Text>
                {starttempnode?<MaterialIcons name='check' style={{color:'green',fontSize:18, marginLeft:5}}/>:null}
            </View> 
            <View style={{alignItems:"center", justifyContent:"center", marginTop:20, flexDirection:"row"}}>
                <Text style={{color:'grey', fontSize:15}}>
                    Creating Wallet
                </Text>
                <MaterialIcons name='check' style={{color:'green',fontSize:18, marginLeft:5}}/>
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate('New Wallet')}>
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