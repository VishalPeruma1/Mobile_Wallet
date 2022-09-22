import React from 'react';
import {
  ScrollView,
  Text, 
  TouchableOpacity,
  View,
  Modal,TextInput
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card } from "react-native-elements";
import OwnedNFT from './components/OwnedNFT';
import Entypo from 'react-native-vector-icons/Entypo';
import { useIsFocused } from '@react-navigation/native';
import { scale, ScaledSheet } from 'react-native-size-matters';

const NftPage = ({navigation})=>{
    const [ownedNft, setOwnedNft] = React.useState([]);
    const [own, setOwn] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const isFocused = useIsFocused();
    const [foundNfts,setFoundNfts] = React.useState([]);
    const [ownedNftTokens, setOwnedNftTokens] = React.useState([]);
    React.useEffect(()=>{
      getMyAssets()
    },[isFocused])

    const findNfts = (key) =>{
      const keyword = key;
      setSearch(keyword)
      if(keyword !=="")
      {
        const results = ownedNft.filter((t) =>{
          return t.name.toLowerCase().includes(keyword.toLowerCase()) && t;
        });
        setFoundNfts(results);
      }
      else{
        setFoundNfts(ownedNft)
      }
      setSearch(keyword);
    };

    const getMyAssets = async () => {
        try{
          const response = await fetch('https://webwallet.knuct.com/capi/getMyAssets');
          const responseJson = await response.json();
          setOwnedNft(responseJson.data.response);
          setOwn(true);
          setOwnedNftTokens(responseJson.data.count)
          console.log(responseJson.data.response[0].name);
        }
        catch(error){        
          Toast.show(error,Toast.LONG);
        }
      }

    return(
        <View>
            <View style={{margin:scale(15)}}>
            <TouchableOpacity onPress={()=>navigation.goBack(null)}>
              <View style={{flexDirection:'row'}}>
              <Ionicons name='arrow-back-outline' style={{color: '#1976D2',fontSize:scale(20)}}/>
              <Text style={{color: '#1976D2', fontSize:scale(14), fontFamily:'Roboto'}}>BACK</Text>
              </View>
            </TouchableOpacity>
            </View>
            <Card containerStyle={styles.container}>
                <Text style={{fontSize:scale(20),color:"black"}}>Owned NFTs</Text>
                { ownedNftTokens !== 0 ? <Text> {ownedNftTokens} total </Text>:<Text> No tokens Available</Text>

                }
                <TextInput placeholder="Search Nfts" style={styles.placeholdertext} onChangeText={(search)=>findNfts(search)}></TextInput>
                <View>
                  { 
                  search !=="" ? foundNfts.map((data) => (
                          <OwnedNFT  data={data}/>)):ownedNft.map((data) => (
                          <OwnedNFT  data={data}/>))
                    // (() => {
                    //   if (search!=="" && own)
                    //   {<Text>Hi</Text>
                    //   // ownedNft.map((data) => (
                    //   //    <OwnedNFT  data={data}/>
                    //   //   ))
                    //   }
                    //   else{
                    //     <Text>Hello</Text>
                    //   // ownedNft.map((data) => (
                    //   //     <OwnedNFT  data={data}/>
                    //   //   ))
                    //   }
                    // }
                    // )
                  }
                </View>
            </Card>

        </View>
    )
}
const styles = ScaledSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: '10@s',
    marginTop:'-10@s',
    marginBottom:'20@s',
  },
  placeholdertext:{
    color:'black',
    height:'auto',
    width:'auto',
    marginTop: '10@s',
    padding: '10@s',
    borderWidth: '1@s',
    borderRadius: '5@s',
    marginBottom: '10@s'
  },
})
export default NftPage;