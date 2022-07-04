import React from 'react';
 
import {View, Text, TouchableOpacity} from 'react-native';
 
const Logout = (navigation) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity>
      <Text style={{color:"#00000099"}}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
 
export default Logout;