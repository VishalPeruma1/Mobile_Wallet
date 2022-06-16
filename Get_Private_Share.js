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


const Get_Private_Share = ({ navigation, route}) => {

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
            <View style={styles.accesswallet}>
            <TouchableOpacity onPress={()=>navigation.navigate('Access')}>
            <View style={{flexDirection:'row'}}>
                <MaterialIcons name='file-download' style={{color:'#1976D2',fontSize:18}}/>
                <Text style={{color: '#1976D2', fontWeight:'bold', fontSize:14}}>  DOWNLOAD PRIVATE SHARE</Text>
            </View>
            </TouchableOpacity>
            </View>
            <Text style={styles.sectionTitle}>Step 2</Text>
            <Text style={styles.content}>
            Now open you your wallet. You have to do a first access within 48 hours of wallet creation or your wallet will be deleted.
            </Text>
            </View>
            <View style={styles.accesswallet}>
            <TouchableOpacity onPress={()=>navigation.navigate('Access')}>
            <View style={{flexDirection:'row'}}>
                <MaterialIcons name='auto-awesome' style={{color:'#1976D2',fontSize:18}}/>
                <Text style={{color: '#1976D2', fontWeight:'bold', fontSize:14}}>  ACCESS WALLET</Text>
            </View>
            </TouchableOpacity>
            </View>
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
    accesswallet:{
        borderColor:'#1976D2',
        flexDirection:'row',
        borderWidth:1,
        padding:12, 
        justifyContent:'center',
        flex:1,
        borderRadius:5,
        marginTop:20,
        alignSelf: 'center',
      },
    accesswallet:{
        borderColor:'#1976D2',
        flexDirection:'row',
        borderWidth:1,
        padding:12, 
        justifyContent:'center',
        flex:1,
        borderRadius:5,
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
      fontWeight: 'bold',
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