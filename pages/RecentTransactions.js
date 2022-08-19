import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text, 
  TouchableOpacity,
  View,Modal,Button,
  TextInput
} from 'react-native';
import { Card } from "react-native-elements";
import { Dropdown } from 'react-native-element-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {scale,ScaledSheet} from 'react-native-size-matters';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const data = [
  { label: '5', value: '5' },
  { label: '10', value: '10' },
  { label: '25', value: '25' },
  { label: 'All', value: 'All' }
];
 
const dateToSTring = (d) => {
  var date = d.toString().split(' ')
  date = date[0] + ' ' + date[1] + ' ' + date[2] + ' ' + date[4] + ' ' + d.toUTCString().split(" ").pop() + ' ' + date[3]
  console.log(date)
  return date
}

const RecentTransactions = ({navigation,route}) => {
    const [filt,setFilt]=React.useState(false);
    const [value, setValue] = useState(10);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [isFocus, setIsFocus] = useState(false);
    const [txn,setTxn] = React.useState([]);
    const [sdate,setSdate] = useState(dateToSTring(new Date()));
    const [edate,setEdate] = useState(dateToSTring(new Date()));
    const [srange,setSrange] = useState(null);
    const [erange,setErange] = useState(null);
    const [prev,setPrev] = React.useState(true);
    const [first,setFirst] = React.useState(true);
    const [next,setNext] = React.useState(false);
    const [last,setLast] = React.useState(false);
    // const transactionList = route.params.transactionList;
    // const transactions = route.params.transactions;
    // const transactionCount = route.params.transactionCount;
    const [start,setStart] = React.useState(0);
    const [end,setEnd] = React.useState(10);
    const [text_did,setText_did] = useState(null);
    const [comt,setComt] = useState(null);    
    const [transactionMessage, setTransactionMessage] = React.useState("")
    const [tokenCount, setTokenCount] = React.useState()
    const [transactions, setTransactions] = React.useState(false)
    const [did,setDid] = React.useState(false);
    const [def,setDef] = React.useState(true);
    const [range,setRange] = React.useState(false);
    const [comment,setComment] = React.useState(false);
    const [transactionCount, setTransactionCount] = React.useState(10);
    const [date,setDate] = React.useState(false);
    const [start_date,setStart_date] = React.useState(new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString());    
    const [end_date,setEnd_date] = React.useState(new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dateEnd,setDateEnd]=useState(false);
    
    React.useEffect(()=>{
      if(!filt){
        getTxnByCount()
      }
      if(end>transactionCount){
        setEnd(transactionCount)
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

    const endDate = async(ed) =>{
      let datetmp = new Date(ed);
      const milliseconds = Date.UTC(
        datetmp.getFullYear(),
        datetmp.getMonth(),
        datetmp.getDate(),
        datetmp.getHours(),
        datetmp.getMinutes(),
        datetmp.getSeconds(),
      );
      const localTime = new Date(milliseconds);
      setEnd_date(localTime.toLocaleDateString()+" "+localTime.toLocaleTimeString())
      console.log(dateToSTring(localTime));
      setEdate(dateToSTring(localTime))
      setDateEnd(false);
    };

    const startDate = async(sd) => {
      let datetmp = new Date(sd);
      const milliseconds = Date.UTC(
        datetmp.getFullYear(),
        datetmp.getMonth(),
        datetmp.getDate(),
        datetmp.getHours(),
        datetmp.getMinutes(),
        datetmp.getSeconds(),
      );
      const localTime = new Date(milliseconds);
      setStart_date(localTime.toLocaleDateString()+" "+localTime.toLocaleTimeString())
      console.log(dateToSTring(localTime))
      setSdate(dateToSTring(localTime))
      setDatePickerVisibility(false);
    };

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
          // console.log("Response JSON: ", responseJson)
          // console.log("TXN Count: ", responseJson.data.count)
          // console.log("Response message: ", responseJson.data.response)
          // console.log("Response Message Value: ",responseJson.data.response[0].Message)
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


    const getTxnByDID = async(d)=>{
      console.log("Getting Transactions Details")
      if(d && d.length === 46){
        let options = {
          method:"POST",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify ({ 
            did: d
          })
        }
        try {
          const response = await fetch('https://webwallet.knuct.com/capi/getTxnByDID',options);
          const responseJson = await response.json();          
          setTransactionCount(responseJson.data.count)
          console.log(responseJson.data.count)
          setTxn(responseJson.data.response)
        }
        catch(error){
          Toast.show(error,Toast.LONG);
        }


      }

    }
    const getTxnByDate = async(_sdate,_edate)=>{
      console.log("Getting Transactions by Date")
      if(_sdate && _edate)
      {
        let options = {
          method:"POST",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify ({ 
            sDate: _sdate,
            eDate: _edate
          })
        }
        try{
          const response = await fetch('https://webwallet.knuct.com/capi/getTxnByDate',options);
          const responseJson = await response.json();
          // console.log(responseJson) 
          if(responseJson.status){       
            setTransactionCount(responseJson.data.count)
            setTxn(responseJson.data.response);
            console.log(responseJson);
          }
        }
        catch(error)
        {
          Toast.show(error,Toast.Long)
        }
      }

    }
    const getTxnByComment = async(cmt)=>{
      console.log("Getting Transactions by comment")
      if(cmt)
      {console.log("Inside comment if")
        let options = {
          method:"POST",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify ({ 
            comment: cmt
          })
        }
        try{
          const response = await fetch('https://webwallet.knuct.com/capi/getTxnByComment',options);
          const responseJson = await response.json();
          setTxn(responseJson.data.response);
          setTransactionCount(responseJson.data.count)
          // console.log(txn);

        }
        catch(error){
          Toast.show(error,Toast.Long)
        }
      }
      
    }
    const display = () =>{
      return(
      <View style={{marginBottom:25}}>
      {
        
         txn.slice(0,txn.count).map((d,id) =>(
          <TransactionCard key={id} data={d}/>
        )) 
      }
    </View>)
    }
    

  const TransactionCard = ({data})=>{
    const [trans, setTrans] = React.useState(false);
      const [quoroums,setQuoroums] = React.useState(false);
      const QList = data.quorumList;
    return(
      <View>
      <TouchableOpacity onPress={() => { setTrans(true) }}>
        <Card containerStyle={{marginLeft:10, marginRight:10,backgroundColor:"white",padding:5, paddingLeft:12,elevation:5}} wrapperStyle={{width:200}}>
          <View style={{flexDirection:'column', flexWrap:"wrap", justifyContent:"space-evenly"}}>
          <View style={{display:"flex",flexDirection:"column"}}>
            {data.role==="Receiver"?
              <Text style={{color:"rgb(45, 201, 55)",fontSize:18, paddingBottom:6}}>+ {JSON.stringify(Object.keys(data.tokens).length)} KNCT</Text>
            :          
              <Text style={{color:"#cc3232", fontSize:18, paddingBottom:6}}>- {JSON.stringify(Object.keys(data.tokens).length)} KNCT</Text>
            }
            <Text style={{fontSize:14,color:"black", width:295}}>{data.role==="Receiver" ? data.senderDID : data.receiverDID}</Text>
            <Text style={{fontSize:14, color:"grey"}}>{data.Date}</Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
      <Modal visible={trans} transparent={true} hasBackdrop={true} onRequestClose={() => {setTrans(false)} }>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',marginRight:20,marginLeft:20}}>
              <View style={styles.qrcode}>
                <View style={{ flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row', alignSelf: 'baseline' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'black' }}>Knuct Transaction</Text>
                <TouchableOpacity style={{paddingLeft:150}} onPress={() => setTrans(false)}>
                  <Entypo name="cross" style={{color:"black",fontSize:25}}/> 
                </TouchableOpacity> 
                </View>
                <Text style={{ paddingTop:5,fontSize: 14, color: "grey" }}>{data.Date}</Text>
                </View>
                <View style={{ padding: 15 }}>
                {data.role === "Receiver" ? <Text style={{ fontSize: 18, color: "grey" }}>From</Text> : <Text style={{ fontSize: 14, color: "grey" }}>To</Text>}
                <Text style={{ padding:5,fontSize: 14, color: "black", width: 295 }}>{data.role === "Receiver" ? data.senderDID : data.receiverDID}</Text>
                {data.role === "Receiver" ?
                  <Text style={{ color: "green", fontSize: 20, paddingTop: 6 }}>{JSON.stringify(Object.keys(data.tokens).length)} KNCT</Text>
                  :
                  <Text style={{ color: "#CC3232", fontSize: 20, paddingTop: 6 }}> {JSON.stringify(Object.keys(data.tokens).length)} KNCT</Text>}
              
                <View style={{padding:5}}>

                <Text style={{ paddingLeft:6,borderRadius:10,width:data.comment.length*12,backgroundColor:"#00000014",fontSize: 18, color: 'black' }}>{data.comment}</Text>
              
                </View>
                <Text style={{  marginTop:10,fontSize: 18, color: 'black' }}>Transaction ID:</Text>
                <Text style={{  fontSize: 15, color: 'black' }}>{data.txn}</Text>

                <TouchableOpacity onPress={() => setQuoroums(true)} style={{marginTop:15}}>
                  <Text style={{color:"#1976D2"}}>
                    VIEW 15 QUORUMS
                  </Text>
                </TouchableOpacity>
                <Modal visible={quoroums} transparent={true} onRequestClose={() => { setQuoroums(false); } }>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' ,marginRight:20,marginLeft:20,marginTop:80,marginBottom:80}}>
                  <View style={styles.quoroumcode}>
                  <ScrollView>
                      {
                      QList.map((item,key)=>(
                        <Text key={key} style={{fontSize:15,padding:2}}>{item} </Text>
                      ))
                      }
                      </ScrollView>
                       <TouchableOpacity onPress={() => setQuoroums(false)}>
                  <Text style={{marginTop:10,color:"black",fontSize:18}}>
                    Cancel</Text> 
                </TouchableOpacity>
                  </View>                  
                </View>
                </Modal>
               </View>
               </View>
            </View>
          </Modal>
        
      </View>
    )
  }

  function First(){
    setStart(0)
    setEnd(rowsPerPage)
    setFirst(true)
    setPrev(true)
  }

  function Prev(){
    setStart(start-rowsPerPage)
    if(end-rowsPerPage<rowsPerPage){
      setEnd(rowsPerPage)
    }
    else{
      setEnd(end-rowsPerPage)
    }
  }
  function close(){

    setDid(false)
    setRange(false)
    setComment(false)
    setDate(false)
  }

  function Next(){
    setStart(start+rowsPerPage)
    setEnd(end+rowsPerPage)
  }

  function Last(){
    var x = Math.floor(transactionCount/rowsPerPage)
    if(transactionCount%rowsPerPage===0){
      x=x-1
    }
    setStart(x*rowsPerPage)
    setEnd(transactionCount)
    setLast(true)
    setNext(true)
  }

  return (
    <ScrollView>
      <View style={{margin:scale(15)}}>
        <TouchableOpacity onPress={()=>navigation.goBack(null)}>
          <View style={{flexDirection:'row'}}>
          <Ionicons name='arrow-back-outline' style={{color: '#1976D2',fontSize:20}}/>
          <Text style={{color: '#1976D2', fontSize:scale(14), fontFamily:'Roboto'}}>BACK</Text>
          </View>
        </TouchableOpacity>
      </View>
       <Card containerStyle={{borderRadius:scale(10), backgroundColor:"white", marginTop:scale(-10),marginBottom:scale(20)}} >
       <View style={{flexDirection:'row', justifyContent:'space-between'}}>      
       <Text style={{fontSize:scale(20),color:"black"}}>Transaction History</Text>
       <TouchableOpacity onPress={()=>{setFilt(!filt);close()}} style={{}}>
       {filt ? 
       
       <MaterialIcons name="tune" style={{ fontSize: scale(25), color: "black",borderRadius:50,borderColor:"grey",padding:5,backgroundColor:"rgba(0, 0, 0, 0.08)" }} />
      :
       <MaterialIcons name="tune" style={{fontSize:scale(25), color:"grey",borderRadius:50,borderColor:"white",borderWidth:1,padding:5 }}/>
       
       }
       </TouchableOpacity>
      </View>

      {
        filt ?<View style={{marginTop:25}}>
          <Text style={{fontSize:20, color:"black"}}>
            Filter
          </Text>
          <View style={{marginTop:25}}>
          <TouchableOpacity onPress={()=>{close();setDef(true);getTxnByCount()}} style={{backgroundColor:def?"rgba(2, 136, 209, 0.08)":"white",flexDirection: "row",alignItems: "center",justifyContent: 'center',borderColor:"grey",borderWidth:1}}>
            <Text style={{margin:10,fontSize:18,color:def?"#1976D2":"grey"}}>
              BY DEFAULT
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{setDid(true);setRange(false);setComment(false);setDate(false);setDef(false)}} style={{backgroundColor:did?"rgba(2, 136, 209, 0.08)":"white",flexDirection: "row",alignItems: "center",justifyContent: 'center',borderColor:"grey",borderWidth:1}}>
            <Text style={{margin:10,fontSize:18,color:did?"#1976D2":"grey"}}>
              BY DID
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{setRange(true);setDid(false);setComment(false);setDate(false);setDef(false)}} style={{backgroundColor:range?"rgba(2, 136, 209, 0.08)":"white",flexDirection: "row",alignItems: "center",justifyContent: 'center',borderColor:"grey",borderWidth:1}}>
            <Text style={{margin:10,fontSize:18,color:range?"#1976D2":"grey"}}>
              BY RANGE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{setComment(true);setDid(false);setRange(false);setDate(false);setDef(false)}} style={{backgroundColor:comment?"rgba(2, 136, 209, 0.08)":"white",flexDirection: "row",alignItems: "center",justifyContent: 'center',borderColor:"grey",borderWidth:1}}>
            <Text style={{margin:10,fontSize:18,color:comment?"#1976D2":"grey"}}>
              BY COMMENT
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{setDate(true);setDid(false);setRange(false);setComment(false);setDef(false);setStart_date(new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString());setEnd_date(new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString())}} style={{backgroundColor:date?"rgba(2, 136, 209, 0.08)":"white",flexDirection: "row",alignItems: "center",justifyContent: 'center',borderColor:"grey",borderWidth:1}}>
            <Text style={{margin:10,fontSize:18,color:date?"#1976D2":"grey"}}>
              BY DATE
            </Text>
          </TouchableOpacity>
          </View>

        </View> :

        <View/>
      }
      {
      
      def?
      <View>
   <View>{display()}</View>
     </View>
     :
     <View>
       {/* <Text style={{fontSize:20, color:"rgba(0, 0, 0, 0.38)", textAlign:"center", marginTop:20}}>No</Text> */}
     </View>
      
    }

      {
        did ? <View>
          <Text style={{marginTop:20,fontSize:20, color:"black",fontWeight:"bold"}}>
        Filter Transactions by DID
        </Text>
        <Text style={{marginTop:10,fontSize:14, color:"black"}}>
        Retrieves all the transactions made with the specific DID.
        </Text>
        <TextInput placeholder=" Unique DID" style={{color: "black",height: "auto",width: "auto",marginTop: 10,padding: 10,borderWidth: 1,borderRadius: 5,marginBottom:10}} onChangeText={setText_did} value={text_did}></TextInput>
        
        <TouchableOpacity onPress={()=>getTxnByDID(text_did)} style={{marginLeft:175,backgroundColor:"#1976D2",borderRadius:5}}>
          <Text style={{fontSize:16,color:"white",fontWeight:"bold",margin:10}}>
            FILTER TRANSACTIONS
          </Text>
        </TouchableOpacity>
        
    <View>{display()}</View>
          </View>
          : <View>
            
          </View>
      }

      {
        range ? <View>
        <Text style={{marginTop:20,fontSize:20, color:"black",fontWeight:"bold"}}>
      Filter Transactions by Range
      </Text>
      <Text style={{marginTop:10,fontSize:14, color:"black"}}>
      Retrieves all the transactions within a given range.
      </Text>
      <TextInput onChangeText={setSrange} value={srange} placeholder="Start Range" style={{color: "black",height: "auto",width: "auto",marginTop: 10,padding: 10,borderWidth: 1,borderRadius: 5,marginBottom:10}}></TextInput>
      <TextInput onChangeText={setErange} value={erange} placeholder="End Range" style={{color: "black",height: "auto",width: "auto",marginTop: 10,padding: 10,borderWidth: 1,borderRadius: 5,marginBottom:10}}></TextInput>
      <TouchableOpacity style={{marginLeft:175,backgroundColor:"#1976D2",borderRadius:5}} onPress={()=>getTxnByCount()}>
        <Text style={{fontSize:16,color:"white",fontWeight:"bold",margin:10}}>
          FILTER TRANSACTIONS
        </Text>
      </TouchableOpacity>
      
    <View>{display()}</View>
        </View>: <View/>
      }
      {
        comment ? <View>
        <Text style={{marginTop:20,fontSize:20, color:"black",fontWeight:"bold"}}>
      Filter Transactions by Comment
      </Text>
      <Text style={{marginTop:10,fontSize:14, color:"black"}}>
      Retrieves all the transactions with the specified comment.
      </Text>
      <TextInput onChangeText={setComt} value={comt} placeholder="Comment" style={{color: "black",height: "auto",width: "auto",marginTop: 10,padding: 10,borderWidth: 1,borderRadius: 5,marginBottom:10}}></TextInput>
      <TouchableOpacity onPress={()=>{getTxnByComment(comt)}} style={{marginLeft:175,backgroundColor:"#1976D2",borderRadius:5}}>
        <Text style={{fontSize:16,color:"white",fontWeight:"bold",margin:10}}>
          FILTER TRANSACTIONS
        </Text>
      </TouchableOpacity>

    <View>{display()}</View>

        </View>: <View/>
      }
      {
        date ? 
        <View>
        <Text style={{ marginTop: 20, fontSize: 20, color: "black", fontWeight: "bold" }}>
              Filter Transactions by Date
            </Text><Text style={{ marginTop: 10, fontSize: 14, color: "black" }}>
                Retrieves all the transactions during the specified period.
              </Text>
              <View style={{flexDirection:"row"}}>
              <Text style={{ color: "black", height: "auto", width: 280, marginTop: 10, padding: 10, borderWidth: 1, borderRadius: 5, marginBottom: 10 }}>{start_date.toString()}</Text>
              {/* <TextInput value={10} editable={false} style={{ color: "black", height: "auto", width: 300, marginTop: 10, padding: 10, borderWidth: 1, borderRadius: 5, marginBottom: 10 }}></TextInput> */}
                <TouchableOpacity style={{marginLeft:15,marginTop:10,width:"auto",height:"auto"}} onPress={()=>setDatePickerVisibility(true)}>
                <AntDesign name="calendar" style={{fontSize:25,color:"black",marginTop:10}}/>
                  {/* <Text> Date  </Text>  */}
                  </TouchableOpacity>
                  </View>
                <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={startDate}
        onCancel={()=>setDatePickerVisibility(false)}
      />
      <View style={{flexDirection:"row"}}>    
      <Text style={{ color: "black", height: "auto", width: 280, marginTop: 10, padding: 10, borderWidth: 1, borderRadius: 5, marginBottom: 10 }}>{end_date.toString()}</Text> 
              <TouchableOpacity style={{marginLeft:15,marginTop:10,width:"auto",height:"auto"}} onPress={()=>setDateEnd(true)}>
                <AntDesign name="calendar" style={{fontSize:25,color:"black",marginTop:10}}/>
                  </TouchableOpacity>
              </View>
              <DateTimePickerModal
        isVisible={dateEnd}
        mode="datetime"
        onConfirm={endDate}
        onCancel={()=>setDateEnd(false)}
      />
              <TouchableOpacity onPress={() => {getTxnByDate(sdate, edate)}} style={{ marginLeft: 125, backgroundColor: "#1976D2", borderRadius: 5 }}> 
                <Text style={{ fontSize: 16, color: "white", fontWeight: "bold", margin: 10 }}>
                  FILTER TRANSACTIONS
                </Text>
              </TouchableOpacity>
              
    <View>{display()}</View>
        </View>: <View/>
      }
      
      
        
          <View>
            <View style={{flexDirection:"row", justifyContent:'space-between',alignItems:'center',alignContent:'center', marginTop:scale(10)}}>
              <Dropdown style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                labelField="label"
                valueField="value"
                searchPlaceholder="Search..."
                placeholder='10'
                value={value}
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
              <Text style={{color:"black",fontSize:15}}>{start+1}-{end} of {transactionCount}</Text>
              <View style={{flexDirection:"row"}}>
                <TouchableOpacity disabled={first} onPress={()=>{First()}}>
                  <AntDesign name="verticleright" style={[styles.nextIcon,{color:first?"grey":"black"}]}/>
                </TouchableOpacity>
                <TouchableOpacity disabled={prev} onPress={()=>{Prev()}}>
                    <AntDesign name="left" style={[styles.nextIcon,{color:prev?"grey":"black"}]}/>
                </TouchableOpacity>
                <TouchableOpacity disabled={next} onPress={()=>{Next()}}>
                    <AntDesign name="right" style={[styles.nextIcon,{color:next?"grey":"black"}]}/>
                </TouchableOpacity>
                <TouchableOpacity disabled={last} onPress={()=>{Last()}}>
                      <AntDesign name="verticleleft" style={[styles.nextIcon,{color:last?"grey":"black"}]}/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Card>
    </ScrollView>
  );
};

const styles = ScaledSheet.create({
  container: {
    backgroundColor: 'white',
    padding: '16@s',
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
  icon: {
    marginRight: '5@s',
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: '22@s',
    top: '8@s',
    zIndex: '999@s',
    paddingHorizontal: '8@s',
    fontSize: '14@s',
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
  quoroumcode: {
    margin: 7, 
    backgroundColor: "white", 
    borderRadius: 5, 
    paddingRight: 25,
    paddingLeft: 25,
    paddingTop: 15,
    paddingBottom: 15, 
    alignItems: "flex-start",
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
 
});
 
export default RecentTransactions;