import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text, 
  Image,
  View,
  TouchableHighlight
} from 'react-native';

import { Card, ListItem } from "react-native-elements";
import RadialGradient from 'react-native-radial-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Balance = () => {

  const [knuct,setKnuct] = React.useState(0);
  const [nft,setNft] = React.useState(0);

  return (
    <Card containerStyle={{borderRadius:10, padding:0, backgroundColor:'rgb(66, 165, 245)',}} wrapperStyle={{padding:10}}>
        <RadialGradient colors={['rgba(0,0,0,0)','rgba(0,0,0,0.1)','rgba(0,0,0,0.05)','rgba(0,0,0,0.03)','rgba(255,255,255,0.05)']} stops={[0.03,0.2,0.2,0.6,0.6]} center={[0,0]}>
        <View style={{flexDirection:"row", alignItems:"baseline", justifyContent:"space-between"}}>        
          <Card.Title style={{ fontSize: 20, color:"white"}}>Your Balance</Card.Title>
          <FontAwesome name="refresh" style={{fontSize:20, fontWeight:"bold", color:"white",transform: [{rotate: '90deg'}]}} />
        </View>
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>        
          <Text style={{ color: "#FFFFFF", fontSize: 17.5 }}>KNUCT</Text>
          <Text style={{ color: "#FFFFFF", fontSize: 17.5 }}>NFT</Text>
        </View>
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>        
          <Text style={{ color: "white", fontSize: 17.5 }}>{knuct}</Text>
          <Text style={{ color: "white", fontSize: 17.5 }}>{nft}</Text>
        </View>
        </RadialGradient>
    </Card>
    )
}

export default Balance; 
