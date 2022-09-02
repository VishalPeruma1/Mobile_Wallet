import React from 'react';
import {
  ScrollView,
  Text, 
  TouchableOpacity,
  View,
  Modal,
  Image
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-simple-toast';
import { Card } from "react-native-elements";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale, ScaledSheet } from 'react-native-size-matters';

const OwnedNFT = ({data})=>{
    const [own,setOwn] = React.useState(false);
    const [desc,setDesc] = React.useState(false);
    const b64 = `data:image/png;base64,${data.base64}`;
    const copyToClipboard = ()=>{
      Clipboard.setString(data.description)
      Toast.show("Description Copied to clipboard")
    }


    return(
<View>
    <TouchableOpacity onPress={() => { setOwn(true)}}>
        <Card containerStyle={styles.transactionCard}>
            <View style={styles.transactionView}>
                <View style={styles.transactionView2}>
                    <MaterialCommunityIcons name="cube-scan" style={{fontSize:scale(20),color:"#1976D2"}} />
                    <Text style={{marginLeft:10,fontSize:16,color:"black"}}>{data.name}</Text>
                </View>
                <Text style={styles.NFTItem}>{data.token}</Text>
            </View>
        </Card>
    </TouchableOpacity>
    <Modal visible={own} transparent={true} hasBackdrop={true} onRequestClose={() => {setOwn(false)} }>
       <ScrollView>
       <View style={styles.modalView}>
            <View style={styles.qrCode}>
            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row', alignSelf: 'baseline' }}>
                <Text style={styles.modalHeading}>{data.name}</Text>
              <TouchableOpacity style={{paddingLeft:scale(90)}} onPress={() => setOwn(false)}>
                <Entypo name="cross" style={styles.crossIcon}/> 
              </TouchableOpacity> 
              </View>
              <Text style={styles.modalDate}>{data.Date}</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.NFTItem}>{data.token}</Text>
                <TouchableOpacity onPress={() => { setDesc(true)}}>
                <MaterialCommunityIcons name="information-outline" style={{fontSize:scale(20),color:"#1976D2"}} />
                </TouchableOpacity>
                <Modal visible={desc} transparent={true} hasBackdrop={true} onRequestClose={() => {setDesc(false)} }>
                  <View style={styles.modalView}>
                    <View style={styles.qrCode}>
                      <View style={{ flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row', alignSelf: 'baseline' }}>
                        <Text style={styles.modalHeading}>Description</Text>
                        <TouchableOpacity style={{paddingLeft:scale(90)}} onPress={() => setDesc(false)}>
                          <Entypo name="cross" style={styles.crossIcon1}/> 
                        </TouchableOpacity> 
                        </View>
                        <TouchableOpacity onPress={copyToClipboard}>
          <View style={styles.buttonView}>
            <MaterialIcons name="content-copy" style={styles.buttonIcon}/>
            
          </View>
          </TouchableOpacity>
                        <Text>
                          {data.description}
                        </Text>
                      </View>

                    </View>
                  </View>
                </Modal>
                </View>
              <Image style={styles.img_style} source={{uri:b64 }}/>
              </View>
            </View>
        </View>
        
        </ScrollView> 
    </Modal>
</View>
    );
}

const styles = ScaledSheet.create({
  buttonView:{
    flexDirection:'column',
    alignItems:'flex-end',
    marginRight:"7@s",
    marginTop:"10@s"
  },
  buttonIcon:{
    fontSize:'20@s', 
    color:"#1976D2"
  },
  img_style:{
    marginTop:"20@s",
    width:"300@s", 
    height: "380@s"
  },
  
  crossIcon1:{
    color:"black",
    fontSize:'20@s', 
    paddingLeft:'80@s'
  },
    crossIcon:{
        color:"black",
        fontSize:'20@s', 
        paddingLeft:'30@s'
      },
    modalHeading:{  
        fontWeight:"bold",
        fontFamily:'Roboto, Helvetica, Arial, sans-serif',
        fontSize: '14@s', 
        color: 'black' 
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
    modalView:{ 
        flex: 1, 
        justifyContent: 'center',
        paddingTop:"100@s",
        alignItems: 'center',
        marginRight:'18@s',
        marginLeft:'18@s'
      },
    NFTItem:{
        color:"grey", 
        fontSize:'12@s', 
        width:"280@s"
      },
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
      flexDirection:"row",

    },
});
export default OwnedNFT;