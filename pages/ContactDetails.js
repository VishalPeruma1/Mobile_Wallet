import React, {useState} from "react";

import {View,Text,TouchableOpacity,Image,TextInput,StyleSheet,Modal} from 'react-native';
import Clipboard from "@react-native-clipboard/clipboard";
import { Card, ListItem } from "react-native-elements";
import TransactionCard from './components/TransactionCard';
import { Dropdown } from 'react-native-element-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-simple-toast';
import { useIsFocused } from '@react-navigation/native';
import { ScrollView } from "react-native";
import { scale, ScaledSheet } from "react-native-size-matters";

const dropdownValues = [
  { label: '5', value: '5' },
  { label: '10', value: '10' },
  { label: '25', value: '25' },
  { label: 'All', value: 'All' }
];

const ContactDetails = ({navigation, route}) => {

    // const nickname = route.params.nickname;
    // const did = route.params.did;
    // const onlineStatus = route.params.onlineStatus;
    // const dp = route.params.dp;
    const [filt,setFilt]=React.useState(false);
    const [newDp,setnewDp] = React.useState(false)
    const [value, setValue] = useState(10);
    const[Img,setImg]=React.useState("");
    const[showImg,setshowImg]=React.useState(false);
    const [transactionList,setTransactionList] = React.useState([]);
    const [isFocus, setIsFocus] = useState(false);
    const isFocused = useIsFocused();
    const [prev,setPrev] = React.useState(true);
    const [first,setFirst] = React.useState(true);
    const [next,setNext] = React.useState(false);
    const [last,setLast] = React.useState(false);
    const [start,setStart] = React.useState(0);
    const [end,setEnd] = React.useState(10);
    const [txn,setTxn] = React.useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [transactionCount, setTransactionCount] = React.useState(10);
    const [transactions, setTransactions] = React.useState(false)
    const [status, setStatus] = React.useState("")
    const [transactionMessage, setTransactionMessage] = React.useState()
    const data = route.params.data;

    React.useEffect(()=>{
     getTxnByCount()
    if(end>transactionCount){
      setEnd(transactionCount)
    }
    else{
      setEnd(end)
    }
    if(transactionCount<=rowsPerPage){
      setPrev(true)
      setNext(true)
      setFirst(true)
      setLast(true)
    }
    else{
      setPrev(start!==0?false:true)
      setFirst(start!==0?false:true)
      setNext(end<transactionCount?false:true)
      setLast(end<transactionCount?false:true)
    }
    })


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
        if(response.status===200 && responseJson) {
          setTransactionCount(responseJson.data.count)
          if(responseJson.data.count <= 1 && responseJson.data.response[0].Message){
            setTransactions(true)
            setTransactionMessage(responseJson.data.response[0].Message)
          }
          else{
          setTxn(responseJson.data.response)
        }
        }
    } catch(error) {
      Toast.show(error,Toast.LONG);
    }
  }

    const getTxnByDID = async()=>{
      console.log("Getting Transactions Details")
      if(data.did && data.did.length === 46){
        let options = {
          method:"POST",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify ({ 
            did: data.did
          })
        }
        try {
      const response = await fetch('https://webwallet.knuct.com/capi/getTxnByDID',options);
      const responseJson = await response.json();
      // console.log(responseJson.data)
      console.log("TXN DID: ", responseJson.message)
      console.log("Boolean: ", responseJson.status)
      // console.log("Sender DID: ", responseJson.data.response.senderDID)
      setTransactionList(responseJson.data.response)
      // setTransactionMessage(responseJson.message)
      setStatus(responseJson.status)

        }
        catch(error){
          Toast.show(error,Toast.LONG);
        }


      }

    }
    const chooseImage = () =>{

        let options = {
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
            let pro_image = res.assets[0]
            if(pro_image.fileSize > 1000000){
              Toast.show("File size must be less than 1 MB",Toast.LONG)
            }
            else{
              setImg(pro_image)
              console.log("Success",pro_image.uri);
              setshowImg(true)
            }
          }
        })
      }
      
      const addDisplayPicture = async(did,dp) => {
        console.log("Replacing Display Picture")
        if (dp && dp.fileSize < 1048576 && did.length === 46) {
            console.log("Inside If")
            let formData = new FormData();
            formData.append('did', did);
            formData.append('dp', {
              uri:dp.uri,
              name:dp.fileName,
              type:dp.type,
          });
          console.log(dp.uri)
            let options = {
                method: "POST",
                headers: { 'Content-Type': 'multipart/form-data'},
                body: formData,     
            }
            try {
              const response = await fetch('https://webwallet.knuct.com/capi/addDp',options);
              const responseJson = await response.json();
              console.log("Add DP Response JSON: ", responseJson);
              if (responseJson.data.response === 'Added') {
                Toast.show(responseJson.data.response)
                console.log("DP Added")
                // setDid("")
                // setNickName("")
                // setDP(null)
               }
            }
            catch(error){
              console.log(error)
              Toast.show(error,Toast.LONG);
            }
          }
          else {
            if(did.length !==46){
              Toast.show("Wrong DID Format (DID length: 46)");
            }
            if(dp.fileSize > 1048576){
              Toast.show("File Size Large")
            }
          }
      }

    
    

    // const [copiedText, setCopiedText] = React.useState('')

    const copyToClipboard = () => {
        Clipboard.setString(data.did)

    }
    const generateColor = ({data}) => {
      try{
        var s_red = 1.75 * data.did.charAt(10).charCodeAt()
        var s_green =  1.2 * data.did.toString().charAt(20).charCodeAt() 
        var s_blue = data.did.toString().charAt(30).charCodeAt() 
        var s_contactColor = "rgb(" + String(s_red) + "," + String(s_green) + "," + String(s_blue) + ")"
        // console.log("CONTACT COLOR => ",s_contactColor)
        return s_contactColor
      }
  
      catch(error){
        console.log(error)
      }
  
    };
    // const fetchCopiedText = async () => {
    //     const text = await Clipboard.getString()
    //     setCopiedText(text)
    // }
    
    const display = () =>{
      return(
      <View style={{marginBottom:25}}>
      {
        
         txn.slice(start,end).map((d,id) =>(
          <TransactionCard key={id} data={d}/>
        )) 
      }
    </View>)
    }
  function First(){
    setStart(0)
    setFirst(true)
    setPrev(true)
    if(rowsPerPage<end){
      setEnd(rowsPerPage)
    }
  }

  function Prev(){
    if(start>0)
    {
      setStart(start-rowsPerPage)
      if(end-rowsPerPage<rowsPerPage){
        setEnd(rowsPerPage)
      }
      else{
        setEnd(end-rowsPerPage)
      }
    }
  }
  // function close(){

  //   setDid(false)
  //   setRange(false)
  //   setComment(false)
  //   setDate(false)
  // }

  function Next(){
    if(start<transactionCount && end<transactionCount){
      setStart(start+rowsPerPage)
      if(transactionCount>(end+rowsPerPage)){
        setEnd(end+rowsPerPage)
      }
      else{
        setEnd(transactionCount)
      }
    }
  }

  function Last(){
    let x = Math.floor(transactionCount/rowsPerPage)
    if(transactionCount%rowsPerPage===0){
      x=x-1
    }
    setStart(x*rowsPerPage)
    setEnd(transactionCount)
    setLast(true)
    setNext(true)
  }

    return(
      <ScrollView>
        <View>
            <Card containerStyle={{height:"auto", borderRadius:10}}>
                <View>
                    <TouchableOpacity onPress={()=>navigation.goBack(null)}>
                        <View style={{flexDirection:'row'}}>
                            <Ionicons name='arrow-back-outline' style={{color: '#1976D2',fontSize:20,marginTop:3}}/>
                            <Text style={{color: '#1976D2', fontSize:14, fontFamily:'Roboto', marginTop:3}}>BACK</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={()=>setnewDp(true)}> 
                <View style={{alignItems:"center",flexDirection:"column"}}>
                    {/* <FontAwesome5 name="user-circle" style={{textAlign:"center",fontWeight:50,color:'#1976D2',fontSize:185,marginTop:3}}/> */}
                    {data.dp===""?
                        <View style={{backgroundColor:generateColor({data}), borderRadius:100, width: 150, height:150, alignContent:"center", justifyContent:"center"}}>
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
                </TouchableOpacity>
                <Modal visible={newDp} transparent={true} onRequestClose={()=>{setnewDp(false)}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={styles.qrcode}>
                        <View style={{width:250,height:250}}>
                        {data.dp===""&&!showImg?
                        <View style={{flexDirection: 'column',height:250,width:250, alignContent:"center", justifyContent:"center",backgroundColor:"#FFF4E5"}}>
    
                            <Ionicons name='warning-outline' style={{color: 'rgb(255, 152, 0)',fontSize:55,marginLeft:100,marginTop:35}}/>
                        <Text style={{
                            fontSize: 18,
                            color: "#663C00",
                            marginLeft:45,
                            }}>
                            No Display Picture available ...!
                        </Text>
                        </View>
                        :showImg?                        
                        <Image source={{
                          uri:Img.uri
                        }}
                        style={{height:250,width:250}} 
                        />:
                        <Image source={{
                            uri:`data:image/jpg;base64,${JSON.parse(data.dp).base64}`
                        }}
                        style={{height:250,width:250}} 
                        />
                    }
                                  
            </View>
            
            <View style={{marginTop:15,marginBottom:15,flexDirection:'row'}}>
                <TouchableOpacity onPress={chooseImage}>
                <MaterialCommunityIcons name="camera" style={{marginTop:6,padding:10,fontSize:30, color:"#1976D2"}}/>
                 
                </TouchableOpacity>
            <TouchableOpacity onPress={()=>{addDisplayPicture(data.did,Img)}}>
                <Text style={{fontSize:15,color:'#1976D2',fontFamily:'Roboto',marginTop:6,padding:10,}}>CONFIRM</Text>
              </TouchableOpacity>

            <TouchableOpacity onPress={()=>setnewDp(false)}>
                <Text style={{fontSize:15,color:'#D32F2F',fontFamily:'Roboto',marginTop:6,padding:10,}}>CANCEL</Text>
              </TouchableOpacity>


            </View>
            


                        </View>
                </View>
                
                </Modal>

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
                <TouchableOpacity onPress={() => navigation.navigate('Transactions')} style={{marginLeft:25, height:35, width:300 ,marginTop:15, borderRadius:10}}>
                    <View style={{flexDirection:"row"}}>
                    <Text style={{textAlign:"center",fontWeight:'bold',marginLeft:55,marginRight:12,fontFamily:'Roboto',color:'#1976D2', fontSize:17}}>
                    TRANSFER TOKENS
                    </Text>
                    <Ionicons name='send' style={{fontSize:20,textAlign:"center",marginTop:1, color:'#1976D2'}}/>

                    </View>
    
                </TouchableOpacity>
                
                </View>
            </Card>

            <Card containerStyle={{ height:"auto", bottom:7, borderRadius:10}}>
<View>

<View>{display()}</View>

            <View style={styles.transistions}>
              <Dropdown 
                style={[styles.dropdown, isFocus && { borderColor: 'black' }]}
                placeholderStyle={styles.placeholderStyle}
                itemTextStyle={{textColor:"black"}}
                textColor="black"
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemContainerStyle={{color:"black"}}
                iconColor="black"
                dropdownTextStyles={{color:"black"}}
                iconStyle={styles.iconStyle}
                data={dropdownValues}
                labelField="label"
                valueField="value"
                // searchPlaceholder="Search..."
                placeholder='10'
                value={value}
                baseColor="black"
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setStart(0)
                  setValue(item.value);
                  if(item.value==="All"){
                    setRowsPerPage(transactionCount)
                    setEnd(transactionCount)
                  }
                  else{
                    setRowsPerPage(Number(item.value));
                    if(Number(item.value)>transactionCount){
                      setEnd(transactionCount)
                    }
                    else{
                      setEnd(Number(item.value));
                    }
                  }
                  setIsFocus(false);}}>
              </Dropdown> 
              <Text style={{color:"black",fontSize:15}}>
                {start+1}-{end} of {transactionCount}
                </Text>
              <View style={{flexDirection:"row"}}>
                <TouchableOpacity onPress={()=>{First()}}>
                  <AntDesign name="verticleright" style={[styles.nextIcon,{color:first?"grey":"black"}]}/>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>{Prev()}}>
                    <AntDesign name="left" style={[styles.nextIcon,{color:prev?"grey":"black"}]}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{Next()}}>
                    <AntDesign name="right" style={[styles.nextIcon,{color:next?"grey":"black"}]}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{Last()}}>
                      <AntDesign name="verticleleft" style={[styles.nextIcon,{color:last?"grey":"black"}]}/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
            </Card>
        </View>
    </ScrollView>
    );
};
const styles = ScaledSheet.create({ 
  transactionView:{
    flexDirection:'column', 
    flexWrap:"wrap", 
    justifyContent:"space-evenly"
  },
  transactionView2:{
    display:"flex",
    flexDirection:"column"
  },
  date:{
    color:"rgba(0, 0, 0, 0.38)", 
    fontSize:"14@s"
  },
  transistions:{
    flexDirection:"row", 
    justifyContent:'space-between',
    alignItems:'center',
    alignContent:'center', 
    marginTop:'10@s'},
    date:{
      color: "black",
      height: "auto",
      width: '280@s', 
      marginTop: '10@s',
      padding:'10@s',
      borderWidth: '1@s',
      borderRadius: '5@s',
      marginBottom: '5@s', 
  },
  nextIcon:{
    marginTop:'6@s',
    padding:'10@s',
    fontSize:'20@s', 
    color:"#A6A6A6"
  },
  dropdown: {
    height: '30@s',
    width:'65@s',
    paddingHorizontal: '8@s',
    color:"black",
  },
  placeholderStyle: {
    fontSize: '16@s',
    color:"black"
  },
  selectedTextStyle: {
    fontSize: '16@s',
    color:"black"
  },
  iconStyle: {
    width: '20@s',
    height: '20@s',
  },
  inputSearchStyle: {
    height: '40@s',
    fontSize: '16@s',
  },
})


export default ContactDetails;