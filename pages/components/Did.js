import React from 'react';
import {
  Text, 
  Image,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';

import { Card } from "react-native-elements";

const Did = () => {
  const [showQrCode, setShowQrCode] = React.useState(false)


  return (
    <Card containerStyle={{borderRadius:10, height: 400, backgroundColor:"white", borderWidth:0}} wrapperStyle={{height: 250}}>
    <Card.Title style={{ fontSize: 25, color:"black" , textAlign:"left"}}>Your DID</Card.Title>
    <View style={{position: "relative" }}>
        <Text style={{ color: "black", fontSize: 15 }}>Use this to transfer tokens to your wallet. </Text>
        <TextInput value={"appState.did"}  readOnly selectTextOnFocus={false} style={{borderWidth:1, color:"black", marginTop:30}}/>
        <TextInput editable={false} value="Hellossssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"  style={{borderWidth:1, color:"black", marginTop:30, marginStart:5,marginEnd:5}}/>
        {/* <Image source={require('')} style={{alignSelf:"center"}}/> */}
        <Text></Text>
        <Text style={{ color: "black", fontSize: 15 }}>did</Text>
    </View>
    </Card>
    )
    
}

export default Did;



