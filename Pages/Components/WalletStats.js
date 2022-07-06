import React from 'react';
import {
  Text, 
  Image,
  View,
  TouchableHighlight
} from 'react-native';

import { Card } from "react-native-elements";

const WalletStats = () => {
  return (
    <View>
    <Text style={{fontSize: 22.5, color:"black", marginTop:25, fontWeight:"bold",marginLeft: 16}}>Wallet Stats</Text>
       <View style={{display:"flex", flexDirection:"row"}}>
        <Card containerStyle={{width:175, height:105, borderRadius:10, backgroundColor:"white", borderColor:"white" }} wrapperStyle={{width:175, height:105}}>
          <Card.Title style={{ fontSize: 15, right:15, color:"black"}}>KNCT Transactions</Card.Title>
          <View style={{position: "relative" }}>
            <Text style={{ color: "black", fontSize: 17.5,}}>0            <Text style={{color:"green", fontSize: 15}}>↓0</Text>    <Text style={{color:"red", fontSize: 15}}>↑0</Text></Text>
          </View>
        </Card>
        <Card containerStyle={{width:175, height:105, right: 17, borderRadius:10, backgroundColor:"white", borderColor:"white"}} wrapperStyle={{width:175, height:105}}>
          <Card.Title style={{ fontSize: 15, right:15, color:"black"}}>NFT Transactions</Card.Title>
          <View style={{position: "relative" }}>
            <Text style={{ color: "black", fontSize: 17.5, }}>0            <Text style={{color:"green", fontSize: 15}}>↓</Text>    <Text style={{color:"red", fontSize: 15}}>↑0</Text></Text>
          </View>
        </Card>
      </View>
      <View style={{display:"flex", flexDirection:"row"}}>
        <Card containerStyle={{width:175, height:105, borderRadius:10, backgroundColor:"white", borderColor:"white"}} wrapperStyle={{width:175, height:105}}>
          <Card.Title style={{ fontSize: 15, right:15, color:"black"}}>Proof Credits</Card.Title>
          <View style={{position: "relative" }}>
            <Text style={{ color: "black", fontSize: 17.5, left:65}}>0</Text>
          </View>
        </Card>
        <Card containerStyle={{width:175, height:105, right: 17, borderRadius:10, backgroundColor:"white", borderColor:"white"}} wrapperStyle={{width:175, height:105}}>
          <Card.Title style={{ fontSize: 15, right:15, color:"black"}}>Active Nodes</Card.Title>
          <View style={{position: "relative" }}>
            <Text style={{ color: "black", fontSize: 17.5, left:65 }}>454</Text>
          </View>
        </Card>
      </View>
      <View style={{display:"flex"}}>
        <Card containerStyle={{height:105, borderRadius:10,backgroundColor:"white", borderColor:"white" }} wrapperStyle={{height:105}}>
          <Card.Title style={{ fontSize: 15, color:"black"}}>Wallet ID</Card.Title>
          <View style={{position: "relative" }}>
            <Text style={{ color: "black", fontSize: 12, textAlign:"center"}}>Qmegu3AULzboZrA54K2ak1CoR4i1JTJqtxxQwVXeGrcWvT</Text>
          </View>
        </Card>
      </View>
    </View>
    )
    
}

export default WalletStats;



