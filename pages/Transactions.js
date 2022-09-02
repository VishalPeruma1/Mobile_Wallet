import React, { useEffect } from 'react';
import {
  ScrollView,
  Text, 
  TouchableOpacity,
  View,
  TextInput,
  Modal
} from 'react-native';
import OwnedNFT from './components/OwnedNFT';
import TransactionCard from './components/TransactionCard';
import NftTransactionCard from './components/NftTransactionCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card } from "react-native-elements";
import Toast from 'react-native-simple-toast';
import { useIsFocused } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { scale, ScaledSheet } from 'react-native-size-matters';

 const Transactions = ({navigation}) => {
    const [type,setType] = React.useState("Token");
    const [Token, onChangeToken] = React.useState("");
    const [RDID, onChangeRDID] = React.useState("");
    const [com, onChangecom] = React.useState("");
    const [showNFT, setshowNFT] = React.useState(false);
    const [showQR, setshowQR] = React.useState(false);
    const [transactionList,setTransactionList] = React.useState([]);
    const [transactionCount, setTransactionCount] = React.useState([]);
    const [tokensList,setTokensList] = React.useState([])
    const isFocused = useIsFocused();
    const [transactions, setTransactions] = React.useState(false)
    const [transactionMessage, setTransactionMessage] = React.useState("")
    const [tokenCount, setTokenCount] = React.useState()
    const [recentNftTransaction, setRecentNftTransaction] = React.useState([])
    const [ownedNft, setOwnedNft] = React.useState([]);
    const [own, setOwn] = React.useState(false);
    const [ownedNftTokens, setOwnedNftTokens] = React.useState([]);
    const [nftTransactionMessage, setNftTransactionMessage] = React.useState("")

    React.useEffect(()=> {
      getTxnByCount()
      viewTokens()
      getNftTxnByCount()
      getMyAssets()
      }, [isFocused])
      
    const getMyAssets = async () => {
      try{
        const response = await fetch('https://webwallet.knuct.com/capi/getMyAssets');
        const responseJson = await response.json();
        setOwnedNft(responseJson.data.response);
        setOwn(true);
        setOwnedNftTokens(responseJson.data.count)
        console.log(responseJson.data.response[0].description);
      }
      catch(error){        
        Toast.show(error,Toast.LONG);
      }
    }

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
          const response = await fetch('https://webwallet.knuct.com/capi/getTxnByCount',options);
          const responseJson = await response.json();
          console.log("Response JSON: ", responseJson)
          console.log("TXN Count: ", responseJson.data.count)
          if(response.status===200 && responseJson) {
            setTransactionCount(responseJson.data.count)
            if(responseJson.data.count <= 1 && responseJson.data.response[0].Message){
              setTransactions(true)
              setTransactionMessage(responseJson.data.response[0].Message)
            }
            else{
            setTransactionList(responseJson.data.response)
          }
          }
      } catch(error) {
        Toast.show(error,Toast.LONG);
      }
    } 

    const getNftTxnByCount = async()=>{
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
          const response = await fetch('https://webwallet.knuct.com/capi/getNftTxnByCount',options);
          const responseJson = await response.json();
          console.log("NFT Transaction Response JSON: ", responseJson)
          console.log("NFT Transaction Data: ", responseJson.data)
          console.log("NFT Transaction Response: ", responseJson.data.response)
          console.log("Date: ", responseJson.data.response[0].Date)
          console.log("Message: ", responseJson.data.response[0].Message)
          setNftTransactionMessage(responseJson.data.response[0].Message)
          setRecentNftTransaction(responseJson.data.response)
      } catch(error) {
        Toast.show(error,Toast.LONG);
      }
    } 

    const viewTokens = async()=> {
      try {
        const response = await fetch('https://webwallet.knuct.com/capi/viewTokens');
        const responseJson = await response.json();
        if(response.status===200){
          console.log("Tokens: ",responseJson.data.response)
          console.log("Tokens message: ", responseJson.message )
          console.log("Token count: ", responseJson.data.count)
          setTokenCount(responseJson.data.count)
          setTokensList(responseJson.data.response)
        }
      } catch(error){
        Toast.show(error,Toast.LONG);
      }
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

    const types = [{displayname:"TOKEN",navName:"Token",icon:<MaterialCommunityIcons name="view-dashboard-outline" style={{color:(type==="Token"?"#1976D2":"#808080"), fontSize:scale(22)}}/>},
    {displayname:"NFT",navName:"Nft",icon:<MaterialCommunityIcons name="cube-scan" style={{color:(type==="Nft"?"#1976D2":"#808080"), fontSize:scale(22)}}/>}]

    const TabScreen = ({data})=>{
      return(
          <TouchableOpacity style={styles.tabScreenTouchable} onPress={()=>setType(data.navName)}>
          <View style={styles.tabView}>
              {data.icon}
              <Text style={{color:(type===data.navName?"#1976D2":"#808080"), fontSize:scale(20)}} >{data.displayname}</Text>
          </View>
          </TouchableOpacity>
      )
    }

    const token = ()=> {
      return(
        <Card containerStyle={styles.card}>
            <View style={{flexDirection:'column'}}>
              <Text style={styles.transferHeading}>Transfer Tokens</Text>
  
              <Text style={styles.transferSubheading}>Send Tokens to a receiver</Text>
            </View>
            <View style={{flexDirection:'column'}}>
            <TextInput placeholder='Tokens' placeholderTextColor="grey" style={styles.textInput} onChangeText={onChangeToken} value={Token} />
            <Text style={styles.transferTokenText}>Number of tokens to transfer</Text>
            </View>
            <View style={styles.receiverDIDTextView}>
            <TextInput placeholder='Receiver DID' placeholderTextColor="grey"  onChangeText={onChangeRDID} value={RDID}  />
            <TouchableOpacity onPress={()=>setshowQR(true)}>
            <MaterialIcons name="qr-code-scanner" style={styles.qrCodeIcon}/>
            </TouchableOpacity>
            <Modal visible={showQR} transparent={true} onRequestClose={()=>{setshowQR(false)}}>
        <View style={styles.popUpView}>
          <View style={styles.qrCode}>
            <View style={{flexDirection:'row',alignSelf:'baseline'}}>
            <Text style={styles.popUpHeadingText}>QR reader</Text>          
            </View>
            <View style={{padding:scale(15)}}>
            <TouchableOpacity style={styles.qrButton1}>
            <SimpleLineIcons name="camera" style={styles.qrCamera}/>
              <Text style={[styles.qrCodeButtonText, {color:'#A6A6A6'}]}>
             Scan QR code with camera   
              </Text>
                </TouchableOpacity>
            <TouchableOpacity onPress={chooseImage} style={styles.qrCodeButton2}>
            <MaterialIcons name="qr-code-2" style={styles.qrCodeIcon2}/>
              <Text style={[styles.qrCodeButtonText, {color:'#fff'}]}>
                Open QR image on device
              </Text>
                </TouchableOpacity>
            </View>
         <TouchableOpacity onPress={()=>setshowQR(false)}>
                <Text style={styles.qrCancel}>Cancel</Text>
              </TouchableOpacity>
              </View>
        </View>
      </Modal>
      </View>
            <View style={{flexDirection:'row'}}>
            <TextInput placeholder='Comment (Optional)' placeholderTextColor="grey" style={styles.textInput} onChangeText={onChangecom} value={com}  />
              </View>
              <TouchableOpacity style={styles.transferButton}>
                <View style={{flexDirection:'row'}} >
                <Ionicons name='send-outline' style={styles.transferIcon}/>
                <Text style={styles.transferButtonText}>
                  Transfer
                </Text>
                </View>  
              </TouchableOpacity>
          </Card>
      )
  }

  const Nft = ()=>{
    return(
      <Card containerStyle={styles.card}>
          <View style={{flexDirection:'column'}}>
            <Text style={styles.transferHeading}>Transfer NFT</Text>
            <Text style={styles.transferSubheading}>Send NFT to a receiver</Text>
          </View>
          <TouchableOpacity onPress={()=>setshowNFT(true)} style={styles.chooseNftButton}>
          <View style={{padding:scale(9)}}>
            <Text style={{color:'#0000008A',fontSize:scale(13)}}>
              CHOOSE NFT
            </Text>
            <Text style={{color:'#0000008A',fontSize:scale(12),alignSelf:'center'}}>
              to send
            </Text>
          </View>
          </TouchableOpacity>
          <Modal visible={showNFT} transparent={true} onRequestClose={()=>{setshowNFT(false)}}>
        <View style={styles.popUpView}>
          <View style={styles.qrCode}>
            <View style={{flexDirection:'row',alignSelf:'baseline'}}>
            <Text style={styles.popUpHeadingText}>Choose NFT to transfer</Text>
            <FontAwesome name="refresh" style={styles.refreshIcon} />
            </View>
            <View style={{padding:scale(15)}}>
            <Text style={styles.noNftText}>You don't have any NFT</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <TouchableOpacity onPress={()=>setshowNFT(false)}>
                <Text style={styles.nftCloseText}>Close</Text>
              </TouchableOpacity>
              <View style={styles.nftSelectButtonView}>
                <TouchableOpacity style={styles.nftSelectButton}>
                  <Text style={styles.nftSelectText}>
                    SELECT
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
          <View style={{flexDirection:'column'}}>
          <TextInput placeholder='Price' placeholderTextColor="grey" style={styles.textInput} onChangeText={onChangeToken} value={Token} />
          <Text style={styles.nftPriceText}>Agreed price of the NFT</Text>
          </View>
          <View style={styles.receiverDIDTextView}>
            <TextInput placeholder='Receiver DID' placeholderTextColor="grey"  onChangeText={onChangeRDID} value={RDID}  />
            <TouchableOpacity onPress={()=>setshowQR(true)}>
            <MaterialIcons name="qr-code-scanner" style={styles.qrCodeIcon}/>
            </TouchableOpacity>
          </View>
            <Modal visible={showQR} transparent={true} onRequestClose={()=>{setshowQR(false)}}>
        <View style={styles.popUpView}>
          <View style={styles.qrCode}>
            <View style={{flexDirection:'row',alignSelf:'baseline'}}>
            <Text style={styles.popUpHeadingText}>QR reader</Text>          
            </View>
            <View style={{padding:scale(15)}}>
            <TouchableOpacity style={styles.qrButton1}>
            <SimpleLineIcons name="camera" style={styles.qrCamera}/>
              <Text style={[styles.qrCodeButtonText, {color:'#A6A6A6'}]}>
             Scan QR code with camera   
              </Text>
                </TouchableOpacity>
            <TouchableOpacity onPress={chooseImage} style={styles.qrCodeButton2}>
            <MaterialIcons name="qr-code-2" style={styles.qrCodeIcon2}/>
              <Text style={[styles.qrCodeButtonText, {color:'#fff'}]}>
                Open QR image on device
              </Text>
                </TouchableOpacity>
            </View>
         <TouchableOpacity onPress={()=>setshowQR(false)}>
                <Text style={styles.qrCancel}>Cancel</Text>
              </TouchableOpacity>
              </View>
        </View>
      </Modal>
          <View style={{flexDirection:'row'}}>
          <TextInput placeholder='Comment (Optional)' placeholderTextColor="grey" style={styles.textInput} onChangeText={onChangecom} value={com}  />
            </View>
            <TouchableOpacity style={styles.transferButton}>
              <View style={{flexDirection:'row'}} >
              <Ionicons name='send-outline' style={styles.transferIcon}/>              
              <Text style={styles.transferButtonText}>
                Transfer
              </Text>
              </View>
            </TouchableOpacity>          
        </Card>
    )
} 
    return (
        <ScrollView style={styles.content}>
          <View style={styles.selectionBar}>
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
        <Card containerStyle={styles.card}>
        <View style={{flexDirection:'row'}}>
          <Text style={styles.recentTransactionHeading}>Recent Transcations</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Recent Transactions",{"transactionList":transactionList,"transactions":transactions,"transactionCount":transactionCount})}>            
            <Text style={styles.recentTransactionView}> VIEW ALL</Text>
          </TouchableOpacity>
        </View>
        {
          (!transactions)?
            transactionList.slice(0,3).map((data) => (
            <TransactionCard data={data} />
            ))
            :
            <View>
              <Text style={styles.recentTransactionMessage}>{transactionMessage}</Text>
            </View>
        }
        </Card>
        <Card containerStyle={styles.card}>
        <View style={{flexDirection:'row'}}>
          <Text style={styles.recentTransactionHeading}>Recent NFT Transcations</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('Recent NFT Transactions')}>
            <Text style={styles.recentNftTransactionView}> VIEW ALL</Text>
          </TouchableOpacity>
          </View>
        <View style={{flexDirection:"column"}}>
        {
          ((Object.values(recentNftTransaction).length >= 1) && (nftTransactionMessage != "No transactions made yet"))?
            recentNftTransaction.slice(0,3).map((data) => (
            <NftTransactionCard data={data} />
            ))
            :
            <Text style={styles.recentTransactionMessage}>{nftTransactionMessage}</Text>
        }
        </View>
          </Card>
          </View>
       <View style={{paddingBottom:scale(70)}}>
        <Card containerStyle={styles.tokenCard}>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.tokenHeading}>Tokens</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Tokens Page')}>
              <Text style={styles.tokenView}> VIEW ALL</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.tokenCount}>
            {tokenCount} total
          </Text>
          {
            (Object.values(tokensList).length !== 0) ?
              tokensList.slice(0,5).map((item,id) => (
                <View style={{flexDirection:"row", paddingBottom:5}}>
                  <MaterialCommunityIcons name="cube-outline" color="#1976D2" size={scale(17)} style={{paddingRight:scale(5)}}/>
                  <Text key={id} style={styles.tokenItem} >{item}</Text>
                </View>
              ))
              :
              <View>
              <Text style={styles.noTokens}>No tokens in this account</Text>
              </View>
          }
          {
            (tokenCount > 5) ?
            <View>
              <Text style={styles.remainingTokens}>
                {tokenCount - 5} more
              </Text>
            </View>
            :
            <View/>
          }
        </Card>
        <Card containerStyle={styles.card}>
        <View style={{flexDirection:'row'}}>
          <Text style={styles.recentTransactionHeading}>Owned NFTs</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('Recent NFT Transactions')}>
            <Text style={styles.OwnedNftView}> VIEW ALL</Text>
          </TouchableOpacity>
          </View>
          <Text style={styles.tokenCount}>
            {ownedNftTokens} total
          </Text>
          {
          (own)?
            ownedNft.map((data) => (
            <OwnedNFT data={data} />
            ))
            :
            <View>
             <Text style={styles.noTokens}>No tokens in this account</Text>
             </View>
        }
        </Card>
        
        </View>
            </ScrollView>
    );
 };
 
 const styles = ScaledSheet.create({
    tabScreenTouchable:{
      height:'70@s', 
      alignItems:"center",
      justifyContent:"center"
    },
    tabView:{
      flexDirection:'row',
      alignItems:"center", 
      justifyContent:"center"
    },
    content:{
      color:'black',
      flex:2 ,
      textAlign:'center',
      marginTop: '24@s',
    },
    selectionBar:{
      width:'330@s',
      marginLeft:'14@s', 
      borderRadius:'10@s',
      flexDirection:'row', 
      backgroundColor:'white',
      paddingTop:'4@s',
      alignItems:'center',
      justifyContent:'space-around'
    },
   textInput:{
    color: "black",
    height: '38@s',
    width: '301@s',
    marginTop: '23@s',
    marginLeft:'0@s',
    padding: '8@s',
    borderWidth: '1@s', 
    borderRadius: '5@s',
  },
  qrCode: {
    margin: '10@s', 
    backgroundColor: "white", 
    borderRadius: '5@s',
    paddingTop:'18@s', 
    paddingLeft: '14@s',
    paddingRight:'10@s', 
    paddingBottom:'20@s',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: '0@s',
      height: '2@s'
    },
    shadowOpacity: '0.25@s',
    shadowRadius: '4@s',
    elevation: '25@s',
    flexDirection:'column',
    justifyContent:'space-evenly'
  },
  transferHeading:{
    color: '#000000DE', 
    fontWeight:'bold', 
    fontSize:'18@s', 
    fontFamily:'Roboto' , 
    marginLeft:'3@s', 
    paddingTop:'9@s'
  },
  transferSubheading:{
    color: '#000000DE', 
    fontSize:'11@s', 
    fontFamily:'Roboto', 
    marginLeft:'4@s', 
    paddingTop:'2@s'
  },
  transferTokenText:{
    color: '#00000099',
    fontSize:'11@s', 
    fontFamily:'Roboto' , 
    marginLeft:'13@s', 
    paddingTop:'0@s'
  },
  receiverDIDTextView:{
    flexDirection:'row',
    marginTop:'14@s',
    width:'301.25@s', 
    marginLeft:'0@s', 
    marginRight: '25@s',
    borderColor: "black",
    borderRadius: '5@s',
    borderWidth: '1@s',
    justifyContent: "space-between"
  },
  qrCodeIcon:{
    padding:'9@s',
    paddingTop:'11@s',
    fontSize:'20@s', 
    color:"grey"
  },
  popUpView:{
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  popUpHeadingText:{
    fontWeight:'bold', 
    fontSize:'18@s', 
    color:'black'
  },
  noNftText:{
    fontWeight:'bold', 
    fontSize:'14@s', 
    color:'#00000061'
  },
  nftCloseText:{
    fontSize:'18@s',
    marginTop:'6@s', 
    fontWeight:'bold',
    color:'#9C27B0',
    fontFamily:'Roboto'
  },
  qrButton1:{
    flexDirection:'row',
    backgroundColor:'#E0E0E0', 
    height:'70@s', 
    width:'220@s', 
    borderRadius:'9@s',
    alignSelf:'center'
  },
  qrCamera:{
    marginTop:'6@s',
    padding:'10@s',
    fontSize:'38@s', 
    color:"#A6A6A6"
  },
  qrCodeButton2:{
    marginTop:'10@s',
    flexDirection:'row',
    backgroundColor:'#9c27b0', 
    height:'70@s', 
    width:'220@s', 
    borderRadius:'9@s',
    alignSelf:'center'
  },
  qrCodeIcon2:{
    marginTop:'6@s',
    padding:'10@s',
    fontSize:'38@s', 
    color:"white"
  },
  qrCodeButtonText:{
    includeFontPadding:true,
    marginRight:'80@s',
    textAlignVertical:'center',
    padding:'9@s',
    textAlign:'center',
    fontWeight:'bold',
    fontFamily:'Roboto',
    color:'#A6A6A6', 
    fontSize:'13@s'
  },
  qrCancel:{
    fontSize:'14@s',
    color:'#9C27B0',
    fontFamily:'Roboto'
  },
  nftSelectButtonView:{
    marginLeft:'95@s',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'space-between'
  },
  nftSelectButton:{
    backgroundColor:'#1976D2', 
    height:'38@s', 
    width:'135@s', 
    borderRadius:'10@s',
    alignSelf:'center'
  },
  nftSelectText:{
    padding:'9@s',
    textAlign:'center',
    fontWeight:'bold',
    fontFamily:'Roboto',
    color:'#fff', 
    fontSize:'14@s'
  },
  refreshIcon:{
    marginLeft:'60@s',
    fontSize:'18@s', 
    fontWeight:"bold", 
    color:"grey",
    transform: [{rotate: '90deg'}]
  },
  transferButton:{
    marginLeft:'15@s' ,
    backgroundColor:'#1962D2', 
    height:'45@s', 
    width:'272@s' ,
    marginTop:'23@s', 
    borderRadius:'9@s'
  },
  transferIcon:{ 
    color:'#fff', 
    fontSize:'13@s',
    marginLeft:'90@s', 
    marginTop:'14.5@s'
  },
  transferButtonText:{
    fontWeight:'bold',
    fontFamily:'Roboto',
    color:'#fff', 
    fontSize:'14@s',
    marginLeft:'10@s', 
    marginTop:'11@s'
  },
  chooseNftButton:{
    borderColor:'#0000008A',
    marginTop:'10@s', 
    width:'301.25@s',
    alignItems:'center',
    justifyContent:'space-around', 
    borderRadius: '5@s',
    borderWidth: '1@s'
  },
  card:{
    width:'330@s',
    height:"auto",
    borderRadius:'10@s', 
    backgroundColor:"white", 
    borderColor:"white"
  },
  recentTransactionHeading:{
    fontWeight:'bold',
    fontFamily:'Roboto',
    color:'#000000DE', 
    fontSize:'19@s'
  },
  recentNftTransactionView:{
    fontSize:'13@s',
    marginLeft:'22@s',
    color:'#1976D2',
    marginTop:'5@s'
  },
  OwnedNftView:{
    fontSize:'13@s',
    marginLeft:'125@s',
    color:'#1976D2',
    marginTop:'5@s'
  },
  recentTransactionView:{
    fontSize:'13@s',
    marginLeft:'63@s',
    color:'#1976D2',
    marginTop:'5@s'
  },
  recentTransactionMessage:{
    fontSize:'18@s', 
    color:"rgba(0, 0, 0, 0.38)", 
    textAlign:"center", 
    marginTop:'19@s'
  },
  tokenCard:{
    width:'330@s', 
    height:"auto", 
    borderRadius:'10@s', 
    backgroundColor:"white", 
    borderColor:"white"
  },
  tokenHeading:{
    fontWeight:'bold',
    fontFamily:'Roboto',
    color:'#000000DE', 
    fontSize:'19@s'
  },
  tokenView:{
    fontSize:'12.5@s',
    marginLeft:'180@s',
    color:'#1976D2',
    marginTop:'6@s'
  },
  tokenCount:{
    marginLeft:'5@s', 
    color: '#000000DE',
    fontSize:'13@s', 
    fontFamily:'Roboto' ,
    paddingTop:'6@s',
    paddingBottom:'8@s'
  },
  tokenItem:{
    color:"black", 
    fontSize:'14@s', 
    bottom:'4@s', 
    paddingRight:'15@s'
  },
  noTokens:{
    fontSize:'18@s', 
    color:"rgba(0, 0, 0, 0.38)", 
    textAlign:"center"
  },
  remainingTokens:{
    color:"rgba(0, 0, 0, 0.38)", 
    fontSize:'14@s', 
    textAlign:"right"
  },
  nftPriceText:{
    color:'#00000099',
    fontSize:'11@s', 
    fontFamily:'Roboto', 
    marginLeft:'14@s', 
    paddingTop:'0@s', 
    paddingBottom:'5@s'
  }
    
  });
export default Transactions;