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

    const nickname = route.params.nickname;
    const did = route.params.did;
    const onlineStatus = route.params.onlineStatus;

    const [copiedText, setCopiedText] = React.useState('')

    const copyToClipboard = () => {
        Clipboard.setString(did)
        const text = Clipboard.getString()
        setCopiedText(text)
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
                <View style={{marginBottom:-20}}>
                    <FontAwesome5 name="user-circle" style={{textAlign:"center",fontWeight:50,color:'#1976D2',fontSize:185,marginTop:3}}/>
                    {onlineStatus==="offline"?
                        <View style={{backgroundColor:"red", height:"9%",borderRadius:20,width:"18%", marginLeft:200,bottom:42,marginBottom:0}}>
                            <Text style={{color:"white", fontWeight:"bold", textAlign:"center"}}>Offline</Text>
                        </View>
                        :
                        <View style={{backgroundColor:"rgb(46, 125, 50)", height:"9%",borderRadius:20,width:"18%", marginLeft:200,bottom:42,marginBottom:0}}>
                            <Text style={{color:"white", fontWeight:"bold", textAlign:"center"}}>Online</Text>
                        </View>
                    }
                    
                    
                </View>
                <View>
                    <Text style={{fontSize:25,color:"black",textAlign:"center",fontWeight:"bold", letterSpacing:1.5, marginBottom:10}}>{nickname}</Text>
                    <Text style={{fontSize:13.5,color:"rgba(0, 0, 0, 0.6)",fontWeight:"400"}}>{did}</Text>
                    <TouchableOpacity onPress={() => copyToClipboard()} style={{marginLeft:300}}>
                    <View>
                        {/* <Text style={{color: 'red', fontSize: 14 , fontFamily:'Arial', fontStyle: 'bold', textAlign: 'center', marginTop: 3, marginLeft: 25, marginBottom: 17}}> 
                                    {did}
                        </Text> */}
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