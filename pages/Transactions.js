import React, { useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text, 
  TouchableOpacity,
  View,
  Image,TextInput,
  Button,Modal,
  ActivityIndicator
} from 'react-native';



import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card, ListItem } from "react-native-elements";
import Toast from 'react-native-simple-toast';
import { useIsFocused } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

 const Transactions = ({navigation}) => {
  const [type,setType] = React.useState("Token");
    const [Token, onChangeToken] = React.useState("");
    const [RDID, onChangeRDID] = React.useState("");
    const [com, onChangecom] = React.useState("");
    const [showNFT, setshowNFT] = React.useState(false);
    const [showQR, setshowQR] = React.useState(false);
    // const [showTransaction,setShowTransaction] = React.useState(false);
    const [transactionList,setTransactionList, getTransactionList] = React.useState("");
    const [res,setres] = React.useState("");
    const isFocused = useIsFocused();
    var transList =[];

    React.useEffect(()=> {
      getTxnByCount()
      }, [isFocused])


    const getTxnByCount = async()=>{
      let options = {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify ({
          txnCount: 10
        })
      }
      try {
          const response = await fetch('http://webwallet.knuct.com/capi/getTxnByCount',options);
          const responseJson = await response.json();
          console.log("Response JSON: ", responseJson)
          if(response.status===200 && responseJson) {
            setTransactionList(responseJson.data.response)
          }
      } catch(error) {
        Toast.show(error,Toast.LONG);
      }
    } 

    const TransactionCard = ({data})=>{
      return(
        <TouchableOpacity>
          <Card containerStyle={{marginLeft:10, marginRight:10,borderRadius:10,backgroundColor:"black",padding:5, paddingLeft:12, borderColor:"black",elevation:5}} wrapperStyle={{height:105, width:200}}>
            <View style={{flexDirection:'column', flexWrap:"wrap", justifyContent:"space-evenly"}}>
              <Text style={{color:"black"}}>Testing</Text>
            </View>
          </Card>
        </TouchableOpacity>
      )
  }

    const chooseImage = () =>{

      var options = {
        title:"Choose profile image",
        mediaType:'photo',
        customButtons:[{name:'customOptionKey', title:'Choose file from Gallery'}],storageOptions:{skipBackup:true,path:'images'},
      };
      launchImageLibrary(options,res =>{
  
        console.log("Response = ",res)
        if(res.didCancel)
        {console.log("User Cancelled");}
  
        else if(res.error){
          console.log("Error: ",res.error);
  
        }
        else if(res.customButton){
          console.log("User tapped into custom button");
          alert(res.customButton);
        }
        else{
          var pro_image = res.assets[0]
          if(pro_image.fileSize > 1000000){
            Toast.show("File size must be less than 1 MB",Toast.LONG)
          }
          else{
  
            console.log("Success",pro_image.uri);
  
          }
        }
      })
    }


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

    const token = ()=> {
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
            <View style={{flexDirection:'row',marginTop:15,width:325, marginLeft: 10, marginRight: 25,borderColor: "black",borderRadius: 5,borderWidth: 1,justifyContent: "space-between"}}>
            <TextInput placeholder='Receiver DID' placeholderTextColor="grey"  onChangeText={onChangeRDID} value={RDID}  />
            <TouchableOpacity onPress={()=>setshowQR(true)}>
            <MaterialIcons name="qr-code-scanner" style={{padding:10,paddingTop:13,fontSize:20, color:"grey"}}/>
            </TouchableOpacity>

            <Modal visible={showQR} transparent={true} onRequestClose={()=>{setshowQR(false)}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

          <View style={styles.qrcode}>
            <View style={{flexDirection:'row',alignSelf:'baseline'}}>
            <Text style={{fontWeight:'bold', fontSize:20, color:'black'}}>QR reader</Text>          
            </View>
            <View style={{padding:15}}>
            <TouchableOpacity style={{flexDirection:'row',backgroundColor:'#E0E0E0', height:75, width:240, borderRadius:10,alignSelf:'center'}}>
            <SimpleLineIcons name="camera" style={{marginTop:6,padding:10,fontSize:40, color:"#A6A6A6"}}/>
              <Text style={{includeFontPadding:true,marginRight:80,textAlignVertical:'center',padding:10,textAlign:'center',fontWeight:'bold',fontFamily:'Roboto',color:'#A6A6A6', fontSize:14}}>
             Scan QR code with camera   
              </Text>
                </TouchableOpacity>
            <TouchableOpacity onPress={chooseImage} style={{marginTop:10,flexDirection:'row',backgroundColor:'#9c27b0', height:75, width:240, borderRadius:10,alignSelf:'center'}}>
            <MaterialIcons name="qr-code-2" style={{marginTop:6,padding:10,fontSize:40, color:"white"}}/>
              <Text style={{includeFontPadding:true,marginRight:80,textAlignVertical:'center',padding:10,textAlign:'center',fontWeight:'bold',fontFamily:'Roboto',color:'#fff', fontSize:14}}>
                Open QR image on device
              </Text>
                </TouchableOpacity>

            </View>

         <TouchableOpacity onPress={()=>setshowQR(false)}>
                <Text style={{fontSize:15,color:'#9C27B0',fontFamily:'Roboto'}}>Cancel</Text>
              </TouchableOpacity>
              </View>
        </View>

      </Modal>
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
          <TouchableOpacity onPress={()=>setshowNFT(true)} style={{borderColor:'#0000008A',marginTop:10,alignItems:'center',justifyContent:'space-around', borderRadius: 5,borderWidth: 1,}}>
          <View style={{padding:10}}>
            <Text style={{color:'#0000008A',fontSize:14}}>
              CHOOSE NFT
            </Text>
            <Text style={{color:'#0000008A',fontSize:12,alignSelf:'center'}}>
              to send
            </Text>
          </View>

          </TouchableOpacity>
          <Modal visible={showNFT} transparent={true} onRequestClose={()=>{setshowNFT(false)}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

          <View style={styles.qrcode}>
            <View style={{flexDirection:'row',alignSelf:'baseline'}}>
            <Text style={{fontWeight:'bold', fontSize:20, color:'black'}}>Choose NFT to transfer</Text>
            <FontAwesome name="refresh" style={{marginLeft:65,fontSize:20, fontWeight:"bold", color:"grey",transform: [{rotate: '90deg'}]}} />

            </View>
            <View style={{padding:15}}>
            <Text style={{fontWeight:'bold', fontSize:16, color:'#00000061'}}>You don't have any NFT</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <TouchableOpacity onPress={()=>setshowNFT(false)}>
                <Text style={{fontSize:20, fontWeight:'bold',color:'#9C27B0',fontFamily:'Roboto'}}>Close</Text>
              </TouchableOpacity>
              <View style={{marginLeft:100,alignItems:'center',alignSelf:'center',justifyContent:'space-between'}}>
              <TouchableOpacity style={{backgroundColor:'#1976D2', height:40, width:150, borderRadius:10,alignSelf:'center'}}>
              <Text style={{padding:10,textAlign:'center',fontWeight:'bold',fontFamily:'Roboto',color:'#fff', fontSize:15}}>
                SELECT
              </Text>
                </TouchableOpacity>
              </View>


            </View>

          </View>
        </View>

      </Modal>

          <View style={{flexDirection:'column'}}>
          <TextInput placeholder='Price' placeholderTextColor="grey" style={styles.textinput} onChangeText={onChangeToken} value={Token} />
          <Text style={{color: '#00000099',fontSize:12, fontFamily:'Roboto' , marginLeft:20, paddingTop:10}}>Average price of the NFT</Text>
          </View>

          <View style={{flexDirection:'row',marginTop:10,width:325, marginLeft: 10, marginRight: 25,borderColor: "black",borderRadius: 5,borderWidth: 1,justifyContent: "space-between"}}>
            <TextInput placeholder='Receiver DID' placeholderTextColor="grey"  onChangeText={onChangeRDID} value={RDID}  />
            <TouchableOpacity onPress={()=>setshowQR(true)}>
            <MaterialIcons name="qr-code-scanner" style={{padding:10,paddingTop:13,fontSize:20, color:"grey"}}/>
            </TouchableOpacity>
            </View>
            <Modal visible={showQR} transparent={true} onRequestClose={()=>{setshowQR(false)}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

          <View style={styles.qrcode}>
            <View style={{flexDirection:'row',alignSelf:'baseline'}}>
            <Text style={{fontWeight:'bold', fontSize:20, color:'black'}}>QR reader</Text>          
            </View>
            <View style={{padding:15}}>
            <TouchableOpacity style={{flexDirection:'row',backgroundColor:'#E0E0E0', height:75, width:240, borderRadius:10,alignSelf:'center'}}>
            <SimpleLineIcons name="camera" style={{marginTop:6,padding:10,fontSize:40, color:"#A6A6A6"}}/>
              <Text style={{includeFontPadding:true,marginRight:80,textAlignVertical:'center',padding:10,textAlign:'center',fontWeight:'bold',fontFamily:'Roboto',color:'#A6A6A6', fontSize:14}}>
             Scan QR code with camera   
              </Text>
                </TouchableOpacity>

            <TouchableOpacity onPress={chooseImage} style={{marginTop:10,flexDirection:'row',backgroundColor:'#9c27b0', height:75, width:240, borderRadius:10,alignSelf:'center'}}>
            <MaterialIcons name="qr-code-2" style={{marginTop:6,padding:10,fontSize:40, color:"white"}}/>
              <Text style={{includeFontPadding:true,marginRight:80,textAlignVertical:'center',padding:10,textAlign:'center',fontWeight:'bold',fontFamily:'Roboto',color:'#fff', fontSize:14}}>
                Open QR image on device
              </Text>
                </TouchableOpacity>

            </View>

         <TouchableOpacity onPress={()=>setshowQR(false)}>
                <Text style={{fontSize:15,color:'#9C27B0',fontFamily:'Roboto'}}>Cancel</Text>
              </TouchableOpacity>
              </View>
        </View>

      </Modal>

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
          {transactionList.slice(0,3).map((data,id) => (
            <TransactionCard key={id} data={data} />
            ))}
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
        <View style={{paddingBottom:75}}>
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
  qrcode: {
    margin: 10, 
    backgroundColor: "white", 
    borderRadius: 5, 
    padding: 25, 
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 25,
    flexDirection:'column',
    justifyContent:'space-evenly'
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