import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text, 
  Button,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import { ButtonGroup, Input } from "react-native-elements";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-simple-toast';

const New_wallet = ({ navigation}) => {

    const [text, onChangeText] = React.useState("");
    const [selectedIndex,setSelectedIndex  ] = React.useState();
    const [selectedIndexes,setSelectedIndexes] = React.useState();
    const [selectedIndex1,setSelectedIndex1  ] = React.useState();
    const [selectedIndexes1,setSelectedIndexes1] = React.useState();
    const [selectedIndex2,setSelectedIndex2  ] = React.useState();
    const [selectedIndexes2,setSelectedIndexes2] = React.useState();
    const [selectedIndex3,setSelectedIndex3  ] = React.useState();
    const [selectedIndexes3,setSelectedIndexes3] = React.useState();

    const data = [
      [{val:"Hill",id:1}, {val:"Bull",id:2}, {val:"Bag",id:3}, {val:"Window",id:4}],
      [{val:"Parrot",id:5}, {val:"Cloud",id:6}, {val:"Design",id:7}, {val:"Zebra",id:8}],
      [{val:"Book",id:9}, {val:"Cat",id:10}, {val:"Mobile",id:11}, {val:"Dog",id:12}],
      [{val:"Tree",id:13}, {val:"Computer",id:14}, {val:"Bottle",id:15}, {val:"Water",id:16}],
    ]

    var state = Array(16).fill(false)
    var selected = []

    function seedwords({data}){
      state[data.id-1] = !state[data.id-1]
      console.log(data.id)
      if(selected.length==0){
        selected.push(data)
      }
      else if(selected.includes(data)){
        idx = selected.indexOf(data)
        selected.splice(idx,1)
      }
      else{
        if (selected.length<4){
          selected.push(data)
        }
        else{
          dt = selected.shift();
          state[dt.id-1] = !state[dt.id-1]
          selected.push(data)
        }
      }
      console.log(state)
      console.log(selected)
    }

    function Row({ column }) {  
      return (
        <View style={styles.rowStyle}>
          {column.map((data) => (
            <Cell data={data} key={data.id} />
          ))}
        </View>
     );
    }

    function Cell({ data }) {
      return (
        <View style={styles.cellStyle}>
          <TouchableOpacity onPress={()=>seedwords({data})}>
            <View>
              <Text style={{color : (state[data.id] ? 'grey' : 'black')}}>{data.val}</Text>              
            </View>
          </TouchableOpacity>
        </View>
      );
    }    

    function Create_Wallet() {
      if(text===""){
        Toast.show("You cannot leave passphrase empty")
      }
      else {
        if(selected.length<4){
          Toast.show("Select exactly 4 words from the list")
        }
        else{
          var param1 = text
          var param2 = []
          for(i of selected){
            param2.push(i.val)
          }
          console.log(param1,param2)
          navigation.navigate('Wallet Creation',{"param1":param1,"param2":param2})
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
        
        <TextInput placeholder='Passphrase' placeholderTextColor="grey" style={styles.textinput} onChangeText={onChangeText} value={text} />

        <Text style={{marginTop: 25, fontSize: 15, fontWeight: '400', paddingStart:10, color:'black',}}>
            Choose any 4 words from below.
        </Text>

       {/* <View style={styles.Button_style}>

        <ButtonGroup
            buttonStyle={{ width: 100 }}
            buttonContainerStyle={{}}
            buttons={[
              "Hill",
              "Bull",
              "Bag",
              "Window"
            ]}
            containerStyle={{ marginTop: 50 }}
            disabled={[]}
            disabledStyle={{}}
            disabledTextStyle={{}}
            disabledSelectedStyle={{}}
            disabledSelectedTextStyle={{}}
            innerBorderStyle={{}}
            onPress={selectedIdx => setSelectedIndex(selectedIdx)}
            selectedButtonStyle={{}}
            selectedIndex={selectedIndex}
            selectedIndexes={selectedIndexes}
            selectedTextStyle={{}}
            textStyle={{}} />
            
            <ButtonGroup
              buttonStyle={{ width: 100 }}
              buttonContainerStyle={{}}
              buttons={[
              "Parrot",
              "Cloud",
              "Design",
              "Zebra"
              ]}
              containerStyle={{ marginTop: 10 }}
              disabled={[ ]}
              disabledStyle={{}}
              disabledTextStyle={{}}
              disabledSelectedStyle={{}}
              disabledSelectedTextStyle={{}}
              innerBorderStyle={{}}
              onPress={selectedIdx => setSelectedIndex1(selectedIdx)}
              selectedButtonStyle={{}}
              selectedIndex={selectedIndex1}
              selectedIndexes={selectedIndexes1}
              selectedTextStyle={{}}
              textStyle={{}} /><ButtonGroup
              buttonStyle={{ width: 100 }}
              buttonContainerStyle={{}}
              buttons={[
                "Book",
              "Cat",
              "Mobile",
              "Dog"
              ]}
              containerStyle={{ }}
              disabled={[ ]}
              disabledStyle={{}}
              disabledTextStyle={{}}
              disabledSelectedStyle={{}}
              disabledSelectedTextStyle={{}}
              innerBorderStyle={{}}
              onPress={selectedIdx => setSelectedIndex2(selectedIdx)}
              selectedButtonStyle={{}}
              selectedIndex={selectedIndex2}
              selectedIndexes={selectedIndexes2}
              selectedTextStyle={{}}
              textStyle={{}} />
              
              <ButtonGroup
              buttonStyle={{ width: 100 }}
              buttonContainerStyle={{}}
              buttons={[
                "Tree",
              "Computer",
              "Bottle",
              "Water"
              ]}
              containerStyle={{  }}
              disabled={[ ]}
              disabledStyle={{}}
              disabledTextStyle={{}}
              disabledSelectedStyle={{}}
              disabledSelectedTextStyle={{}}
              innerBorderStyle={{}}
              onPress={selectedIdx => setSelectedIndex3(selectedIdx)}
              selectedButtonStyle={{}}
              selectedIndex={selectedIndex3}
              selectedIndexes={selectedIndexes3}
              selectedTextStyle={{}}
              textStyle={{}} />

        </View> */}

        <View style={styles.gridContainer}>
          {data.map((column) => (
            <Row column={column} />
          ))}
        </View>

        <View style={styles.btnStyle}>
        <TouchableOpacity onPress={()=>Create_Wallet()}>
            <View style={{flexDirection:'row'}}>
                <Text style={{color: '#ffffff',fontSize:14}}>CONTINUE  </Text>
                <Ionicons name='arrow-forward-outline' style={{color:'#ffffff',fontSize:18}}/>
            </View>
        </TouchableOpacity>
        </View>
      <View style={styles.backBtn}>
      <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
            <View style={{flexDirection:'row'}}>
                <Ionicons name='arrow-back-outline' style={{color: '#1976D2',fontSize:18,marginTop:3}}/>
                <Text style={{color: '#1976D2',fontSize:18}}>  Back</Text>
            </View>
      </TouchableOpacity>
      </View>
      </ScrollView>

    );
};
const styles = StyleSheet.create({
    gridContainer: {
        marginTop: 15,
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
      marginStart:5,
      marginBottom:10,
      marginTop:10,
      marginEnd:5,
      paddingStart:6,
      paddingBottom:10,
      paddingTop:10,
      paddingEnd:6,
      alignItems:'center',
      justifyContent:'center',
      borderWidth:1,
      borderRadius:5,
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    backBtn:{
      alignItems:'center',
      textAlign:'center',
      flex:2,
      marginTop:25,
      flex:1,
      justifyContent:'center',
      flexDirection:'row'
    },
    content:{
      color: "gray",
      flex:2 ,
      textAlign:'center',
      fontSize: 15,
      marginTop: 25,
      paddingEnd:20,
      paddingStart:20
      // justifyContent: 'center',
      // marginLeft: 37
    },
    btnStyle:{
      borderColor:'#1976D2',
      flexDirection:'row',
      borderWidth:1,
      paddingStart:55,
      paddingEnd:55,
      paddingTop:12,
      paddingBottom:12, 
      justifyContent:'center',
      flex:1,
      borderRadius:5,
      backgroundColor:'#1976D2',
      marginTop:20,
      alignSelf: 'center'
    },
    textinput:{
        color: "black",
        height: 40,
        marginTop: 12,
        marginStart:12,
        marginEnd:12,
        padding: 10,
        borderWidth: 1, 
        borderRadius: 5,
      },
    Button_style:{
      flex:2 ,
      textAlign:'center',
      fontSize: 20,
      // justifyContent: 'center',
      // marginLeft: 37,
      alignItems: 'center'
    },
    container: {
      alignItems: 'center',
   },
   text: {
      borderWidth: 1,
      padding: 25,
      borderColor: 'black',
      backgroundColor: 'red'
   }
  ,
    headline: {
      textAlign: 'center', // <-- the magic
      fontWeight: 'bold',
      color:'black',
      fontSize: 35,
      // justifyContent: 'center',
      // marginLeft: 37,
      alignItems: 'center'
    },
    sectionDescription: {
      marginTop: 35,
      fontSize: 15,
      fontWeight: '400',
      paddingStart:10,
      color:'black',
    },
    highlight: {
      fontWeight: '700',
    },
  });

export default New_wallet;