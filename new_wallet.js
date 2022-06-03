import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text, 
  Button,TouchableOpacity,
  Alert,
  useColorScheme,
  TextInput,
  View,
} from 'react-native';

const New_wallet = ({ navigation}) => {

    const [text, onChangeText] = React.useState("Passphrase ");
    
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
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />

        <View style={styles.Button_style}>

          {/* <Button
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
      title="Choose private share"
      onPress={() => navigation.navigate('Access')}
    /> */}
</View>
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
    content:{
      color:'black',
      flex:2 ,
      textAlign:'center',
      fontSize: 15,
      marginTop: 25,
      // justifyContent: 'center',
      // marginLeft: 37
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
    Button_style:{
      flex:2 ,
      textAlign:'center',
      fontSize: 20,
      marginTop: 25,
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
      marginTop: 75,
      // justifyContent: 'center',
      // marginLeft: 37,
      alignItems: 'center'
    },
    sectionDescription: {
      marginTop: 35,
      fontSize: 15,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
  });

export default New_wallet;