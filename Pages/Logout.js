import React from 'react';
import LogoutApi from './Tab_Bar';
import {View, Text, TouchableOpacity} from 'react-native';
import Toast from 'react-native-simple-toast';


const Logout = ({navigation}) => {

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={LogoutApi}>
      <Text style={{color:"#00000099"}}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
 
export default Logout;