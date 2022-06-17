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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-simple-toast';


const Get_Private_Share = ({ navigation, route}) => {

    const [privateShare, setPrivateshare] = React.useState(false);
    const  [checkbox,setCheckbox] = React.useState(false);

    return(
        <ScrollView style={styles.content}>
            <View style={{justifyContent:"center",flex:1}}>
            <Text style={styles.headline}>Wallet Created</Text>
            <Text style={styles.content}>
                Your wallet was successfully created. Now to use this wallet you have to download the private share.
            </Text>
            <Text style={styles.sectionTitle}>Step 1</Text>
            <Text style={styles.content}>
                Save the private share safely. Its your key to access your wallet so do not loose it.
            </Text>
            <View style={styles.note}>
              <MaterialIcons name='report-problem' style={{color:'red',fontSize:18}}/>
              <Text style={{textAlign:'center', color:'gray', marginLeft:10}}>
                Do not share your private share with anyone.
              </Text>
            </View>
            <View style={styles.download}>
            <View style={{backgroundColor:privateShare?"white":'#1976D2', padding:12, borderWidth:1, borderRadius:5, borderColor: "#1976D2"}}>
            <TouchableOpacity onPress={()=>{
                setPrivateshare(true)
              }}>
            <View style={{flexDirection:'row'}}>
                <MaterialIcons name='file-download' style={{color:privateShare?'#1976D2':"white",fontSize:20, marginTop:1}}/>
                <Text style={{color: privateShare?'#1976D2':"white", fontSize:14, marginLeft:5}}>DOWNLOAD PRIVATE SHARE</Text>
            </View>
            </TouchableOpacity></View>
            </View>
            <View style={{display: privateShare?"flex":"none"}}>
              <Text style={styles.sectionTitle}>Step 2</Text>
              <Text style={styles.content}>
              Now open you your wallet. You have to do a first access within 48 hours of wallet creation or your wallet will be deleted.
              </Text>
              <View style={styles.checkbox}>
              <TouchableOpacity onPress={()=>setCheckbox(!checkbox)}>
                {
                  checkbox?<MaterialCommunityIcons name="checkbox-marked" style={{fontSize:20, color:"#1976D2"}}/> :
                  <MaterialCommunityIcons name="checkbox-blank-outline" style={{fontSize:20}}/>
                }
              </TouchableOpacity>
              <Text style={{textAlign:'center', color:'gray', marginLeft:10}}>
                I have downloaded the private share.
              </Text>
              </View>
              <View style={styles.accesswallet}>
              <View style={{backgroundColor:checkbox?"#1976D2":'#A9A9A9', borderColor:checkbox?"#1976D2":'#A9A9A9', borderWidth:1, borderRadius:5, padding:12}}>
              <TouchableOpacity onPress={()=>navigation.navigate('Upload Private Share')} disabled={checkbox?false:true}>
              <View style={{flexDirection:'row'}}>
                  <MaterialIcons name='auto-awesome' style={{color: checkbox?'white':"gray",fontSize:20}}/>
                  <Text style={{color: checkbox?'white':"gray", fontWeight:'bold', fontSize:14, marginLeft:5}}>ACCESS WALLET</Text>
              </View>
              </TouchableOpacity>
              </View>
              </View>
            </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color:"black",
      marginTop:25,
    },
    content:{
      color:'black',
      flex:2 ,
      textAlign:'center',
      fontSize: 16,
      marginTop: 25,
      paddingEnd:20,
      paddingStart:20,
    //   justifyContent: 'center',
      // marginLeft: 37
    },
    note:{
      backgroundColor:'#ede3df', 
      borderRadius:5, 
      paddingTop:10,
      paddingBottom:10,
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center', 
      marginTop:10
    },
    checkbox:{ 
      paddingTop:10,
      paddingBottom:10,
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center', 
      marginTop:10
    },
    accesswallet:{
      flexDirection:'row', 
      justifyContent:'center', 
      flex:1, 
      marginTop:20, 
      alignSelf: 'center'
    },
    download:{
      flexDirection:'row',
      justifyContent:'center',
      flex:1,
      marginTop:20,
      alignSelf: 'center',
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
      color:'green',
      fontSize: 35,
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

  export default Get_Private_Share; 