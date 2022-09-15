import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text, 
  TouchableOpacity,
  View,
  isFocused,
  TextInput
} from 'react-native';
import { Card } from "react-native-elements";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {s, scale,ScaledSheet} from 'react-native-size-matters';
const data = [
  { label: '5', value: '5' },
  { label: '10', value: '10' },
  { label: '25', value: '25' },
  { label: 'All', value: 'All' }
];
 
const TokensPage = ({navigation}) => {
    const [tokenCount,setTokenCount] = useState(0);
    const [tokensList,setTokensList] = React.useState([])
    const [foundtkns,SetFoundtkns]= React.useState([]);
    const [search, setSearch] = React.useState("");
    React.useEffect(()=> {
        viewTokens()
        // getNftTransaction()
        }, [isFocused])

    const Tokens = ({data})=>{
      return(
      <View style={{flexDirection:"row", paddingBottom:5}}>
        <MaterialCommunityIcons name="cube-outline" color="#1976D2" size={18} style={{paddingRight:5}}/>
        <Text style={styles.filter_did}>{data}</Text>
      </View>
      )
    }
    const filterTokens = (key) =>{
      console.log("Inside Search")
      const keyword = key;
      setSearch(keyword)

      if(keyword!=="")
      {
        console.log("Inside IF")
        console.log(keyword)
        const results = tokensList.filter((t)=> {
          return t.toLowerCase().startsWith(keyword.toLowerCase());
          });
          console.log(results)
          SetFoundtkns(results)
      }
      else{
        SetFoundtkns(tokensList)
      }

    }

    const viewTokens = async()=> {
        try {
            const response = await fetch('https://webwallet.knuct.com/capi/viewTokens');
            const responseJson = await response.json();
            if(response.status===200){
            console.log("Tokens: "+responseJson.data.response)
            setTokensList(responseJson.data.response)
            setTokenCount(responseJson.data.count)
            }
        } catch(error){
            Toast.show(error,Toast.LONG);
        }
        }
  return (
    <ScrollView>
      <View style={{margin:scale(15)}}>
        <TouchableOpacity onPress={()=>navigation.goBack(null)}>
          <View style={{flexDirection:'row'}}>
          <Ionicons name='arrow-back-outline' style={{color: '#1976D2',fontSize:scale(20)}}/>
          <Text style={styles.back}>BACK</Text>
          </View>
        </TouchableOpacity>
      </View>
    <View>
       <Card containerStyle={styles.container} >
       <View style={{flexDirection:'row', justifyContent:'space-between'}}>
       
       <Text style={{fontSize:scale(25),color:"black"}}>Tokens</Text>
       </View>

                
          {search===""?
      <Text style={styles.searchText}>{tokenCount} Total</Text>:
      <Text style={styles.searchText}>{Object.keys(foundtkns).length} token(s) found from {tokenCount} total token(s)</Text>
    }
    <View>
            <TextInput placeholder="Search Tokens.." style={styles.placeholdertext} onChangeText={(search) =>filterTokens(search)}></TextInput>
          </View>
          <View>
          {(() => { 

            if(search!=="")
            {
              return foundtkns.map((d,id) => (
                <Tokens key={id} data={d} />
                ))
            }
            else
            {
              return tokensList.map((d,id) => (
                <Tokens key={id} data={d} />
                ))
            }

          })()
            
          }
          </View>        
        </Card>
    </View>
    </ScrollView>
  );
};
const styles = ScaledSheet.create({
  back:{
    color: '#1976D2',
    fontSize:'14@s', 
    fontFamily:'Roboto'
  },
  filter_did:{
    color:"black", 
    fontSize:"13@s", 
    bottom:'4@s', 
    paddingRight:'15@s'

  },
  container: {
    height:"auto",
    backgroundColor: 'white',
    padding: '16@s',
    borderRadius:'10@s',
    marginTop:'-10@s',
    marginBottom:'20@s'
  },
  placeholdertext:{
    color:'grey',
    height:'auto',
    width:'auto',
    marginTop: '10@s',
    padding: '10@s',
    borderWidth: '1@s',
    borderRadius: '5@s',
    marginBottom: '10@s'
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
  searchText:{
    color:"black"
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