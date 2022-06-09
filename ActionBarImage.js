import React from 'react';
 
import {View, Image} from 'react-native';
 
const ActionBarImage = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Image
        source={require('./images/knuct-logo.png')}
        style={{
          width: 40,
          height: 40,
          borderRadius: 40 / 2,
        }}
      />
    </View>
  );
};
 
export default ActionBarImage;