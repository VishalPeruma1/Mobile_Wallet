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
  View,
} from 'react-native';

const Access = ({ navigation}) => {
    return(

        <ScrollView style={styles.content}>
          <Text style={styles.headline}>Access Wallet. </Text>
          <Text style={styles.content}>
          To access your wallet upload the private share saved in your device.
          </Text>

          <View style={styles.Button_style}>

            <Button
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
        title="Choose private share"
        onPress={() => navigation.navigate('Access')}
      />
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
      marginTop: 250,
      // justifyContent: 'center',
      // marginLeft: 37,
      alignItems: 'center'
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
  });

  export default Access;