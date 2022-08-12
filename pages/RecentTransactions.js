import React, {useState} from 'react';
import {
  ScrollView,
  Text, 
  TouchableOpacity,
  View,
} from 'react-native';
import { Card } from "react-native-elements";
import { Dropdown } from 'react-native-element-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {scale,ScaledSheet} from 'react-native-size-matters';

const data = [
  { label: '5', value: '5' },
  { label: '10', value: '10' },
  { label: '25', value: '25' },
  { label: 'All', value: 'All' }
];
 
const RecentTransactions = ({navigation,route}) => {
    const [filt,setFilt]=React.useState(false);
    const [value, setValue] = useState(10);
    const [show, setShow] = React.useState(10);
    const [isFocus, setIsFocus] = useState(false);
    const transactionList = route.params.transactionList;
    const transactions = route.params.transactions;
    const transactionCount = route.params.transactionCount;
  
    const TransactionCard = ({data})=>{
      return(
        <TouchableOpacity>
          <Card containerStyle={{marginLeft:10, marginRight:10,backgroundColor:"white",padding:5, paddingLeft:12,elevation:5}} wrapperStyle={{width:200}}>
            <View style={{flexDirection:'column', flexWrap:"wrap", justifyContent:"space-evenly"}}>
            <View style={{display:"flex",flexDirection:"column"}}>
              {data.role==="Receiver"?
                <Text style={{color:"green",fontSize:18, paddingBottom:6}}>+ {JSON.stringify(Object.keys(data.tokens).length)} KNCT</Text>
              :          
                <Text style={{color:"red", fontSize:18, paddingBottom:6}}>- {JSON.stringify(Object.keys(data.tokens).length)} KNCT</Text>
              }
              <Text style={{fontSize:14,color:"black", width:295}}>{data.role==="Receiver" ? data.senderDID : data.receiverDID}</Text>
              <Text style={{fontSize:14, color:"grey"}}>{data.Date}</Text>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      )
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
       <TouchableOpacity>
       {filt ? 
       <MaterialIcons name="tune" style={{fontSize:scale(25), color:"black"}}/>
       :
       <MaterialIcons name="tune" style={{fontSize:scale(25), color:"grey"}}/>
       }
       </TouchableOpacity>
      </View>
      {
          (!transactions)?
      <View>
        {transactionList.slice(0,show).map((data,id) => (
            <TransactionCard key={id} data={data} />
            ))
        }
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
              setValue(item.value);
              if(item.value==="All"){
                setShow(transactionCount)
              }
              else{
                setShow(Number(item.value));
              }
              setIsFocus(false);}}>
          </Dropdown> 
          <View style={{flexDirection:"row"}}>
            <TouchableOpacity>
              <AntDesign name="verticleright" style={styles.nextIcon}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <AntDesign name="left" style={styles.nextIcon}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <AntDesign name="right" style={styles.nextIcon}/>
            </TouchableOpacity>
            <TouchableOpacity>
                  <AntDesign name="verticleleft" style={styles.nextIcon}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      :
      <View>
        <Text style={{fontSize:20, color:"rgba(0, 0, 0, 0.38)", textAlign:"center", marginTop:20}}>No transactions made yet</Text>
      </View>
      }  
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
});
 
export default RecentTransactions;