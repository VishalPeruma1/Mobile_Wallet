import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text, 
  TouchableOpacity,
  View,
  isFocused
} from 'react-native';
import { Card } from "react-native-elements";
import { Dropdown } from 'react-native-element-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
const data = [
  { label: '5', value: '5' },
  { label: '10', value: '10' },
  { label: '25', value: '25' },
  { label: 'All', value: 'All' }
];
 
const TokensPage = () => {
    const [filt,setFilt]=React.useState(false);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const [tokensList,setTokensList] = React.useState([])

    React.useEffect(()=> {
        viewTokens()
        // getNftTransaction()
        }, [isFocused])

    const viewTokens = async()=> {
        try {
            const response = await fetch('https://webwallet.knuct.com/capi/viewTokens');
            const responseJson = await response.json();
            if(response.status===200){
            console.log("Tokens: "+responseJson.data.response)
            setTokensList(responseJson.data.response)
            }
        } catch(error){
            Toast.show(error,Toast.LONG);
        }
        }
  return (
    <ScrollView>
    <View style={{flexDirection: 'row'}}>
       <Card containerStyle={{width:"auto",borderRadius:10, backgroundColor:"white", borderWidth:0}} >
       <View style={{flexDirection:'row'}}>
       
       <Text style={{fontSize:25,color:"black"}}>Recent Transaction</Text>

       <View style={{paddingBottom:75}}>
        <Card containerStyle={{width:360, height:"auto", borderRadius:10, backgroundColor:"white", borderColor:"white"}}>
          <View style={{flexDirection:'row'}}>
            <Text style={{fontWeight:'bold',fontFamily:'Roboto',color:'#000000DE', fontSize:20}}>Tokens</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Tokens")}>
              <Text style={{fontSize:14,marginLeft:200,color:'#1976D2',marginTop:6}}> VIEW ALL</Text>
            </TouchableOpacity>

          </View>
          <Text style={{marginLeft:10}}>
            0 total
          </Text>
          {
            
              tokensList.map((item,id) => (
              <View style={{flexDirection:"row", paddingBottom:5}}>
                <MaterialCommunityIcons name="cube-outline" color="#1976D2" size={18} style={{paddingRight:5}}/>
                <Text key={id} style={{color:"black", fontSize:15, bottom:4, paddingRight:15}} >{item}</Text>
              </View>
              ))
          }
          
        </Card>
        </View>

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
        <View style={{flexDirection:"row"}}>
        <Dropdown style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? '5' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);}}>


       </Dropdown>
       
       
       <TouchableOpacity>
        <View style={{flexDirection:"row"}}>
        
       <MaterialIcons name="horizontal-rule" style={{left:5,padding:10,paddingTop:15,fontSize:30, color:"grey", transform: [{rotate: '90deg'}],position: 'absolute'}}/>
       <SimpleLineIcons name="arrow-left" style={{left:15,marginTop:6,padding:10,fontSize:20, color:"#A6A6A6"}}/>
        </View>
       
       </TouchableOpacity>
       <TouchableOpacity>
       <SimpleLineIcons name="arrow-left" style={{marginTop:6,padding:10,fontSize:20, color:"#A6A6A6"}}/>
       </TouchableOpacity>



       <TouchableOpacity>
       <SimpleLineIcons name="arrow-right" style={{marginTop:6,padding:10,fontSize:20, color:"#A6A6A6"}}/>
       </TouchableOpacity>
       
       <TouchableOpacity>
        <View style={{flexDirection:"row"}}>
        <SimpleLineIcons name="arrow-right" style={{marginTop:6,padding:10,fontSize:20, color:"#A6A6A6"}}/>
       <MaterialIcons name="horizontal-rule" style={{left:5,padding:10,paddingTop:15,fontSize:30, color:"grey", transform: [{rotate: '90deg'}],position: 'absolute'}}/>
        </View>
       
       </TouchableOpacity>
        </View>
        
        </Card>
    </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    width:75,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 1,
    paddingHorizontal: 8,
    color:"black",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color:"black"
  },
  selectedTextStyle: {
    fontSize: 16,
    color:"black"
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
 
export default TokensPage;