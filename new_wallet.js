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
import { ButtonGroup } from "react-native-elements";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
    
    return(

        <ScrollView style={styles.content}>
        <Text style={styles.headline}>Create New Wallet</Text>
        <Text style={styles.content}>
        To initialize your wallet we need some random inputs from you. You don't have to memorize any of these inputs for later use.
        </Text>
        <Text style={styles.sectionDescription}>
            Enter a passphrase
        </Text>
        <TextInput
        placeholder='Passphrase'
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />

        <Text style={{marginTop: 25, fontSize: 15, fontWeight: '400', paddingStart:10, color:'black',}}>
            Choose any 4 words from below.
        </Text>

       <View style={styles.Button_style}>

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

        </View>

        <TouchableOpacity onPress={()=>navigation.navigate('Dashboard')}>
            <View style={styles.btnStyle}>
                <Text style={{color: '#ffffff',fontSize:14}}>CONTINUE  </Text>
                <Ionicons name='arrow-forward-outline' style={{color:'#ffffff',fontSize:18}}/>
            </View>
        </TouchableOpacity>

      <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
            <View style={styles.backBtn}>
                  <Ionicons name='arrow-back-outline' style={{color: '#1976D2',fontSize:18}}/>
                <Text style={{color: '#1976D2',fontSize:18}}>  Back</Text>
            </View>
        </TouchableOpacity>

      </ScrollView>

    );
};
const styles = StyleSheet.create({
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
      marginTop:15,
      flex:1,
      justifyContent:'center',
      flexDirection:'row'
    },
    content:{
      color:'black',
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
    input: {
        height: 40,
        marginTop: 12,
        marginStart:12,
        marginEnd:12,
        borderWidth: 1,
        padding: 10,
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