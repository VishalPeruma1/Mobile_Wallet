import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Dashboard from './Dashboard.js';
import Contacts from './Contacts.js';
import Transactions from './Transactions.js';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TabBar= ({ navigation, route}) => {

    const did = route.params.did
    const [pagename,setPagename] = React.useState("Dashboard")
    const pages = [
        {displayname:"Dashboard",navName:"Dashboard",icon:<MaterialCommunityIcons name="view-dashboard-outline" style={{color:(pagename==="Dashboard"?"#1976D2":"#808080"), fontSize:25}}/>},
        {displayname:"Transaction",navName:"Transactions",icon:<MaterialIcons name="compare-arrows" style={{color:(pagename==="Transactions"?"#1976D2":"#808080"), fontSize:25}}/>},
        {displayname:"Contacts",navName:"Contacts",icon:<MaterialIcons name="contact-page" style={{color:(pagename==="Contacts"?"#1976D2":"#808080"), fontSize:25}}/>}
    ]

    const LogoutApi = async()=>{
        try {
          const response = await fetch('http://webwallet.knuct.com/sapi/logout');
          console.log(response)
          console.log(response.status)
          if(response.status===204) {
            navigation.navigate("Home")
          }
        } catch(error) {
          Toast.show(error,Toast.LONG);
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
