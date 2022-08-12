import React from 'react';
import Dashboard from './Dashboard';
import {
  ScrollView,
  StyleSheet,
  Text, 
  ToastAndroid, 
  TouchableOpacity,
  View,NetInfo, Platform
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import { scale, ScaledSheet } from 'react-native-size-matters';

const UploadPrivateShare = ({ navigation, route}) => {

  choosePrivateShare = () => {
    let options = {
      title: 'Choose Private Share',
      mediaType: 'photo',
      includeBase64:true,
      customButtons: [
        { 
          name: 'customOptionKey', 
          title: 'Choose file from Gallery' 
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, res => {
      //console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        let priv_share = res.assets[0]
        if(priv_share.type!=="image/png"){
          Toast.show("Select appropriate private share",Toast.LONG)
        }
        else{
          navigation.navigate('Access Wallet',{"priv_share":priv_share})
        }
      }
    });
  };

    return(

        <ScrollView style={styles.content}>
          <Text style={styles.headline}>Access Wallet</Text>
          <Text style={styles.content}>
          To access your wallet upload the private share saved in your device.
          </Text>
        <View style={styles.Button_style}>
        <TouchableOpacity onPress={choosePrivateShare}>
            <View style={{flexDirection:'row'}}>
                <MaterialIcons name='bubble-chart' style={{color:'#ffffff',fontSize:scale(20)}}/>
                <Text style={styles.choosePrivateShareBtnText}>CHOOSE PRIVATE SHARE</Text>
            </View>
        </TouchableOpacity>
        </View>
        <View style={styles.backBtn}>
        <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
            <View style={{flexDirection:'row'}}>
                <Ionicons name='arrow-back-outline' style={styles.backArrow}/>
                <Text style={styles.backText}>Back</Text>
            </View>
        </TouchableOpacity>
        </View>
        </ScrollView>
    );
};

const styles = ScaledSheet.create({
    sectionContainer: {
      marginTop: '32@s',
      paddingHorizontal:'24@s',
    },
    sectionTitle: {
      fontSize: '24@s',
      fontWeight: '600',
    },
    content:{
      color:'black',
      flex:2 ,
      textAlign:'center',
      fontSize: '15@s',
      marginTop: '12@s',
      paddingEnd:'20@s',
      paddingStart:'20@s'
      // justifyContent: 'center',
      // marginLeft: 37
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
      marginTop:'25@s',
      alignSelf: 'center'
    },
    backArrow:{
      color: '#1976D2',
      fontSize: '20@s',
      marginTop: '3@s'
    },
    backText:{
      color: '#1976D2',
      fontSize:'18@s', 
      marginLeft:'5@s'
    },
    choosePrivateShareBtnText:{
      color: '#ffffff',
      fontSize: '14@s', 
      marginLeft: '5@s'
    },
    backBtn:{
      alignItems:'center',
      textAlign:'center',
      flex:2,
      marginTop:'35@s',
      justifyContent:'center',
      flexDirection:'row'
    },
    container: {
      alignItems: 'center',
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
      marginTop: '200@s',
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

  export default UploadPrivateShare;