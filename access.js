import React from 'react';
import Dashboard from './Dashboard';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';


const Access = ({ navigation}) => {

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
      }
    });
  };


    return(

        <ScrollView style={styles.content}>
          <Text style={styles.headline}>Access Wallet</Text>
          <Text style={styles.content}>
          To access your wallet upload the private share saved in your device.
          </Text>
        <TouchableOpacity onPress={choosePrivateShare}>
            <View style={styles.Button_style}>
                  <MaterialIcons name='bubble-chart' style={{color:'#ffffff',fontSize:18}}/>
                <Text style={{color: '#ffffff',fontSize:14}}>  CHOOSE PRIVATE SHARE</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
            <View style={styles.backBtn}>
                  <Ionicons name='arrow-back-outline' style={{color: '#1976D2',fontSize:18}}/>
                <Text style={{color: '#1976D2',fontSize:18}}>  Back</Text>
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

  export default Access;