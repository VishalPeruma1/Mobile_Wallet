import React from 'react';
import Dashboard from './Dashboard';
import {
  ScrollView,
  StyleSheet,
  Text, 
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';


const UploadPrivateShare = ({ navigation, route}) => {

  choosePrivateShare = () => {
    var options = {
      title: 'Choose Private Share',
      mediaType: 'photo',
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
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        var priv_share = res.assets[0]
        navigation.navigate('Access Wallet',{"priv_share":priv_share})
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
                <MaterialIcons name='bubble-chart' style={{color:'#ffffff',fontSize:20}}/>
                <Text style={{color: '#ffffff',fontSize:14, marginLeft:5}}>CHOOSE PRIVATE SHARE</Text>
            </View>
        </TouchableOpacity>
        </View>
        <View style={styles.backBtn}>
        <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
            <View style={{flexDirection:'row'}}>
                <Ionicons name='arrow-back-outline' style={{color: '#1976D2',fontSize:20,marginTop:3}}/>
                <Text style={{color: '#1976D2',fontSize:18, marginLeft:5}}>Back</Text>
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
    },
    content:{
      color:'black',
      flex:2 ,
      textAlign:'center',
      fontSize: 15,
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
      marginTop:45,
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

  export default UploadPrivateShare;