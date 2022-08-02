import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { ScaledSheet,scale } from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const OpenCamera = () => {
  const [responseCamera, setResponseCamera] = React.useState(null);

  function test () {
    try {
      ImagePicker.launchCamera (
        {
          mediaType: 'photo',
          includeBase64: false,
          saveToPhotos: true,
        },
        (response) => {
          console.log(response);
          setResponseCamera(response);
        },
      )
    }
    catch(error){
      console.log(error)
    }
  }
  
  return (
    <View style={styles.accesswallet}>
    <TouchableOpacity onPress={()=>test()}>
    <View style={{flexDirection:'row'}}>
      <MaterialIcons name='auto-awesome' style={{color:'#1976D2',fontSize:scale(20)}}/>
      <Text style={styles.accessWalletBtnText}>OPEN CAMERA</Text>
    </View>
    </TouchableOpacity>
    </View>
  )
};

const styles = ScaledSheet.create({
  accesswallet:{
    borderColor:'#1976D2',
    flexDirection:'row',
    borderWidth:'1@s',
    padding:'12@s', 
    justifyContent:'center',
    // flex:1,
    borderRadius:'5@s',
    marginTop:'30@s',
    alignSelf: 'center',
  },
  accessWalletBtnText:{
    color: '#1976D2', 
    fontWeight:'bold', 
    fontSize:'14@s', 
    marginLeft:'5@s'
  },
})
export default OpenCamera;