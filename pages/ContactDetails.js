import React from "react";

import {View,Text,TouchableOpacity,Image,TextInput,StyleSheet} from 'react-native';
import Clipboard from "@react-native-clipboard/clipboard";
import { Card, ListItem } from "react-native-elements";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-simple-toast';
import NewContact from './NewContact';

const ContactDetails = ({navigation, route}) => {

    // const nickname = route.params.nickname;
    // const did = route.params.did;
    // const onlineStatus = route.params.onlineStatus;
    // const dp = route.params.dp;

    const data = route.params.data

    // const [copiedText, setCopiedText] = React.useState('')

    const copyToClipboard = () => {
        Clipboard.setString(data.did)

    }

    // const fetchCopiedText = async () => {
    //     const text = await Clipboard.getString()
    //     setCopiedText(text)
    // }
    return(
        <View>
            <Card>
                <View>
                    <TouchableOpacity onPress={()=>navigation.goBack(null)}>
                        <View style={{flexDirection:'row'}}>
                            <Ionicons name='arrow-back-outline' style={{color: '#1976D2',fontSize:20,marginTop:3}}/>
                            <Text style={{color: '#1976D2', fontSize:14, fontFamily:'Roboto', marginTop:3}}>BACK</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{alignItems:"center",flexDirection:"column"}}>
                    {/* <FontAwesome5 name="user-circle" style={{textAlign:"center",fontWeight:50,color:'#1976D2',fontSize:185,marginTop:3}}/> */}
                    {data.dp===""?
                        <View style={{backgroundColor:"#1976D2", borderRadius:100, width: 150, height:150, alignContent:"center", justifyContent:"center"}}>
                        <Text style={{
                            fontSize: 65,
                            color: "#fff",
                            textAlign: "center",
                            bottom:5,
                            left:1
                            }}>
                            {data.nickname.slice(0,1)}
                        </Text>
                        </View>
                        :
                        <Image source={{
                            uri:`data:image/jpg;base64,${JSON.parse(data.dp).base64}`
                        }}
                        style={{height:150,width:150, borderRadius:100}} 
                        />
                    }
                    {data.onlineStatus==="offline"?
                        <View style={{backgroundColor:"rgb(211, 47, 47)",borderRadius:10,paddingLeft:6,paddingRight:6,paddingTop:0,paddingBottom:1,left:52,bottom:32}}>
                            <Text style={{color:"white", fontWeight:"bold", textAlign:"center", fontSize:12.5}}>Offline</Text>
                        </View>
                        :
                        <View style={{backgroundColor:"rgb(46, 125, 50)",borderRadius:10,paddingLeft:6,paddingRight:6,paddingTop:0,paddingBottom:1,left:52,bottom:32}}>
                            <Text style={{color:"white", fontWeight:"bold", textAlign:"center", fontSize:12.5}}>Online</Text>
                        </View>
                    }
                </View>
                <View>
                    <Text style={{fontSize:25,color:"black",textAlign:"center",fontWeight:"bold", letterSpacing:1.5, marginBottom:10}}>{data.nickname}</Text>
                    <Text style={{fontSize:13.5,color:"rgba(0, 0, 0, 0.6)",fontWeight:"400"}}>{data.did}</Text>
                    <TouchableOpacity onPress={() => copyToClipboard()} style={{marginLeft:300}}>
                    <View>
                        <MaterialIcons name="content-copy" color="#1976D2" size={18} style={{bottom:12}}/>
                    </View>
                    </TouchableOpacity>
                </View>
                
                <View>
                <TouchableOpacity onPress={() => navigation.navigate('Transactions')} style={{marginLeft:25, height:50, width:300 ,marginTop:25, borderRadius:10}}>
                    <View style={{flexDirection:"row"}}>
                    <Text style={{textAlign:"center",fontWeight:'bold',marginLeft:55,marginRight:12,fontFamily:'Roboto',color:'#1976D2', fontSize:17}}>
                    TRANSFER TOKENS
                    </Text>
                    <Ionicons name='send' style={{fontSize:20,textAlign:"center",marginTop:1, color:'#1976D2'}}/>

                    </View>
    
                </TouchableOpacity>
                
                </View>
            </Card>

            <Card>
                <Text style={{fontSize:18, color:"rgba(0, 0, 0, 0.38)", textAlign:"center", fontWeight:"bold"}}>No Transactions Found</Text>
            </Card>
        </View>
    );
};

export default ContactDetails;