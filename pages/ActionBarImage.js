import React from 'react';
 
import {View, Image} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
 
const ActionBarImage = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Image
        source={require('../assets/knuct-logo.png')}
        style={styles.knuctLogo}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  knuctLogo:{
    width: '40@s',
    height: '40@s',
    borderRadius: '20@s',
  }
});

export default ActionBarImage;