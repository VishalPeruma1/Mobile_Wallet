import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Dashboard from './Dashboard.js';
import Contacts from './Contacts.js';
import Transactions from './Transactions.js';
import { View, Text, TouchableOpacity, StyleSheet, PermissionsAndroid } from 'react-native';
import { NavigationHelpersContext } from '@react-navigation/native';

const TabBar= ({ navigation, route}) => {

    const [camerapermission,setcamerapermission] = React.useState("denied")
    const did = route.params.did
    const [pagename,setPagename] = React.useState("Dashboard")
    const pages = [
        {displayname:"Dashboard",navName:"Dashboard",icon:<MaterialCommunityIcons name="view-dashboard-outline" style={{color:(pagename==="Dashboard"?"#1976D2":"#808080"), fontSize:25}}/>},
        {displayname:"Transaction",navName:"Transactions",icon:<MaterialIcons name="compare-arrows" style={{color:(pagename==="Transactions"?"#1976D2":"#808080"), fontSize:25}}/>},
        {displayname:"Contacts",navName:"Contacts",icon:<MaterialIcons name="contact-page" style={{color:(pagename==="Contacts"?"#1976D2":"#808080"), fontSize:25}}/>}
    ]

    const getcamerapermission = () => {
      if(camerapermission==="denied") {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'App Camera Permission',
            message: 'App needs access to your camera ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        ).then((result) => {
          console.log(result)
          if(result==="granted") {
            setcamerapermission(true)
            console.log("Permission Granted")
          } else{
            console.log("Permission Denied")
            Alert.alert(
              "Permission Required",
              "Need Camera Permission to work.",
              [
                {
                  text: "Allow",
                }
              ]
            )
          }
        });
      } else {
        navigation.navigate("Open Camera")
      }
    }

    const TabScreen = ({data})=>{
        return(
            <TouchableOpacity onPress={()=>setPagename(data.navName)}>
            <View style={{alignItems:"center", justifyContent:"center"}}>
                {data.icon}
                <Text style={{color:(pagename===data.navName?"#1976D2":"#808080"), fontSize:13}} >{data.displayname}</Text>
            </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{flex:1}}>
            {pagename==="Dashboard" ? 
                <Dashboard data={did}/> : null
            }
            {pagename==="Transactions" ? 
                <Transactions/> : null
            }
            {pagename==="Contacts" ? 
                <Contacts data={navigation}/> : null
            }
          <View style={styles.tabbarstyle}>
            {pages.map((data,id) => (
                <TabScreen key={id} data={data} />
            ))}
            <TouchableOpacity onPress={() => getcamerapermission()}>
              <View style={{alignItems:"center", justifyContent:"center"}}>
                  <MaterialCommunityIcons name="camera" style={{color:"#808080", fontSize:25}}/>
                  <Text style={{color:"#808080", fontSize:13}} >Camera</Text> 
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );

}

const styles = StyleSheet.create({
    tabbarstyle: {
        backgroundColor:'white', 
        paddingTop:5, 
        paddingBottom:5, 
        alignItems:"center", 
        justifyContent:"space-around", 
        flexDirection:"row", 
        borderRadius:10, 
        bottom:0,
        position:"absolute",
        width:"100%"
    },
})

export default TabBar;
