import React from 'react';
import {
  ScrollView,
  Text, 
  View,
  TouchableOpacity
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card } from "react-native-elements";
import Balance from './components/Balance';
import Did from './components/Did';
import WalletStats from './components/WalletStats';
import { scale, ScaledSheet } from 'react-native-size-matters';

const Dashboard = (did,{ navigation}) => {

  return (
    <>
    <ScrollView  style={styles.content}>
    <View style={{display:"flex", flexDirection:"column"}}>
      {Balance()}
      {Did(did.data)}
    </View>
    <View>
      <WalletStats/>
    </View>
    <View>
    <Text style={styles.actionText}>Actions</Text>
    <View style={styles.buttonsView}>
    <TouchableOpacity>
    <Card containerStyle={styles.transferTokenCardStyle} wrapperStyle={{height:scale(105)}}>
      <View style={{flexDirection:"row"}}>
        <MaterialIcons name="arrow-forward" style={{color:'#a1887f', fontSize:scale(36)}}/>
      <View style={{flexDirection:"column" }}>
        <Text style={{color:'#a1887f'}}>TRANSFER TOKENS</Text>
        <Text style={{color:'#a1887f', fontSize:scale(15)}}>Send tokens to another wallet</Text>
      </View>
      </View>
    </Card>
    </TouchableOpacity>
    <TouchableOpacity>
    <Card containerStyle={styles.restartNodeCardStyle} wrapperStyle={{height:scale(105)}}>
      <View style={{flexDirection:"row"}}>
        <MaterialCommunityIcons name="restart" style={{color:'#4db6ac', fontSize:scale(36)}}/>
      <View style={{flexDirection:"column"}}>
        <Text style={{color:'#4db6ac'}}>RESTART NODE</Text>
        <Text style={{color:'#4db6ac',fontSize:scale(15)}}>Restart wallet node in cloud</Text>
      </View>
      </View>
    </Card>
    </TouchableOpacity>
    <TouchableOpacity>
    <Card containerStyle={styles.shutdownCardStyle} wrapperStyle={{height:scale(105)}}>
      <View style={{flexDirection:"row"}}>
      <MaterialCommunityIcons name="power-standby" style={{color:'#ba68c8', fontSize:scale(36)}}/>
      <View style={{flexDirection:"column"}}>
        <Text style={{color:'#ba68c8'}}>SHUTDOWN</Text>
        <Text style={{color:'#ba68c8', fontSize:scale(15)}}>Stop node and exit</Text>
      </View>
      </View>
    </Card>
    </TouchableOpacity>
    </View>
    </View>
    </ScrollView>
    </>
  );
}

const styles = ScaledSheet.create({
    content:{
      color:'black',
      flex:2 ,
      textAlign:'center',
      fontSize: '15@s',
      marginTop: '25@s',
      // justifyContent: 'center',
      // marginLeft: 37
    },
    actionText:{
      fontSize: '22.5@s', 
      color:"black", 
      marginTop:'25@s', 
      fontWeight:"bold", 
      marginLeft: '16@s'
    },
    buttonsView:{
      display:"flex", 
      flexDirection:"column", 
      marginBottom: '75@s'
    },
    transferTokenCardStyle:{
      height:'68@s', 
      borderRadius:'10@s',
      backgroundColor:"white", 
      borderColor:"white" 
    },
    restartNodeCardStyle:{
      height:'68@s', 
      borderRadius:'10@s',
      backgroundColor:"white", 
      borderColor:"white" 
    },
    shutdownCardStyle:{
      height:'68@s', 
      borderRadius:'10@s',
      backgroundColor:"white", 
      borderColor:"white" 
    }
  });

export default Dashboard;