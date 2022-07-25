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
import { Card } from "react-native-elements";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
 
const RecentTransactions = () => {
    const [filt,setFilt]=React.useState(false);
  return (
    <View style={{flexDirection: 'row'}}>
       <Card containerStyle={{width:"auto",borderRadius:10, backgroundColor:"white", borderWidth:0}} >
       <View style={{flexDirection:'row'}}>
       
       <Text style={{fontSize:25,color:"black"}}>Recent Transaction</Text>
       {filt ? <TouchableOpacity style={{marginLeft:75,}}>
       <MaterialIcons name="tune" style={{fontSize:30, color:"black"}}/>
       </TouchableOpacity> :<TouchableOpacity style={{marginLeft:75,}}>
       <MaterialIcons name="tune" style={{fontSize:30, color:"grey"}}/>
       </TouchableOpacity>

        }
       {/* <TouchableOpacity style={{marginLeft:75,}}>
       <MaterialIcons name="tune" style={{fontSize:30, color:"grey"}}/>
       </TouchableOpacity> */}
       
        </View>
        </Card>
    </View>
  );
};
 
export default RecentTransactions;