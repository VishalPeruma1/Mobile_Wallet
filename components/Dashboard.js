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


const Dashboard = ({ navigation}) => {
  return (
    <>
    <ScrollView  style={styles.content}>
    <View style={{display:"flex", flexDirection:"column"}}>
      <Card containerStyle={{borderRadius:10}} wrapperStyle={{}}>
        <Card.Title style={{ fontSize: 25 }}>Your Balance</Card.Title>
        <View style={{position: "relative" }}>
          <Text style={{ color: "black", fontSize: 17.5 }}>KNCT                                                      NFT</Text>
          <Text style={{ color: "black", fontSize: 15 }}>0                                                                           0</Text>
        </View>
      </Card>
      <Card containerStyle={{borderRadius:10, height: 400, backgroundColor:"black", borderWidth:0}} wrapperStyle={{height: 250}}>
      <Card.Title style={{ fontSize: 25, color:"white" }}>Your DID</Card.Title>
      <View style={{position: "relative" }}>
          <Text style={{ color: "white", fontSize: 15 }}>Use this to transfer tokens to your wallet. </Text>
          <Text></Text>
          <Image source={ require('../assets/qr.png')} style={{alignSelf:"center"}}/>
          <Text></Text>
          <Text style={{ color: "white", fontSize: 15 }}>Qmegu3AULzboZrA54K2ak1CoR4i1JTJqtxxQwVXeGrcWvT </Text>
      </View>
      </Card>
    </View>
    <View>
      <Text style={{position: "relative", fontSize: 22.5, color:"black", marginTop:25, alignSelf:"center", fontWeight:"bold"}}>Wallet Stats</Text>
       <View style={{display:"flex", flexDirection:"row"}}>
        <Card containerStyle={{width:175, height:105, borderRadius:10, backgroundColor:"black", borderColor:"black" }} wrapperStyle={{width:175, height:105}}>
          <Card.Title style={{ fontSize: 15, right:15, color:"white"}}>KNCT Transactions</Card.Title>
          <View style={{position: "relative" }}>
            <Text style={{ color: "white", fontSize: 17.5,}}>0            <Text style={{color:"green", fontSize: 15}}>↓0</Text>    <Text style={{color:"red", fontSize: 15}}>↑0</Text></Text>
          </View>
        </Card>
        <Card containerStyle={{width:175, height:105, right: 17, borderRadius:10, backgroundColor:"black", borderColor:"black"}} wrapperStyle={{width:175, height:105}}>
          <Card.Title style={{ fontSize: 15, right:15, color:"white"}}>NFT Transactions</Card.Title>
          <View style={{position: "relative" }}>
            <Text style={{ color: "white", fontSize: 17.5, }}>0            <Text style={{color:"green", fontSize: 15}}>↓0</Text>    <Text style={{color:"red", fontSize: 15}}>↑0</Text></Text>
          </View>
        </Card>
      </View>
      <View style={{display:"flex", flexDirection:"row"}}>
        <Card containerStyle={{width:175, height:105, borderRadius:10, backgroundColor:"black", borderColor:"black"}} wrapperStyle={{width:175, height:105}}>
          <Card.Title style={{ fontSize: 15, right:15, color:"white"}}>Proof Credits</Card.Title>
          <View style={{position: "relative" }}>
            <Text style={{ color: "white", fontSize: 17.5, left:65}}>0</Text>
          </View>
        </Card>
        <Card containerStyle={{width:175, height:105, right: 17, borderRadius:10, backgroundColor:"black", borderColor:"black"}} wrapperStyle={{width:175, height:105}}>
          <Card.Title style={{ fontSize: 15, right:15, color:"white"}}>Active Nodes</Card.Title>
          <View style={{position: "relative" }}>
            <Text style={{ color: "white", fontSize: 17.5, left:65 }}>93</Text>
          </View>
        </Card>
      </View>
      <View style={{display:"flex"}}>
        <Card containerStyle={{height:105, borderRadius:10,backgroundColor:"black", borderColor:"black" }} wrapperStyle={{height:105}}>
          <Card.Title style={{ fontSize: 15, color:"white"}}>Wallet ID</Card.Title>
          <View style={{position: "relative" }}>
            <Text style={{ color: "white", fontSize: 12, textAlign:"center"}}>Qmegu3AULzboZrA54K2ak1CoR4i1JTJqtxxQwVXeGrcWvT</Text>
          </View>
        </Card>
      </View>
    </View>
    <View>
    <Text style={{position: "relative", fontSize: 22.5, color:"black", marginTop:25, alignSelf:"center", fontWeight:"bold"}}>Actions</Text>
    <View style={{display:"flex", flexDirection:"column"}}>
    <ListItem
      Component={TouchableHighlight}
      containerStyle={{width:365, height:105, borderRadius:10, backgroundColor:"black", borderColor:"black", left:15}}
      disabledStyle={{ opacity: 0.5 }}
      onLongPress={() => console.log("onLongPress()")}
      onPress={() => console.log("onLongPress()")}
      pad={20}
    >
      <ListItem.Content>
        <ListItem.Title>
          <Text style={{color:'#a1887f'}}>TRANSFER TOKENS</Text>
        </ListItem.Title>
        <ListItem.Subtitle>
          <Text style={{color:'#a1887f', fontSize:15}}>Send tokens to another wallet</Text>
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
    <Text></Text>
    <ListItem
      Component={TouchableHighlight}
      containerStyle={{width:365, height:105, borderRadius:10, backgroundColor:"black", borderColor:"black", left:15}}
      disabledStyle={{ opacity: 0.5 }}
      onLongPress={() => console.log("onLongPress()")}
      onPress={() => console.log("onLongPress()")}
      pad={20}
    >
      <ListItem.Content>
        <ListItem.Title>
          <Text style={{color:'#4db6ac'}}>RESTART NODE</Text>
        </ListItem.Title>
        <ListItem.Subtitle>
          <Text style={{color:'#4db6ac',fontSize:15}}>Restart wallet node in cloud</Text>
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
    <Text></Text>
    <ListItem
      Component={TouchableHighlight}
      containerStyle={{width:365, height:105, borderRadius:10, backgroundColor:"black", borderColor:"black", left:15}}
      disabledStyle={{ opacity: 0.5 }}
      onLongPress={() => console.log("onLongPress()")}
      onPress={() => console.log("onLongPress()")}
      pad={20}
    >
      <ListItem.Content>
        <ListItem.Title>
          <Text style={{color:'#ba68c8'}}>SHUTDOWN</Text>
        </ListItem.Title>
        <ListItem.Subtitle>
          <Text style={{color:'#ba68c8', fontSize:15}}>Stop node and exit</Text>
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
    </View>
    </View>
    <View>
      <Text style={{position: "relative", fontSize: 22.5, color:"black", marginTop:25, alignSelf:"center", fontWeight:"bold"}}>Active Nodes</Text>
      <Card containerStyle={{borderRadius:10, height: 400, backgroundColor:"black", borderWidth:0}} wrapperStyle={{height: 250}}>
      <Card.Title style={{ fontSize: 15, color:"white" }}>93 Active</Card.Title>
      <View style={{position: "relative" }}>
          <Text style={{ color: "white", fontSize: 15 }}>QmXAhNp3hVwwSi1FKRXZVhFrPyoFfVe5wThQ</Text>
          <Text style={{ color: "white", fontSize: 15 }}>QmZE4cDd6kB7bqgQbDyWCQ9fj9URKJDvmBZA </Text>
          <Text style={{ color: "white", fontSize: 15 }}>QmRYrKxfWo8ftKrn2jvYBH6wdi98UFsih8mVB3q </Text>
          <Text style={{ color: "white", fontSize: 15 }}>QmerJbDcm6A28va4bXtmdZn9Hz8BZTdt9c3w9 </Text>
          <Text style={{ color: "white", fontSize: 15 }}>QmXmzac6F6WvYTzqAqGtNur2fYMfbeQ6aHMy </Text>
          <Text style={{ color: "white", fontSize: 15 }}>QmT6HJysiwY64FaRTyucXGmC8fFPE7N9Esn1jn </Text>
          <Text style={{ color: "white", fontSize: 15 }}>QmZy2R1JoyQgf54ybTg7TyUUg7ea7ogtejjieoCz</Text>
      </View>
      </Card>
    </View>
    </ScrollView>
    </>
  );
}

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
      // justifyContent: 'center',
      // marginLeft: 37
    },
    Button_style:{
      flex:2 ,
      textAlign:'center',
      fontSize: 20,
      marginTop: 25,
      // justifyContent: 'center',
      // marginLeft: 37,
      alignItems: 'center'
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

export default Dashboard;