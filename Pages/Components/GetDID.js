import React from 'react';
import {
  Text, 
  Image,
  View,
  TouchableHighlight
} from 'react-native';

import { Card } from "react-native-elements";

const GetDID = () => {
  return (
    <Card containerStyle={{borderRadius:10, height: 400, backgroundColor:"white", borderWidth:0}} wrapperStyle={{height: 250}}>
    <Card.Title style={{ fontSize: 25, color:"black" , textAlign:"left"}}>Your DID</Card.Title>
    <View style={{position: "relative" }}>
        <Text style={{ color: "black", fontSize: 15 }}>Use this to transfer tokens to your wallet. </Text>
        <Text></Text>
        {/* <Image source={require('')} style={{alignSelf:"center"}}/> */}
        <Text></Text>
        <Text style={{ color: "black", fontSize: 15 }}>did</Text>
    </View>
    </Card>
    )
    
}

export default GetDID;



