import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Dashboard from './Dashboard.js';
import UploadPrivateShare from './uploadprivateshare.js';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TabBar= ({ navigation}) => {

    const [pagename,setPagename] = React.useState("Dashboard")
    const pages = [
        {displayname:"Dashboard",navName:"Dashboard",icon:<MaterialIcons name="home" style={{color:(pagename==="Dashboard"?"#1976D2":"#808080"), fontSize:25}}/>},
        {displayname:"Contacts",navName:"Contacts",icon:<MaterialIcons name="contacts" style={{color:(pagename==="Contacts"?"#1976D2":"#808080"), fontSize:25}}/>}
    ]

    function TabScreen({data}){

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
                <Dashboard /> : null
            }
            {pagename==="Contacts" ? 
                <UploadPrivateShare /> : null
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