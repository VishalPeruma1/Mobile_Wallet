import React from 'react';
import {
  ScrollView,
  Text, 
  TouchableOpacity,
  View,
  Modal
} from 'react-native';
import { Card } from "react-native-elements";
import Entypo from 'react-native-vector-icons/Entypo';
import { scale, ScaledSheet } from 'react-native-size-matters';


const TransactionCard = ({data})=>{
    const [trans, setTrans] = React.useState(false);
    const [quoroums,setQuoroums] = React.useState(false);
    const QList = data.quorumList;

    return(
      <View>
        <TouchableOpacity onPress={() => { setTrans(true)
          }}>
          <Card containerStyle={styles.transactionCard}>
            <View style={styles.transactionView}>
            <View style={styles.transactionView2}>
              {data.role==="Receiver"?
                <Text style={{color:"rgb(45, 201, 55)",fontSize:scale(18), paddingBottom:scale(6)}}>+ {JSON.stringify(Object.keys(data.tokens).length)} KNCT</Text>
              :          
                <Text style={{color:"rgb(204, 50, 50)", fontSize:scale(18), paddingBottom:scale(6)}}>- {JSON.stringify(Object.keys(data.tokens).length)} KNCT</Text>
              }
              <Text style={styles.transactionDid}>{data.role==="Receiver" ? data.senderDID : data.receiverDID}</Text>
              <Text style={styles.date}>{data.Date}</Text>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
        <Modal visible={trans} transparent={true} hasBackdrop={true} onRequestClose={() => {setTrans(false)} }>
          <View style={styles.modalView}>
            <View style={styles.qrCode}>
              <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row', alignSelf: 'baseline' }}>
                <Text style={styles.modalHeading}>Knuct Transaction</Text>
              <TouchableOpacity style={{paddingLeft:scale(90)}} onPress={() => setTrans(false)}>
                <Entypo name="cross" style={styles.crossIcon}/> 
              </TouchableOpacity> 
              </View>
              <Text style={styles.modalDate}>{data.Date}</Text>
              </View>
              <View>
              {data.role === "Receiver" ? <Text style={styles.role}>From</Text> : <Text style={styles.role}>To</Text>}
              <Text style={styles.did}>{data.role === "Receiver" ? data.senderDID : data.receiverDID}</Text>
              {data.role === "Receiver" ?
                <Text style={[styles.knctText, {color: "rgb(45, 201, 55)"}]}>{JSON.stringify(Object.keys(data.tokens).length)} KNCT</Text>
                :
                <Text style={[styles.knctText, {color: "rgb(204, 50, 50)"}]}>{JSON.stringify(Object.keys(data.tokens).length)} KNCT</Text>
              }
              <View style={{padding:5}}>
                <Text style={[styles.comment, {width:data.comment.length*12}]}>{data.comment}</Text>  
              </View>
              <Text style={styles.transactionId}>Transaction ID:</Text>
              <Text style={styles.txnId}>{data.txn}</Text>
              <TouchableOpacity onPress={() => setQuoroums(true)} style={{marginTop:scale(15)}}>
                <Text style={{color:"#1976D2", marginLeft:scale(-14.5)}}>
                  VIEW 15 QUORUMS
                </Text>
              </TouchableOpacity>
              <Modal visible={quoroums} transparent={true} onRequestClose={() => { setQuoroums(false); } }>
                <View style={styles.quorumModal}>
                  <View style={styles.quorumCode}>
                    <ScrollView>
                        {
                        QList.map((item,key)=>(
                          <Text key={key} style={styles.quorumItem}>{item} </Text>
                        ))
                        }
                    </ScrollView>
                    <TouchableOpacity onPress={() => setQuoroums(false)}>
                      <Text style={styles.quorumCancel}>Cancel</Text> 
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


const styles = ScaledSheet.create({
    transactionCard:{
      marginLeft:'0@s', 
      marginRight:'0@s',
      backgroundColor:"white",
      padding:'5@s', 
      paddingLeft:'12@s',
      elevation:'5@s'
    },
    transactionView:{
      flexDirection:'column', 
      flexWrap:"wrap", 
      justifyContent:"space-evenly"
    },
    transactionView2:{
      display:"flex",
      flexDirection:"column"
    },
    transactionDid:{
      fontSize:'12@s',
      color:"black", 
      width:'280@s'
    },

    role:{ 
      fontSize: '17@s', 
      color: "black",
      fontWeight:"400",
      marginLeft: '-14.5@s' 
    },
    date:{
      color:"rgba(0, 0, 0, 0.38)", 
      fontSize:"14@s"
    },
    modalView:{ 
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'center',
      marginRight:'18@s',
      marginLeft:'18@s'
    },
    knctText:{ 
      fontSize: '18@s', 
      paddingTop: '5@s', 
      marginLeft:'-14.5@s' 
    },
    transactionId:{  
      marginTop:'8@s',
      fontSize: '17@s', 
      color: 'black', 
      fontWeight:"400",
      marginLeft:'-14.5@s' 
    },
    txnId:{
      fontWeight:"500",
      fontSize: '13@s', 
      color: 'black', 
      marginLeft:'-14.5@s' 
    },
    crossIcon:{
      color:"black",
      fontSize:'25@s', 
      paddingLeft:'36@s'
    },
    comment:{ 
      paddingLeft:'3@s',
      borderRadius:'10@s',
      backgroundColor:"#00000014",
      fontSize: '16@s', 
      justifyContent:"center",
      color: 'black', 
      marginLeft:'-19@s' 
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
  modalHeading:{ 
    fontWeight: 'bold', 
    fontFamily:'Roboto, Helvetica, Arial, sans-serif',
    fontSize: '18@s', 
    color: 'black' 
  },
  quorumCode: {
    margin: '7@s', 
    backgroundColor: "white", 
    borderRadius: '5@s', 
    paddingRight: '25@s',
    paddingLeft: '25@s',
    paddingTop: '15@s',
    paddingBottom: '15@s', 
    alignItems: "flex-start",
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
  quorumModal:{
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' ,
    marginRight:'20@s',
    marginLeft:'20@s',
    marginTop:'80@s',
    marginBottom:'80@s'
  },
  quorumCancel:{
    marginTop:'10@s',
    color:"black",
    fontSize:'18@s'
  },
  quorumItem:{
    color:"black",
    fontSize:'14@s',
    padding:'2@s'
  },
  did:{ 
    marginLeft:'-14.5@s' ,
    fontSize: '13@s', 
    color: "black",
    width: '285@s' 
  },
  modalDate:{ 
    paddingBottom:'4@s',
    fontSize: '13@s', 
    color: "grey",
    marginLeft:'0@s' 
  }
    
  });

export default TransactionCard;