import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text, 
  TouchableOpacity,
  View,
  Image,TextInput,
  Button,
  ActivityIndicator
} from 'react-native';



import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card, ListItem } from "react-native-elements";
import RadialGradient from 'react-native-radial-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

 const Transactions = ({navigation}) => {
  const [type,setType] = React.useState("Token");
    const [Token, onChangeToken] = React.useState("");
    const [RDID, onChangeRDID] = React.useState("");
    const [com, onChangecom] = React.useState("");

    const types = [{displayname:"TOKEN",navName:"Token",icon:<MaterialCommunityIcons name="view-dashboard-outline" style={{color:(type==="Token"?"#1976D2":"#808080"), fontSize:25}}/>},
    {displayname:"NFT",navName:"Nft",icon:<MaterialCommunityIcons name="cube-scan" style={{color:(type==="Nft"?"#1976D2":"#808080"), fontSize:25}}/>}]


    const TabScreen = ({data})=>{
      return(
          <TouchableOpacity style={{height:75, alignItems:"center",justifyContent:"center"}} onPress={()=>setType(data.navName)}>
          <View style={{flexDirection:'row',alignItems:"center", justifyContent:"center"}}>
              {data.icon}
              <Text style={{color:(type===data.navName?"#1976D2":"#808080"), fontSize:20}} >{data.displayname}</Text>
          </View>
          </TouchableOpacity>
      )
  }

    const token = ()=>{
      return(
        <Card containerStyle={{width:"auto", height:"auto", borderRadius:10, backgroundColor:"white", borderColor:"white"}}>
        {/* <Text style={{color: '#00000099', fontWeight:'bold', fontSize:14, fontFamily:'Roboto' , marginLeft:5}}>TOKEN</Text> */}
      
            <View style={{flexDirection:'column'}}>
              <Text style={{color: '#000000DE', fontWeight:'bold', fontSize:20, fontFamily:'Roboto' , marginLeft:5, paddingTop:10}}>Transfer Tokens</Text>
  
              <Text style={{color: '#000000DE', fontSize:12, fontFamily:'Roboto' , marginLeft:5, paddingTop:10}}>Send tokens to a receiver</Text>
            </View>
            <View style={{flexDirection:'column'}}>
            <TextInput placeholder='Tokens' placeholderTextColor="grey" style={styles.textinput} onChangeText={onChangeToken} value={Token} />
            <Text style={{color: '#00000099',fontSize:12, fontFamily:'Roboto' , marginLeft:20, paddingTop:10}}>Number of Tokens to transfer</Text>
            </View>
            <View style={{flexDirection:'row'}}>
            <TextInput placeholder='Receiver DID' placeholderTextColor="grey" style={styles.textinput} onChangeText={onChangeRDID} value={RDID}  />
  
            </View>
            <View style={{flexDirection:'row'}}>
            <TextInput placeholder='Comment (Optional)' placeholderTextColor="grey" style={styles.textinput} onChangeText={onChangecom} value={com}  />
              </View>
  
              <TouchableOpacity style={{marginLeft:25 ,backgroundColor:'#1962D2', height:50, width:300 ,marginTop:25, borderRadius:10}}>
                <View style={{flexDirection:'row'}} >
                <Ionicons name='send-outline' style={{ color:'#fff', fontSize:14,marginLeft:100, marginTop:18}}/>
                
                <Text style={{fontWeight:'bold',fontFamily:'Roboto',color:'#fff', fontSize:15,marginLeft:10, marginTop:12}}>
                  Transfer
                </Text>
                </View>
  
              </TouchableOpacity>
            
          </Card>
  
      )
  }
  const Nft = ()=>{
    return(
      <Card containerStyle={{width:"auto", height:"auto", borderRadius:10, backgroundColor:"white", borderColor:"white"}}>
      {/* <Text style={{color: '#00000099', fontWeight:'bold', fontSize:14, fontFamily:'Roboto' , marginLeft:5}}>NFT</Text> */}
    
          <View style={{flexDirection:'column'}}>
            <Text style={{color: '#000000DE', fontWeight:'bold', fontSize:20, fontFamily:'Roboto' , marginLeft:5, paddingTop:10}}>Transfer NFT</Text>

            <Text style={{color: '#000000DE', fontSize:12, fontFamily:'Roboto' , marginLeft:5, paddingTop:10}}>Send NFT to a receiver</Text>
          </View>
          <View style={{flexDirection:'column'}}>
          <TextInput placeholder='Price' placeholderTextColor="grey" style={styles.textinput} onChangeText={onChangeToken} value={Token} />
          <Text style={{color: '#00000099',fontSize:12, fontFamily:'Roboto' , marginLeft:20, paddingTop:10}}>Average price of the NFT</Text>
          </View>
          <View style={{flexDirection:'row'}}>
          <TextInput placeholder='Receiver DID' placeholderTextColor="grey" style={styles.textinput} onChangeText={onChangeRDID} value={RDID}  />

          </View>
          <View style={{flexDirection:'row'}}>
          <TextInput placeholder='Comment (Optional)' placeholderTextColor="grey" style={styles.textinput} onChangeText={onChangecom} value={com}  />
            </View>

            <TouchableOpacity style={{marginLeft:25 ,backgroundColor:'#1962D2', height:50, width:300 ,marginTop:25, borderRadius:10}}>
              <View style={{flexDirection:'row'}} >
              <Ionicons name='send-outline' style={{ color:'#fff', fontSize:14,marginLeft:100, marginTop:18}}/>
              
              <Text style={{fontWeight:'bold',fontFamily:'Roboto',color:'#fff', fontSize:15,marginLeft:10, marginTop:12}}>
                Transfer
              </Text>
              </View>

            </TouchableOpacity>
          
        </Card>

    )
} 
    return (
        <ScrollView style={styles.content}>

          <View style={{width:375,marginLeft:15, borderRadius:10,flexDirection:'row', backgroundColor:'white',paddingTop:5,alignItems:'center',justifyContent:'space-around',}}>
            {types.map((data,id) => (
                <TabScreen key={id} data={data} />
            ))}
          </View>
            <View style={{display:"flex", flexDirection:"column"}}>
            {type==="Token" ? 
                token() : null
            }
            {type==="Nft" ? 
                Nft() : null
            }
            

      
        <Card containerStyle={{width:375, height:250, borderRadius:10, backgroundColor:"white", borderColor:"white"}}>
        <View style={{flexDirection:'row'}}>
          <Text style={{fontWeight:'bold',fontFamily:'Roboto',color:'#000000DE', fontSize:20}}>Recent Transcations</Text>
          <TouchableOpacity>
            <Text style={{fontSize:14,marginLeft:75,color:'#1976D2',marginTop:6}}> VIEW ALL</Text>
          
          </TouchableOpacity>

        </View>

          </Card>

          <Card containerStyle={{width:375, height:250, borderRadius:10, backgroundColor:"white", borderColor:"white"}}>
        <View style={{flexDirection:'row'}}>
          <Text style={{fontWeight:'bold',fontFamily:'Roboto',color:'#000000DE', fontSize:20}}>Recent NFT Transcations</Text>
          <TouchableOpacity>
            <Text style={{fontSize:14,marginLeft:28,color:'#1976D2',marginTop:6}}> VIEW ALL</Text>
          </TouchableOpacity>

        </View>

          </Card>
          <Card containerStyle={{width:375, height:250, borderRadius:10, backgroundColor:"white", borderColor:"white"}}>
        <View style={{flexDirection:'row'}}>
          <Text style={{fontWeight:'bold',fontFamily:'Roboto',color:'#000000DE', fontSize:20}}>Tokens</Text>
          <TouchableOpacity>
            <Text style={{fontSize:14,marginLeft:200,color:'#1976D2',marginTop:6}}> VIEW ALL</Text>
          </TouchableOpacity>

        </View>
        <Text style={{marginLeft:10}}>
          0 total
        </Text>

          </Card>
      </View>
            
            </ScrollView>
        
    );
 };
 
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
   newwallet:{
    borderColor:'#1976D2',
    flexDirection:'row',
    borderWidth:1,
    height:65,
    padding:12, 
    justifyContent:'center',
    flex:1,
    borderRadius:5,
    marginTop:30,
    alignItems: 'center',
    backgroundColor:'#1976D2'
  },
   textinput:{
    color: "black",
    height: 40,
    width: 325,
    marginTop: 25,
    marginStart:12,
    marginEnd:12,
    padding: 10,
    borderWidth: 1, 
    borderRadius: 5,
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
export default Transactions;