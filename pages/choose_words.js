import React from 'react';
import {
  ScrollView,
  Text, 
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';
import {scale, ScaledSheet} from 'react-native-size-matters';

const ChooseWords = ({ navigation}) => {

    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
      try{
        const interval = setInterval(() => {
          setValue((v) => (v === 9 ? 0 : v + 1));
        }, 1000);
      }
      catch(err){
        console.log(err);
      }
    }, []); 

    const [text, onChangeText] = React.useState("");
    const [textInputHeight,setTextInputHeight] = React.useState(40)
    const [state,setState] = React.useState(Array(16).fill(false));
    const [selected,setSelected] = React.useState([]);
    // const [var1,changevar] = React.useState(null);

    const data = [
      [{val:"Hill",id:1}, {val:"Bull",id:2}, {val:"Bag",id:3}, {val:"Window",id:4}],
      [{val:"Parrot",id:5}, {val:"Cloud",id:6}, {val:"Design",id:7}, {val:"Zebra",id:8}],
      [{val:"Book",id:9}, {val:"Cat",id:10}, {val:"Mobile",id:11}, {val:"Dog",id:12}],
      [{val:"Tree",id:13}, {val:"Computer",id:14}, {val:"Bottle",id:15}, {val:"Water",id:16}],
    ]

    // var state = Array(16).fill(false).

    // var selected = []

    function seedwords({data}) {
      state[data.id-1] = !state[data.id-1]
      console.log(data.id)
      try {
        if(selected.includes(JSON.stringify(data))) {
          console.log("Removing")
          selected.splice(selected.indexOf(JSON.stringify(data)),1)
        }
        else {
          console.log("Pushing")
          if (selected.length<4) {
            selected.push(JSON.stringify(data))
          }
          else {
            dt = JSON.parse(selected.shift());
            state[dt.id-1] = !state[dt.id-1]
            selected.push(JSON.stringify(data))
          }
        }
      }
      catch(err){
        console.log(err)
      }
      console.log(state)
      console.log(selected)
    }

    function Row({ column }) {  
      return (
        <View style={styles.rowStyle}>
          {column.map((data,id) => (
            <Cell data={data} key={id} />
          ))}
        </View>
     );
    }

    function Cell({ data }) {
      return (
        
          <TouchableOpacity onPress={()=>seedwords({data})} style={styles.cellStyle}>
          <View style={ [styles.cellView,{ 
          backgroundColor: (state[data.id-1] ? 'rgb(207, 150, 217)' : '#ffffff')}]}>
              <Text style={{color : (state[data.id-1] ? 'white' : 'black'), fontSize:scale(12)}}>{data.val}</Text>              
            </View>
          </TouchableOpacity>
        
      );
    }    

    function Create_Wallet() {
      if(text==="") {
        Toast.show("You cannot leave passphrase empty",Toast.LONG);
      }
      else if(text.length<3) {
        Toast.show("Passphrase should atleast be 3 characters long",Toast.LONG);
      }
      else {
        if(selected.length!==4) {
          Toast.show("Select exactly 4 words from the list",Toast.LONG);
        }
        else {
          try{
            var param1 = text
            var param2 = []
            for(var i of selected) {
              param2.push(JSON.parse(i).val.toLowerCase())
            }
            console.log(param1,param2)
            navigation.navigate('Create Wallet',{"param1":param1,"param2":param2})
          }
          catch(err){
            console.log(err)
          }
        }
      }
    }
    
    return(

        <ScrollView style={styles.content}>
        <Text style={styles.headline}>Create New Wallet</Text>
        <Text style={styles.content}>
        To initialize your wallet we need some random inputs from you. You don't have to memorize any of these inputs for later use.
        </Text>
        <Text style={styles.sectionDescription}>
            Enter a passphrase
        </Text>
        
        <TextInput placeholder='Passphrase' multiline={true} placeholderTextColor="grey" style={[styles.textinput,{height:textInputHeight}]} onChangeText={onChangeText} value={text}
        onContentSizeChange={(e) => setTextInputHeight(e.nativeEvent.contentSize.height) } />

        <Text style={styles.chooseWordsText}>
            Choose any 4 words from below.
        </Text>

        <View style={styles.gridContainer}>
          {data.map((column,id) => (
            <Row key={id} column={column} />
          ))}
        </View>

        <View style={styles.btnStyle}>
        <TouchableOpacity onPress={()=>Create_Wallet()}>
            <View style={{flexDirection:'row'}}>
                <Text style={styles.continueBtnText}>CONTINUE</Text>
                <Ionicons name='arrow-forward-outline' style={styles.continueArrow}/>
            </View>
        </TouchableOpacity>
        </View>
      <View style={styles.backBtn}>
      <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
            <View style={{flexDirection:'row'}}>
                <Ionicons name='arrow-back-outline' style={styles.backArrow}/>
                <Text style={styles.backBtnText}>Back</Text>
            </View>
      </TouchableOpacity>
      </View>
      </ScrollView>

    );
};


const styles = ScaledSheet.create({
    gridContainer: {
        marginTop: '15@s',
        alignItems:'center',
        justifyContent:'center',
    },
    rowStyle: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: 'center',
    },
    cellStyle: {
      flex: 1,
      marginStart:'5@s',
      marginBottom:'10@s',
      marginTop:'10@s',
      marginEnd:'5@s',
      borderWidth:'1@s',
      borderRadius:'5@s',
    },
    cellView: {
      paddingStart:'5@s', 
      paddingBottom:'10@s', 
      paddingTop:'10@s', 
      paddingEnd:'5@s', 
      alignItems:'center', 
      justifyContent:'center', 
      borderRadius:'4@s',
    },
    backBtn:{
      alignItems:'center',
      textAlign:'center',
      flex:'2@s',
      marginTop:'25@s',
      flex:1,
      justifyContent:'center',
      flexDirection:'row'
    },
    backBtnText:{
      color: '#1976D2',
      fontSize:'16@s', 
      marginLeft:'5@s'
    },
    continueBtnText:{
      color: '#ffffff',
      fontSize:'14@s', 
      paddingRight:'5@s',
      justifyContent:"center"
    },
    continueArrow:{
      color:'#ffffff',
      fontSize:'17@s',
      paddingRight:'2.5@s'
    },
    content:{
      color: "gray",
      flex:2 ,
      textAlign:'center',
      fontSize: '14@s',
      marginTop: '20@s',
      paddingEnd: '15@s',
      paddingStart:'15@s'
      // justifyContent: 'center',
      // marginLeft: 37
    },
    chooseWordsText:{
      marginTop: '25@s', 
      fontSize: '15@s', 
      fontWeight: '400', 
      paddingStart:'10@s', 
      color:'black'
    },
    btnStyle:{
      borderColor:'#1976D2',
      flexDirection:'row',
      borderWidth:'1@s',
      paddingStart:'50@s',
      paddingEnd:'50@s',
      paddingTop:'10@s',
      paddingBottom:'10@s', 
      justifyContent:'center',
      flex:1,
      borderRadius:'5@s',
      backgroundColor:'#1976D2',
      marginTop:'20@s',
      alignSelf: 'center'
    },
    textinput:{
        color: "black",
        marginTop: '12@s',
        marginStart:'12@s',
        marginEnd:'12@s',
        padding: '10@s',
        borderWidth: '1@s', 
        borderRadius: '5@s',
        maxHeight:'85@s',
      },
      backArrow:{
        color: '#1976D2',
        fontSize:'17@s',
        marginTop:'3@s'
      },
    container: {
      alignItems: 'center',
   },
    headline: {
      textAlign: 'center', // <-- the magic
      fontWeight: 'bold',
      color:'black',
      fontSize: '30@s',
      // justifyContent: 'center',
      // marginLeft: 37,
      alignItems: 'center'
    },
    sectionDescription: {
      marginTop: '20@s',
      fontSize: '15@s',
      fontWeight: '400',
      paddingStart:'10@s',
      color:'black',
    },
    highlight: {
      fontWeight: '700',
    },
  });

export default ChooseWords;
